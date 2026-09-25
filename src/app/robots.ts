import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

const DISALLOW = ["/api/", "/studio/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: DISALLOW }],
    sitemap: `${env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
