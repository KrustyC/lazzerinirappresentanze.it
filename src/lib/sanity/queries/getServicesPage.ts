import { defineQuery } from "next-sanity";

import { servicesPage } from "@/content/services";
import type { ServicesPageContent } from "@/content/types";
import { isSanityConfigured } from "@/lib/env";

import { cachedSanity, type DynamicFetchOptions } from "../live";
import { documentTypeTags } from "../revalidation/tags";

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_type == "servicesPage"][0] {
    "title": coalesce(title, ""),
    "headline": coalesce(headline, ""),
    "intro": coalesce(intro, ""),
    "services": coalesce(services, [])
  }
`);

export async function getServicesPage({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<ServicesPageContent | null> {
  if (!isSanityConfigured) return servicesPage;

  const { data } = await cachedSanity({
    query: SERVICES_PAGE_QUERY,
    perspective,
    stega,
    tags: documentTypeTags("servicesPage"),
  });
  return data;
}
