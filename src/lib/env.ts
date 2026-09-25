import { publicEnv } from "./env/public";

export { isSanityConfigured } from "./env/public";

/**
 * Server env, merged with the client-safe values from `env/public.ts` so
 * every `env.X` access keeps working. Only server code imports this module;
 * client components import `@/lib/env/public`.
 *
 * Every variable is optional for now so previews and CI build before the
 * Sanity project exists. A route missing its secret answers 503
 * `not_configured` rather than failing the build.
 */
export const env = {
  ...publicEnv,
  NODE_ENV: (process.env.NODE_ENV === "production"
    ? "production"
    : "development") as "production" | "development",
  // Viewer-role token: draft reads for the Presentation tool and Sanity Live.
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  // Editor-role token: only `bun run sanity:seed` uses it.
  SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
  // Signs the publish webhook that revalidates the cache (`/api/revalidate`).
  SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET,
  SENTRY_DSN: process.env.SENTRY_DSN,
};
