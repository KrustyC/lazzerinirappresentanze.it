import { defineConfig } from "@playwright/test";

// Playwright runs under Node, so it loads `.env.local` itself — the same file
// the dev server it tests reads. Missing is fine (CI, or before Sanity exists).
try {
  process.loadEnvFile(".env.local");
} catch {
  // No .env.local.
}

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
    storageState: { cookies: [], origins: [] },
  },
  // `reuseExistingServer` means a dev server you already have running is used
  // as-is, with whatever env it was started with.
  webServer: {
    command: "bun run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
