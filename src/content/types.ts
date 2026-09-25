import type {
  CONTACTS_PAGE_QUERY_RESULT,
  EMPLOYEES_QUERY_RESULT,
  HOME_PAGE_QUERY_RESULT,
  PARTNERS_PAGE_QUERY_RESULT,
  PortableText,
  SERVICES_PAGE_QUERY_RESULT,
} from "@/lib/sanity/types";

/**
 * The shapes pages render, derived from the GROQ projections in
 * `src/lib/sanity/queries/` (`bun run typegen`). The local copy in this
 * folder is typed against them too, so a page never knows which source it
 * got — and a query change that the copy no longer satisfies fails typecheck.
 */
export type RichTextValue = PortableText;

export type HomePageContent = NonNullable<HOME_PAGE_QUERY_RESULT>;
export type ServicesPageContent = NonNullable<SERVICES_PAGE_QUERY_RESULT>;
export type ContactsPageContent = NonNullable<CONTACTS_PAGE_QUERY_RESULT>;
export type PartnersPageContent = NonNullable<
  PARTNERS_PAGE_QUERY_RESULT["page"]
>;

export type Employee = EMPLOYEES_QUERY_RESULT[number];
export type Partner = PARTNERS_PAGE_QUERY_RESULT["partners"][number];
