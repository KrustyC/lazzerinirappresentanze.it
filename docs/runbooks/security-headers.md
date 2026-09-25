# Runbook: Security headers

**Status:** Active
**Applies to:** `next.config.ts`, `src/lib/http/securityHeaders.ts`

## What ships today

- `SECURITY_HEADERS` on every route: `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN` (the Presentation tool
  frames the site from `/studio`, same origin), `Permissions-Policy` denying
  camera, microphone and geolocation.
- `STUDIO_HEADERS` on `/studio/:path*`: `X-Robots-Tag: noindex`.

**No Content-Security-Policy**, deliberately (valtiberina removed its
report-only one for the same reason): without a collector it reports to
nobody, and an enforcing policy without nonces still needs
`'unsafe-inline'` for Next's bootstrap scripts and the consent snippet.

## If you add one

- **Report-only** is only worth it together with a `report-to` endpoint that
  lands somewhere read (a Route Handler forwarding to Sentry works).
- **Enforcing** needs per-request nonces, generated in a `src/proxy.ts`
  (Next's CSP guide in `node_modules/next/dist/docs/`). Nonces make every page
  dynamic, losing the static shells this site is built on — weigh that first.
  The inline consent snippet needs its hash or the nonce.
- Origins a table would need: `cdn.sanity.io` (images), `*.api.sanity.io`,
  `*.apicdn.sanity.io` (content, Live, Studio auth),
  `www.googletagmanager.com`, `*.google-analytics.com`,
  `*.analytics.google.com` (once GTM is on), the Sentry ingest host (or the
  `/monitoring` tunnel, same-origin). `next/font` self-hosts.

If the Studio ever moves to its own origin, `X-Frame-Options` must go (it has
no multi-origin form) in favour of CSP `frame-ancestors`.
