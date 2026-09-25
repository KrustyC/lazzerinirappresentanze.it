import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

export const SITEMAP_PATHS = [
  "",
  "/servizi",
  "/partners",
  "/contatti",
  "/privacy-policy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((path) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}${path}`,
  }));
}
