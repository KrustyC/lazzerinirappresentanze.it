/**
 * The page documents that exist exactly once. Their `_id` is fixed to their
 * type name, which is what the Studio structure opens, what the seed script
 * writes, and what the "create new" menu hides.
 */
export const SINGLETON_TYPES = [
  "homePage",
  "servicesPage",
  "partnersPage",
  "contactsPage",
] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export function isSingletonType(type: string): type is SingletonType {
  return (SINGLETON_TYPES as readonly string[]).includes(type);
}
