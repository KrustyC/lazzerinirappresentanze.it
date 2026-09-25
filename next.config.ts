import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";
import { sanity } from "next-sanity/live/cache-life";

import {
  SECURITY_HEADERS,
  STUDIO_HEADERS,
} from "./src/lib/http/securityHeaders";

function toHeaderList(headers: Record<string, string>) {
  return Object.entries(headers).map(([key, value]) => ({ key, value }));
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: { default: sanity },
  partialPrefetching: true,
  typedRoutes: true,
  reactCompiler: true,

  async headers() {
    return [
      { source: "/(.*)", headers: toHeaderList(SECURITY_HEADERS) },
      { source: "/studio/:path*", headers: toHeaderList(STUDIO_HEADERS) },
    ];
  },

  // TypeScript 7 (native Go compiler) removed the JS Compiler API that Next's
  // built-in type checker used. This opts Next into invoking the project-local
  // `tsc` CLI instead.
  experimental: { useTypeScriptCli: true },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

// Without SENTRY_AUTH_TOKEN the plugin skips the source-map upload, and
// without a DSN the SDK never initialises, so this is inert until configured.
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
});
