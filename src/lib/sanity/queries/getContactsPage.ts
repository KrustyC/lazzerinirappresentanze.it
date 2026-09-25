import { defineQuery } from "next-sanity";

import { contactsPage } from "@/content/contacts";
import type { ContactsPageContent } from "@/content/types";
import { isSanityConfigured } from "@/lib/env";

import { cachedSanity, type DynamicFetchOptions } from "../live";
import { documentTypeTags } from "../revalidation/tags";

export const CONTACTS_PAGE_QUERY = defineQuery(`
  *[_type == "contactsPage"][0] {
    "title": coalesce(title, ""),
    "address": coalesce(address, "")
  }
`);

export async function getContactsPage({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<ContactsPageContent | null> {
  if (!isSanityConfigured) return contactsPage;

  const { data } = await cachedSanity({
    query: CONTACTS_PAGE_QUERY,
    perspective,
    stega,
    tags: documentTypeTags("contactsPage"),
  });
  return data;
}
