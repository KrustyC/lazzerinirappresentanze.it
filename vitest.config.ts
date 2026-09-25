import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // @vitejs/plugin-react 6's JSX transform runs on oxc, so the React
    // Compiler (a babel plugin) needs its own babel pass to match `next`.
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  test: {
    globals: true,
    exclude: ["node_modules", "e2e/**"],
    // Next loads `.env.local` itself; outside it nothing does, so read every
    // variable (empty prefix) into `process.env` before tests run.
    env: loadEnv(mode, process.cwd(), ""),
    // `.test.ts` runs on node, `.test.tsx` gets jsdom. A `.test.ts` that needs
    // a DOM opts in with a `// @vitest-environment jsdom` docblock.
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["src/**/*.test.ts"],
          setupFiles: ["./vitest.setup.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "jsdom",
          environment: "jsdom",
          include: ["src/**/*.test.tsx"],
          setupFiles: ["./vitest.setup.ts"],
        },
      },
    ],
  },
}));
