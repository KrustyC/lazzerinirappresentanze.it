<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Setup

Marketing site for **Lazzerini Rappresentanze** (food & beverage sales agency,
Sansepolcro): Next.js 16 (App Router, Cache Components, React Compiler),
Tailwind CSS 4, Sanity (embedded Studio at `/studio`), deployed on Vercel.
Italian only. The structure is meant to be reusable as a boilerplate.

## Runbooks — read these *when the task calls for it*, not upfront

This file holds only what is always in force. Anything with rules that are easy to break
silently lives in a runbook; the trigger for reading each one is below.

| Read before… | Runbook |
|---|---|
| Linking the Sanity project, changing a schema or query, or removing the local content fallback | `docs/runbooks/sanity.md` |
| Touching consent, the cookie banner, GTM or any tracking event — or adding anything that sets non-technical cookies (analytics, pixels, map/video embeds) | `docs/runbooks/consent-and-tracking.md` |
| Editing the privacy/cookie policy, or adding anything that processes personal data (a form field, a new provider) | `docs/runbooks/privacy-policy.md` |
| Wiring email delivery or changing the contact form | `docs/runbooks/contact-form.md` |
| Any major dependency upgrade, or touching `resolutions`/`@babel/core` | `docs/runbooks/dependencies.md` |
| Changing caching, `"use cache"`, or `cacheLife` behaviour | `docs/runbooks/caching-verification.md` |
| Changing security headers or adding a Content-Security-Policy | `docs/runbooks/security-headers.md` |

`docs/README.md` explains the rest of `docs/` (prds → specs → tasks, plans, archive).

## Project structure

```
src/
├── actions/          # Server actions
├── app/
│   ├── (site)/       # Public site: layout with chrome, consent, Sanity Live
│   │   └── <route>/_components/   # Components local to that route only
│   ├── studio/       # Embedded Sanity Studio (must not share the site layout)
│   └── api/          # Draft mode + Sanity revalidation webhook
├── components/       # Components shared by several routes
├── content/          # The site copy as local data, until Sanity is linked
├── lib/
│   ├── sanity/       # client, live, schemas, queries, structure, typegen output
│   ├── consent/      # Consent Mode (the only gtag issuer)
│   ├── analytics/    # Event vocabulary (the only dataLayer pusher)
│   └── env.ts, env/public.ts, site.ts, utils/
└── types/
```

## Package Management

- Always use `bun` for dependency installation and updates in this repo.
- Do not use `npm`, `pnpm`, or `yarn` to add or update packages unless the user explicitly asks for a different tool.
- When adding or updating dependencies, pin them to the latest available version at the time of the change.
- Prefer `bun add <package>@latest` and `bun add -d <package>@latest` so the resolved version is explicitly pinned in `package.json`, unless the user explicitly requests a specific version.
- The `resolutions` block in `package.json` and `@babel/core` staying on 7.x are deliberate, and
  both fail *silently* if undone. Before changing either — or doing any major upgrade — read
  `docs/runbooks/dependencies.md`.

## Agent tooling

- Skills are installed once under `.agents/skills/` (pinned in `skills-lock.json`) and read from
  there by Cursor and, through the symlinks in `.claude/skills/`, by Claude Code. Refresh them
  with `bun run skills:update`; never hand-edit a lock-tracked skill, put repo-specific notes here.
- `agent-browser` is a local devDependency, not a global install. Where a skill says to run
  `agent-browser` from `PATH`, run `bunx agent-browser` instead; upgrade it with
  `bun add -d agent-browser@latest`.
- `.mcp.json` configures `next-devtools-mcp`; the `next-dev-loop` skill also reads `/_next/mcp`
  from the running dev server.

## Test File Location

- Unit/component test files (Vitest + RTL) live in a `__tests__` folder next to the
  component/util/hook they test — not side-by-side with the source file.
  `src/lib/consent/__tests__/consent.test.ts` tests `src/lib/consent/consent.ts`.
- `.test.ts` runs on node, `.test.tsx` on jsdom; a `.test.ts` needing a DOM opts in with
  `// @vitest-environment jsdom`.
- Playwright e2e tests live under `e2e/`. Every full page load opens on the slogan splash —
  use `dismissSplash` from `e2e/fixtures.ts`.

## Environment Variables

- Whenever a new environment variable is introduced or used, add it to `src/lib/env.ts` (or, for a
  `NEXT_PUBLIC_*` value a client module needs, `src/lib/env/public.ts`) and to `.env.template`,
  and consume it via the exported `env`/`publicEnv` object.
- Never read app environment variables directly from `process.env` outside those files. (Build
  tooling — `next.config.ts`, `sanity.cli.ts`, `scripts/` — is exempt.)
- Client components import `@/lib/env/public`, never `@/lib/env`, so server secrets stay out
  of the browser bundle.
- Every variable is currently optional so the site builds before Sanity exists.

## Sanity and content

- Pages fetch through the `get*` functions in `src/lib/sanity/queries/`, wrapped in
  `DraftModeBoundary` (`src/components/Sanity/`) — the three-layer pattern from the
  `sanity-live-cache-components` skill, written once. Never hardcode `perspective`/`stega`.
- After changing a schema or a GROQ query, run `bun run typegen`. Content types in
  `src/content/types.ts` derive from the generated results.
- Until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, queries return the local copy in `src/content/`.
  Keep that copy and the Sanity schema in step; `bun run sanity:seed` pushes it.
- Company details (address, phone, VAT…) live in `src/lib/site.ts`.

## Workflow

For a single task, Claude manually:
1. Invokes `implementer` to build it
2. Invokes appropriate test writer(s) for coverage
3. Invokes `code-reviewer` to validate
4. Handles blockers by re-invoking `implementer` with reviewer feedback
5. Commits when LGTM.
6. After every edit, verify the page still works at runtime using the next-dev-loop skill.

For a full task file, use the custom command:

```
/execute-tasks path/to/tasks.md
```

This drives the full implement → test → review → commit loop for every task in the file, in dependency order.

## Code conventions

### Components
- Components are arrow-function expressions annotated with `React.FC`:
  `export const Thing: React.FC<ThingProps> = ({ a }) => { … };`, with a named `ThingProps`
  interface in the same file. Don't import `React` just for the annotation — the global type
  namespace already provides it. Async server components can't be `React.FC`; annotate their
  props instead (`async ({ a }: ThingProps) => …`).
- Every function declared *inside* a component or a custom hook is an arrow function too.
- `func-style` enforces the expression half of this on non-test `.tsx`. It never sees the
  `React.FC` annotation, and it never flags `export default function` — those are on the author.
- The rule is off for Next.js route entries (`page`/`layout`/`error`/`not-found`/`global-error`/
  `opengraph-image`), which keep the idiomatic `export default function Page`.
- Outside components and hook bodies — `.ts` utils, `lib/`, `route.ts` handlers, tests, and
  module-level helpers — `function` declarations are fine.
- One component per file. Never define a component inside another component's body, and never
  assign JSX to a `const` to render it later — extract a component instead.
- A `.map()` callback in JSX that declares handlers or derived values, nests another `.map()`,
  or exceeds ~10 lines is a component. Extract it.
- A component over ~150 lines, or holding more than three pieces of state, extracts its
  logic into hooks under the nearest `hooks/` folder.
- Reset state with a `key` on the element. Setting state during render is a last resort and
  needs a comment saying why `key` doesn't work.
- Tests never add code to a component (no test-only props, `data-*` seams or re-exports).

### Memoization (React Compiler is on — see `next.config.ts` and `vitest.config.ts`)
- Do not use `useCallback`, `useMemo`, or `memo`. The compiler memoizes; the lint rule
  `no-restricted-imports` enforces this.
- A value that must be created exactly once uses `useState(() => …)`.
- If a function bails out of the compiler (`bun run scripts/react-compiler-scan.mjs`), fix the
  cause; don't work around it with manual memoization.

### Copy
- The site is Italian only. User-visible strings live with their component, or in Sanity once
  it is linked. If a second language is ever needed, adopt `next-intl` the way
  valtiberina.travel does rather than branching on a locale.

### File placement
- `_components/` folders contain components only.
- A helper with one consumer lives beside it. Repo-wide helpers go in `src/lib/`.
- Config tables are keyed objects (`Record<name, value>`).

### Comments
- Explain *why*, not what the next line does. No comment should restate the code.
- No references to task files, plan files, dates, or "verified manually" — git history and
  `docs/` hold that.
- A comment longer than ~5 lines means the code should become a named function whose JSDoc
  carries the reason.

### Commits
- One line. A subject and nothing else — no body, no bullet list of what changed, no measured
  numbers, no trailers.

### Verification
- After every change: `bun run typecheck && bun run lint && bun run test --run <touched folder>`,
  then the `next-dev-loop` skill for anything user-visible. `bun run test:e2e` before shipping.
