import { defineQuery } from "next-sanity";

import { partners, partnersPage } from "@/content/partners";
import type { Partner, PartnersPageContent } from "@/content/types";
import { isSanityConfigured } from "@/lib/env";

import { cachedSanity, type DynamicFetchOptions } from "../live";
import { documentTypeTags } from "../revalidation/tags";

export const PARTNERS_PAGE_QUERY = defineQuery(`
  {
    "page": *[_type == "partnersPage"][0] {
      "title": coalesce(title, ""),
      "body": coalesce(body, [])
    },
    "partners": *[_type == "partner"] | order(order asc, name asc) {
      _id,
      "name": coalesce(name, ""),
      "link": coalesce(link, ""),
      "logo": select(
        defined(logo.asset) => { "url": logo.asset->url, "alt": coalesce(logo.alt, name, "") },
        null
      )
    }
  }
`);

export interface PartnersPageData {
  page: PartnersPageContent | null;
  partners: Partner[];
}

export async function getPartnersPage({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<PartnersPageData> {
  if (!isSanityConfigured) return { page: partnersPage, partners };

  const { data } = await cachedSanity({
    query: PARTNERS_PAGE_QUERY,
    perspective,
    stega,
    tags: documentTypeTags("partnersPage", "partner"),
  });
  return data;
}
