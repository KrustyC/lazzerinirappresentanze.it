import { defineQuery } from "next-sanity";

import { homePage } from "@/content/home";
import type { HomePageContent } from "@/content/types";
import { isSanityConfigured } from "@/lib/env";

import { cachedSanity, type DynamicFetchOptions } from "../live";
import { documentTypeTags } from "../revalidation/tags";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    "title": coalesce(title, ""),
    "introduction": coalesce(introduction, []),
    "ourHistory1": coalesce(ourHistory1, []),
    "ourHistory2": coalesce(ourHistory2, [])
  }
`);

export async function getHomePage({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<HomePageContent | null> {
  if (!isSanityConfigured) return homePage;

  const { data } = await cachedSanity({
    query: HOME_PAGE_QUERY,
    perspective,
    stega,
    tags: documentTypeTags("homePage"),
  });
  return data;
}
