# Runbook: Verifying caching after a deploy

**Status:** Active
**Applies to:** Vercel deployments; `next.config.ts` (`cacheComponents`), `src/lib/sanity/live.ts`
**Origin:** valtiberina.travel `docs/runbooks/caching-verification.md` (fuller, with plan limits)

---

Intended behaviour: every public page is prerendered (`○` in the build
output); functions and Sanity queries run only on a cache miss, a publish, or
in draft mode — never per visitor.

## Quick check

```bash
URL=https://<domain>/servizi
curl -sI "$URL" | grep -i x-vercel-cache   # MISS or PRERENDER first
curl -sI "$URL" | grep -i x-vercel-cache   # then HIT
```

`HIT`/`PRERENDER` = no function ran. `STALE` = served from cache while a
background revalidation runs. `BYPASS` = draft mode (expected for editors).

## After publishing in Sanity

Two independent paths expire the cache; each must work alone.

1. **Webhook** (`/api/revalidate`, the one to rely on): in Sanity → API →
   Webhooks → Attempts, a delivery shows `200 {"revalidated":["type:<name>"]}`.
   `401` = secret mismatch, `503` = `SANITY_WEBHOOK_SECRET` missing,
   `200` with `[]` = type missing from `REVALIDATED_DOCUMENT_TYPES`.
   The first request after it may still be `STALE` (the `max` profile is
   stale-while-revalidate); the second shows the change.
2. **Sanity Live** (`<SanityLive>` in `(site)/layout.tsx`): an open tab updates
   within seconds. Only tabs open at publish time, and in draft mode it only
   refreshes the router — hence the webhook.

## When everything is `MISS`

- A dynamic API (`cookies()`, `headers()`, `searchParams`) is read outside
  `DraftModeBoundary`'s Suspense branch.
- `perspective`/`stega` hardcoded in a query instead of passed through.
- `cacheComponents` disabled in `next.config.ts`.
