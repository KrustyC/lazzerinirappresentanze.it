import { createClient } from "next-sanity";

import { env } from "@/lib/env";

/**
 * Until the project exists the id is a placeholder: every fetcher checks
 * `isSanityConfigured` first and serves the local copy instead, so this
 * client is never actually called with it.
 */
export const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "not-configured",
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl: "/studio" },
});
