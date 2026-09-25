# Queries

One file per read. Each exports its `defineQuery` string (picked up by
`bun run typegen`) and a `get*` function that pages call with the
`perspective`/`stega` pair from the three-layer pattern.

Every `get*` returns the local copy in `src/content/` while
`NEXT_PUBLIC_SANITY_PROJECT_ID` is unset. Once the project exists and
`bun run sanity:seed` has run, delete that branch and `src/content/` with it —
see `docs/runbooks/sanity.md`.
