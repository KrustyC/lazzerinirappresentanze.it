# Runbook: Upgrading dependencies

**Status:** Active
**Date:** 2026-09-25
**Applies to:** `package.json`, `bun.lock`, `vitest.config.ts`
**Origin:** valtiberina.travel `docs/runbooks/dependencies.md` — the same three pins, found there

---

Three decisions here fail **silently** when undone: `verify`, the tests and
`next build` all stay green while the thing you care about is broken.

## Basics

- Always `bun`. Pin to the resolved version: `bun add <pkg>@latest`.
- `bun run update-packages` auto-applies minor/patch updates and lists majors.
- `resolutions` is the field bun honours (not `overrides`) and needs
  `bun install --force` to re-resolve.

## Pin 1 — one `@sanity/client`

`next-sanity@13` still depends on `@sanity/client@^7` while the app uses v8.
Without `resolutions` a second copy lands under `node_modules/next-sanity/`,
TypeGen's `SanityQueries` augmentation attaches to the wrong one, and every
query result silently becomes `unknown` — which is assignable to the explicit
return types in `src/lib/sanity/queries/`, so typecheck passes.

```bash
find node_modules -path "*@sanity/client/package.json" \
  | while read f; do node -p "require('./$f').version"; done | sort | uniq -c
```

Must print one line. `@sanity/visual-editing` is pinned alongside so its peer
range accepts v8. Drop both when `next-sanity` depends on `^8` itself.

## Pin 2 — `@babel/core` stays on 7.x

`babel-plugin-react-compiler@1` needs `@babel/types@^7`. Under Babel 8 the
compiler bails on destructuring defaults, losing memoization with no visible
change. Only vitest and `scripts/react-compiler-scan.mjs` use the root babel —
Next vendors its own. Judge any babel/React upgrade by diffing
`bun run scripts/react-compiler-scan.mjs` before and after (zero `BAIL` lines).

## Pin 3 — one `vite` (watch)

Not pinned yet: today a single `vite` resolves. If `vitest.config.ts` starts
failing typecheck with "Excessive stack depth… PluginOption", two copies have
appeared — add `"vite": "<highest>"` to `resolutions` and reinstall with `--force`.

## Checklist for any major upgrade

1. `bun run verify` 2. `bun run test --run` 3. `bun run build`
4. Sanity touched → the `uniq -c` check above, then `bun run typegen`.
5. babel/React touched → diff the React Compiler scan.
