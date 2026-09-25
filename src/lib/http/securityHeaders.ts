/**
 * Response headers applied to every route, keyed by name so each row reads as
 * "what protection, for what reason" (see `next.config.ts`'s `headers()`).
 *
 * `X-Frame-Options: SAMEORIGIN` — Sanity's Presentation tool previews the
 * real pages in an iframe from `/studio`, which is same-origin. SAMEORIGIN
 * keeps that working while still blocking every other site from framing us.
 *
 * `Permissions-Policy` — the site reads no device feature, so every listed
 * one is denied outright rather than left `(self)`.
 *
 * There is deliberately no Content-Security-Policy yet: see
 * `docs/runbooks/security-headers.md` before adding one.
 */
export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

/** `/studio/:path*` only — the Studio is an editing tool, never a search result. */
export const STUDIO_HEADERS: Record<string, string> = {
  "X-Robots-Tag": "noindex",
};
