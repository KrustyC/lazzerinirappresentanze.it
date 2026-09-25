# Runbook: Sanity

**Status:** Active — project not yet created
**Date:** 2026-09-25
**Applies to:** `sanity.config.ts`, `sanity.cli.ts`, `src/lib/sanity/**`, `src/content/**`, `scripts/seed-sanity.ts`
**Related:** `.agents/skills/sanity-best-practices/`, `.agents/skills/sanity-live-cache-components/`, `caching-verification.md`

---

## Where things stand

The schema, Studio (`/studio`), Presentation tool, draft mode, Sanity Live
and the publish webhook are all wired. What is missing is the project itself:
with `NEXT_PUBLIC_SANITY_PROJECT_ID` unset,

- every `get*` in `src/lib/sanity/queries/` returns the local copy in
  `src/content/` instead of querying;
- `/studio` shows a "not configured" notice;
- `<SanityLive>` is not mounted.

The schema mirrors the old Netlify CMS collections one for one (four page
singletons, Partners, Personale). One addition: `servicesPage` has
`headline`/`intro`/`services`, because the Gatsby page hardcoded exactly the
copy it showed and left the CMS `body` field unused.

## Linking the project (once the client grants access)

1. `bunx sanity login`, then note the project id from sanity.io/manage.
2. In `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
   (`production`), and an **Editor** token as `SANITY_API_WRITE_TOKEN`.
3. sanity.io/manage → API → CORS origins: add `http://localhost:3000` and the
   production/preview origins, **with credentials** (the embedded Studio needs it).
4. `bun run sanity:seed --dry-run`, then `bun run sanity:seed`. Uploads every
   image from `public/img/` and writes 29 documents with fixed ids.
5. Create a **Viewer** token → `SANITY_API_READ_TOKEN` (local + Vercel).
6. Vercel env: the three `NEXT_PUBLIC_SANITY_*`, `SANITY_API_READ_TOKEN`,
   `SANITY_WEBHOOK_SECRET`. Never the write token.
7. Webhook (API → Webhooks): URL `https://<domain>/api/revalidate`, trigger on
   create/update/delete, filter
   `_type in ["homePage","servicesPage","partnersPage","contactsPage","partner","employee"]`,
   projection `{_type, _id}`, secret = `SANITY_WEBHOOK_SECRET`.
8. Check `/studio`, open Presentation, edit a page, publish, and confirm with
   `caching-verification.md`.

## Removing the fallback (after step 8)

Delete the `if (!isSanityConfigured) return …` line in each query, the
`src/content/*.ts` data files (keep `types.ts`), `scripts/seed-sanity.ts`,
and the `isSanityConfigured` guards in `(site)/layout.tsx` and the Studio
page. Then make the Sanity variables required in `src/lib/env/public.ts`.

## Rules that break silently

- **Adding a document type a page reads** takes three things together: `tags:`
  on its `cachedSanity` call, the type in `REVALIDATED_DOCUMENT_TYPES`
  (`src/lib/sanity/revalidation/tags.ts`), and the type in the webhook filter.
  Miss one and edits only appear after the next deploy.
- **After any schema or query change run `bun run typegen`.** `src/content/types.ts`
  derives from the generated result types, so the local copy is checked
  against the queries too.
- **One `@sanity/client`.** `resolutions` in `package.json` pins it; see
  `dependencies.md` — a second copy silently turns every query result to
  `unknown`.
- **Pages use `DraftModeBoundary`** (`src/components/Sanity/`) — the
  three-layer pattern written once. Never hardcode `perspective`/`stega` in a
  query; they arrive as props.
- **Singletons** have `_id` equal to their type. The Studio hides create,
  duplicate and delete for them (`sanity.config.ts`).
