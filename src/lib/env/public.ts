/** A Tag Manager container id always starts with "GTM-"; anything else is a
 *  typo that would otherwise ship silently to every browser. */
function optionalContainerId(value: string | undefined): string | undefined {
  if (value && !value.startsWith("GTM-")) {
    throw new Error(
      `Invalid environment variable NEXT_PUBLIC_GTM_ID: expected a "GTM-" container id, got "${value}"`
    );
  }
  return value || undefined;
}

/** Explicit value first, then the production domain Vercel exposes to every
 *  deployment, then localhost — so previews and CI build without setting it. */
function baseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelHost = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

/**
 * Client-safe env: only `NEXT_PUBLIC_*` values, read as literal
 * `process.env.NEXT_PUBLIC_X` member accesses so Next inlines them at build
 * time. Client components that need one of these import this module
 * directly instead of `@/lib/env`, so server-only secrets never reach the
 * browser bundle.
 *
 * Everything Sanity-related is optional until the client's project exists:
 * with no project id the site renders the local copy in `src/content/`, and
 * the Studio shows a "not configured" notice instead of crashing.
 */
export const publicEnv = {
  NEXT_PUBLIC_BASE_URL: baseUrl(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET:
    process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  NEXT_PUBLIC_SANITY_API_VERSION:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-01",
  NEXT_PUBLIC_GTM_ID: optionalContainerId(process.env.NEXT_PUBLIC_GTM_ID),
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
};

export const isSanityConfigured = Boolean(
  publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID
);
