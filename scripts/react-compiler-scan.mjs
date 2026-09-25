import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(join(process.cwd(), "package.json"));
const { transformSync } = require("@babel/core");
const compiler = require("babel-plugin-react-compiler");
const plugin = compiler.default ?? compiler;

const root = process.cwd();
const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (n === "__tests__" || n === "node_modules") continue;
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?)$/.test(n)) files.push(p);
  }
})(join(root, "src"));

const results = [];
for (const f of files) {
  const src = readFileSync(f, "utf8");
  if (!/use(Callback|Memo|State|Effect|Ref|EffectEvent)|React\.FC|=> \(\s*</.test(src)) continue;
  const events = [];
  try {
    transformSync(src, {
      filename: f,
      babelrc: false,
      configFile: false,
      parserOpts: { plugins: ["jsx", "typescript"] },
      plugins: [[plugin, { logger: { logEvent: (_, e) => events.push(e) } }]],
    });
  } catch (e) {
    events.push({ kind: "Throw", detail: String(e.message).split("\n")[0] });
  }
  const ok = events
    .filter((e) => e.kind === "CompileSuccess")
    .map((e) => e.fnName ?? "?");
  const bad = events
    .filter((e) => e.kind !== "CompileSuccess")
    .map(
      (e) =>
        `${e.kind}:${e.fnName ?? ""} ${e.detail?.reason ?? e.detail?.description ?? e.detail ?? ""}`.trim()
    );
  if (ok.length || bad.length) results.push({ f: relative(root, f), ok, bad });
}

let bailouts = 0;
for (const r of results) {
  if (r.bad.length) {
    bailouts += r.bad.length;
    console.log("BAIL  " + r.f + "\n      " + r.bad.join("\n      "));
  }
}
console.log("---- compiled OK (count per file)");
for (const r of results) if (r.ok.length) console.log(String(r.ok.length).padStart(3), r.f);

if (bailouts > 0) process.exitCode = 1;
