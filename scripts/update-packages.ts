#!/usr/bin/env bun

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DRY_RUN = process.argv.includes("--dry-run");
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PKG_PATH = join(ROOT, "package.json");

type BumpType = "patch" | "minor" | "major";
type DepType = "dependency" | "devDependency";

interface PackageUpdate {
  name: string;
  pkgVersion: string;
  current: string;
  latest: string;
  bump: BumpType;
  dep: DepType;
}

interface ParseResult {
  updates: PackageUpdate[];
  dataRows: number;
  // Rows matched to an entry in package.json. A recognized row can still
  // yield no update (e.g. a version held back by "overrides" is reported by
  // bun outdated while package.json already points at the latest).
  recognized: number;
}

function log(message = "") {
  if (!DRY_RUN) {
    console.log(message);
    return;
  }
  console.log(
    message
      .split("\n")
      .map((line) => `[DRY RUN] ${line}`)
      .join("\n"),
  );
}

function semver(v: string): [number, number, number] | null {
  const m = v.replace(/^[^\d]*/, "").match(/^(\d+)\.(\d+)\.(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

function classifyBump(from: string, to: string): BumpType {
  const a = semver(from);
  const b = semver(to);
  // Unparseable versions (e.g. "1.x", workspace ranges) are treated as major
  // so they are flagged for manual review instead of auto-updated.
  if (!a || !b) return "major";
  if (b[0] !== a[0]) return "major";
  if (b[1] !== a[1]) return "minor";
  return "patch";
}

// Parses the `bun outdated` table. Depending on TTY/version, bun draws the
// table with ASCII pipes (|) or box-drawing pipes (│); accept both.
function parseOutdated(
  output: string,
  pkg: Record<string, Record<string, string>>,
): ParseResult {
  const deps = pkg.dependencies ?? {};
  const devDeps = pkg.devDependencies ?? {};
  const updates: PackageUpdate[] = [];
  let dataRows = 0;
  let recognized = 0;

  for (const line of output.split("\n")) {
    if (!/[|│]/.test(line)) continue;
    const cells = line
      .split(/[|│]/)
      .map((s) => s.trim())
      .filter(Boolean);
    // Expect at least 4 columns: Package | Current | Update | Latest
    if (cells.length < 4 || cells[0] === "Package") continue;
    // Skip horizontal separator rows (|-----|-----|)
    if (/^-+$/.test(cells[0])) continue;

    dataRows++;

    // devDependencies are listed as "name (dev)" in the Package column
    const isDev = / \(dev\)$/.test(cells[0]);
    const name = cells[0].replace(/ \(dev\)$/, "");
    const latest = cells[3];

    const pkgVersion = isDev ? devDeps[name] : deps[name];
    if (!name || !latest || !pkgVersion) continue;

    recognized++;

    const current = pkgVersion.replace(/^[^\d]*/, "");
    if (current === latest) continue;

    updates.push({
      name,
      pkgVersion,
      current,
      latest,
      bump: classifyBump(current, latest),
      dep: isDev ? "devDependency" : "dependency",
    });
  }

  return { updates, dataRows, recognized };
}

function applyUpdates(
  updates: PackageUpdate[],
  pkg: Record<string, Record<string, string>>,
): Record<string, Record<string, string>> {
  const next = structuredClone(pkg);
  for (const u of updates) {
    const prefix = u.pkgVersion.match(/^[^\d]*/)?.[0] ?? "";
    const newVersion = prefix + u.latest;
    if (u.dep === "dependency") (next.dependencies ??= {})[u.name] = newVersion;
    else (next.devDependencies ??= {})[u.name] = newVersion;
  }
  return next;
}

function printTable(title: string, rows: PackageUpdate[]) {
  if (!rows.length) return;

  const wName = Math.max(7, ...rows.map((r) => r.name.length));
  const wCur = Math.max(7, ...rows.map((r) => r.pkgVersion.length));
  const wLat = Math.max(6, ...rows.map((r) => r.latest.length));
  const bar = "─".repeat(wName + wCur + wLat + 24);

  log(`\n${title}`);
  log(bar);
  for (const r of rows) {
    const bump = r.bump.toUpperCase().padEnd(5);
    log(
      ` ${r.name.padEnd(wName)}  ${r.pkgVersion.padEnd(wCur)}  →  ${r.latest.padEnd(wLat)}  (${bump})  ${r.dep}`,
    );
  }
  log(bar);
}

// ── main ──────────────────────────────────────────────────────────────────────

if (DRY_RUN) log("Preview only — no files will be modified.\n");

log("Running bun outdated...");

const outdated = spawnSync("bun", ["outdated"], {
  cwd: ROOT,
  encoding: "utf-8",
});

if (outdated.error || outdated.status !== 0) {
  const detail =
    outdated.error?.message ??
    `${outdated.stderr ?? ""}${outdated.stdout ?? ""}`.trim();
  console.error("✗ bun outdated failed:", detail);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(PKG_PATH, "utf-8"));
const totalDeps =
  Object.keys(pkg.dependencies ?? {}).length +
  Object.keys(pkg.devDependencies ?? {}).length;

const { updates: all, dataRows, recognized } = parseOutdated(
  outdated.stdout,
  pkg,
);

if (dataRows > 0 && recognized === 0) {
  console.error(
    "✗ Could not parse `bun outdated` output — its format may have changed.",
  );
  process.exit(1);
}

if (!all.length) {
  log(`✓ All ${totalDeps} packages are up to date.`);
  process.exit(0);
}

const upToDate = totalDeps - all.length;
const safe = all.filter((u) => u.bump !== "major");
const major = all.filter((u) => u.bump === "major");

if (DRY_RUN) {
  printTable(`Would auto-update ${safe.length} package(s) (minor/patch):`, safe);
  printTable(
    `Would flag ${major.length} package(s) for manual review (major):`,
    major,
  );
  log(
    `\nDone (dry run). ${safe.length} would be auto-updated · ${major.length} would be flagged · ${upToDate} already up to date.`,
  );
  process.exit(0);
}

if (safe.length > 0) {
  printTable(`Auto-updating ${safe.length} package(s):`, safe);
  const updated = applyUpdates(safe, pkg);
  writeFileSync(PKG_PATH, JSON.stringify(updated, null, 2) + "\n");

  log("\nRunning bun install...");
  const install = spawnSync("bun", ["install"], {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (install.error || install.status !== 0) {
    console.error("\n✗ bun install failed.", install.error?.message ?? "");
    process.exit(1);
  }
  log("✓ Lockfile updated.");
} else {
  log("\nNo safe (minor/patch) updates available.");
}

if (major.length > 0) {
  printTable("MANUAL REVIEW REQUIRED — Major updates:", major);
} else {
  log("\nNo major updates pending.");
}

const flagNote =
  major.length > 0 ? " · review flagged packages above before upgrading" : "";
log(
  `\nDone. ${safe.length} auto-updated · ${major.length} flagged for manual review · ${upToDate} already up to date.${flagNote}`,
);
