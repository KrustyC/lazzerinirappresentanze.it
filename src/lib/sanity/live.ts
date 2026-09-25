import {
  defineLive,
  type LivePerspective,
  resolvePerspectiveFromCookies,
  type StrictDefinedFetchType,
} from "next-sanity/live";
import { cookies, draftMode } from "next/headers";

import { env } from "@/lib/env";

import { client } from "./client";

// `false` rather than undefined silences next-sanity's warning until a
// Viewer token is set; without one only published content is live.
const token = env.SANITY_API_READ_TOKEN ?? false;

export const { SanityLive, sanityFetch } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
});

/**
 * The app's one shared `use cache` boundary. `sanityFetch` registers the
 * query's sync tags (and our `type:` tags) with `cacheTag` but creates no
 * boundary of its own, so this wrapper provides it once: every option is part
 * of the cache key, published and draft reads never share an entry, and the
 * same query from two components resolves from one entry.
 */
export const cachedSanity: StrictDefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};

export interface DynamicFetchOptions {
  perspective: LivePerspective;
  stega: boolean;
}

export const PUBLISHED: DynamicFetchOptions = {
  perspective: "published",
  stega: false,
};

export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) return PUBLISHED;

  const jar = await cookies();
  const perspective = await resolvePerspectiveFromCookies({ cookies: jar });
  return { perspective: perspective ?? "drafts", stega: true };
}
