#!/usr/bin/env bun
import {
  createClient,
  type IdentifiedSanityDocumentStub,
} from "@sanity/client";
/**
 * Pushes the local copy in `src/content/` into the Sanity dataset: the four
 * page singletons, every partner and every employee, uploading their images
 * from `public/img/`. Idempotent — documents have fixed ids and are
 * `createOrReplace`d, and Sanity dedupes identical image uploads — so it is
 * safe to re-run while the schema settles.
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and an
 * Editor-role SANITY_API_WRITE_TOKEN in `.env.local` (bun loads it).
 *
 *   bun run sanity:seed            # write
 *   bun run sanity:seed --dry-run  # print what would be written
 */
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";

import { contactsPage } from "../src/content/contacts";
import { employees } from "../src/content/employees";
import { homePage } from "../src/content/home";
import { partners, partnersPage } from "../src/content/partners";
import { servicesPage } from "../src/content/services";

const DRY_RUN = process.argv.includes("--dry-run");
const PUBLIC_DIR = join(import.meta.dirname, "..", "public");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!DRY_RUN && (!projectId || !token)) {
  console.error(
    "✗ Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first."
  );
  process.exit(1);
}

const client = createClient({
  projectId: projectId ?? "dry-run",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-01",
  token,
  useCdn: false,
});

/** Uploads `/img/foo.jpg` from `public/` and returns an image field value. */
async function imageField(url: string | null, alt: string) {
  if (!url) return undefined;
  if (DRY_RUN)
    return { _type: "image", alt, asset: { _ref: `(upload ${url})` } };

  const asset = await client.assets.upload(
    "image",
    readFileSync(join(PUBLIC_DIR, url)),
    { filename: basename(url) }
  );
  return {
    _type: "image",
    alt,
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function buildDocuments(): Promise<IdentifiedSanityDocumentStub[]> {
  const singletons = [
    { _id: "homePage", _type: "homePage", ...homePage },
    { _id: "servicesPage", _type: "servicesPage", ...servicesPage },
    { _id: "partnersPage", _type: "partnersPage", ...partnersPage },
    { _id: "contactsPage", _type: "contactsPage", ...contactsPage },
  ];

  const partnerDocs = await Promise.all(
    partners.map(async (partner, index) => ({
      _id: partner._id,
      _type: "partner",
      name: partner.name,
      link: partner.link,
      order: index + 1,
      logo: await imageField(partner.logo?.url ?? null, partner.name),
    }))
  );

  const employeeDocs = await Promise.all(
    employees.map(async (employee, index) => ({
      _id: employee._id,
      _type: "employee",
      name: employee.name,
      job: employee.job,
      order: index + 1,
      picture: await imageField(employee.picture?.url ?? null, employee.name),
    }))
  );

  return [...singletons, ...partnerDocs, ...employeeDocs];
}

const documents = await buildDocuments();

if (DRY_RUN) {
  for (const doc of documents) console.log(`[dry run] ${doc._type} ${doc._id}`);
  console.log(`\n${documents.length} documents would be written.`);
  process.exit(0);
}

const transaction = client.transaction();
for (const doc of documents) transaction.createOrReplace(doc);
await transaction.commit();

console.log(`✓ Seeded ${documents.length} documents into ${projectId}.`);
