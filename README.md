# lazzerinirappresentanze.it

Source code for https://lazzerinirappresentanze.it, the marketing website of
Lazzerini Rappresentanze.

## Stack

- **Next.js 16** (App Router, Cache Components, Partial Prefetching, React Compiler)
- **Tailwind CSS 4**
- **Sanity** — schema, embedded Studio at `/studio`, Presentation tool, Sanity Live
- **Vercel** hosting, Web Analytics and Speed Insights; **Sentry** error monitoring (inert until configured)
- **bun** for everything; **oxlint** / **oxfmt**; **Vitest** + **Playwright**

## Getting started

```bash
bun install
cp .env.template .env.local   # every variable is optional
bun run dev                   # http://localhost:3000
```

With no Sanity project configured the site renders the copy in
`src/content/`. Linking the client's project is a checklist in
`docs/runbooks/sanity.md`.

## Scripts

```bash
bun run dev            # dev server (Turbopack)
bun run build          # production build
bun run verify         # lint + format check + typecheck
bun run test           # Vitest (add --run for a single pass)
bun run test:e2e       # Playwright (starts the dev server)
bun run typegen        # extract the Sanity schema and generate query types
bun run sanity:seed    # push src/content/ into the Sanity dataset
bun run update-packages
bun run skills:update  # refresh the agent skills pinned in skills-lock.json
```

## Working on it

`AGENTS.md` is the entry point for conventions (and what Claude Code, Cursor
and other agents read); `docs/` holds runbooks, PRDs, specs and task files —
see `docs/README.md`.

What is plumbed but deliberately switched off:

| | Where to switch it on |
|---|---|
| Sanity content | `docs/runbooks/sanity.md` |
| Cookie banner + GTM tracking | `docs/runbooks/consent-and-tracking.md` → "Enabling the cookie banner" |
| GDPR privacy policy (current text is outdated) | `docs/runbooks/privacy-policy.md` |
| Contact form email delivery | `docs/runbooks/contact-form.md` |
| Sentry | set the `*SENTRY*` variables in `.env.template` |

## Contribution

As this is a website for a company, contributions will only be accepted in
accordance with the company (Lazzerini Rappresentanze) itself.
