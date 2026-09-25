/**
 * Every document type a public page reads. The webhook route maps a
 * published document's `_type` to a cache tag through this list, so a type
 * missing here is one whose edits never reach the site until the next deploy.
 */
export const REVALIDATED_DOCUMENT_TYPES = [
  "homePage",
  "servicesPage",
  "partnersPage",
  "contactsPage",
  "partner",
  "employee",
] as const;

export type RevalidatedDocumentType =
  (typeof REVALIDATED_DOCUMENT_TYPES)[number];

export function isRevalidatedDocumentType(
  value: string
): value is RevalidatedDocumentType {
  return (REVALIDATED_DOCUMENT_TYPES as readonly string[]).includes(value);
}

/**
 * The cache tag every `sanityFetch` reading this type carries, next to the
 * sync tags Sanity Live uses. `type:` rather than `sanity:` so it can never
 * collide with next-sanity's own prefix for sync tags.
 */
export function documentTypeTag(type: RevalidatedDocumentType): string {
  return `type:${type}`;
}

export function documentTypeTags(
  ...types: RevalidatedDocumentType[]
): string[] {
  return types.map(documentTypeTag);
}
