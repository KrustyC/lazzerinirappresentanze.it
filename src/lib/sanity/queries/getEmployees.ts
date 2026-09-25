import { defineQuery } from "next-sanity";

import { employees } from "@/content/employees";
import type { Employee } from "@/content/types";
import { isSanityConfigured } from "@/lib/env";

import { cachedSanity, type DynamicFetchOptions } from "../live";
import { documentTypeTags } from "../revalidation/tags";

export const EMPLOYEES_QUERY = defineQuery(`
  *[_type == "employee"] | order(order asc, name asc) {
    _id,
    "name": coalesce(name, ""),
    "job": coalesce(job, ""),
    "picture": select(
      defined(picture.asset) => { "url": picture.asset->url, "alt": coalesce(picture.alt, name, "") },
      null
    )
  }
`);

export async function getEmployees({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<Employee[]> {
  if (!isSanityConfigured) return employees;

  const { data } = await cachedSanity({
    query: EMPLOYEES_QUERY,
    perspective,
    stega,
    tags: documentTypeTags("employee"),
  });
  return data;
}
