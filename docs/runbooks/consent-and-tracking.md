# Runbook: Consent and tracking

**Status:** Active — plumbing only, nothing wired
**Date:** 2026-09-25
**Applies to:** `src/lib/consent/`, `src/lib/analytics/`, `src/components/CookieConsent/`, `src/components/Analytics/`, `src/app/(site)/layout.tsx`
**Origin:** ported from rykabogados.cl (`docs/tracking-plan.md`, `docs/consent-mode-runbook.md` there hold the full history)

---

## What ships today

| Piece | State |
|---|---|
| Consent Mode v2 defaults (inline snippet in the site layout) | **Live** — pushes `denied` for analytics/ads before hydration |
| Cookie banner + settings modal | **Hidden** — `COOKIE_BANNER_ENABLED = false` in `src/lib/consent/consent.ts` |
| "Preferenze cookie" footer link | Hidden with the banner |
| Tag Manager | **Not loaded** — `NEXT_PUBLIC_GTM_ID` unset, `SiteAnalytics` renders nothing |
| Page view / scroll / link-click trackers | Not mounted (inside `SiteAnalytics`) |
| Contact form events | Pushed to `window.dataLayer`, read by nothing |

Nothing sets a non-technical cookie, which is why the banner can be off.

## Enabling the cookie banner

### When it becomes necessary

The banner must be live **before** the site sets or reads anything beyond
strictly technical cookies. In practice, the moment any of these ships:

- Google Tag Manager / Google Analytics / Google Ads (`NEXT_PUBLIC_GTM_ID`)
- any other analytics or marketing pixel (Meta, LinkedIn Insight, Hotjar…)
- a third-party embed that sets cookies — a Google Maps iframe (the old
  Contatti map), YouTube (use `youtube-nocookie.com` or gate it), social widgets

Cookieless tools (e.g. Vercel Analytics) and the site's own technical cookies
(the consent cookie itself, Sanity draft mode) do **not** need it.

### Checklist

Do steps 3–6 in **one deploy**: a tracker without the banner means nobody
can grant consent (and under our denied default it collects nothing useful);
a banner without a tracker asks about cookies that do not exist.

1. **Tag Manager** — create the container; add the GA4 tag and one tag
   forwarding `lz_.*` events with their labels as parameters. Give every tag
   its consent requirement (`analytics_storage` for GA4, `ad_storage` +
   `ad_user_data` for Ads). The site already sends Consent Mode defaults.
2. **Cookie list** — load the site with GTM in Tag Assistant preview, accept
   everything, and write down every cookie that appears (name, provider,
   purpose, duration, category). This is the input for step 5.
3. **Flag** — in `src/lib/consent/consent.ts` set
   `COOKIE_BANNER_ENABLED = true`. That alone mounts the banner for
   visitors who have not answered and shows "Preferenze cookie" in the footer.
4. **Env** — set `NEXT_PUBLIC_GTM_ID=GTM-…` in Vercel (Production, and
   Preview if you want to test there) and in `.env.local`.
5. **Policy** — update `/privacy-policy` **before** this deploy: the banner
   links to its `#cookies` section, which must list the cookies from step 2.
   The current text is the Gatsby-era one (D.Lgs. 196/2003, implied consent)
   and needs a full GDPR rewrite, not just a cookie table — see
   `privacy-policy.md` for what it must contain, where to get a template,
   and the client sign-off.
6. **Banner copy** — check the text in `CookieBanner.tsx` and the category
   descriptions in `CookieSettingsModal.tsx` still match what the site does
   (drop the marketing category if there are no ads tags).
7. **Tests** — `e2e/navigation.spec.ts` asserts the banner is *hidden*; flip
   it to assert it is visible on a first visit, and add a journey: reject →
   reload → no banner; "Preferenze cookie" → accept.

### Verifying

- Fresh private window: the banner appears; no `_ga*` cookie exists yet.
- In the console, `dataLayer[0]` is the `consent default` with
  `analytics_storage: "denied"` — it must come before any `lz_*` event.
- Accept → a `consent update` with `granted` is pushed, `_ga` appears, and
  Tag Assistant shows GA4 firing. Reload → no banner.
- Reject → no `_ga`; GA4 may still send cookieless pings (expected under
  Consent Mode — the policy must not claim "nothing is sent to Google").
- Footer "Preferenze cookie" reopens the dialog with the stored choice.

### Later changes

If categories or banner wording change materially, raise
`REPROMPT_BELOW_VERSION` (`consent.ts`) and `CONSENT_VERSION`
(`CookieConsent/utils.ts`) together so everyone is asked again.

## Rules that break silently

- **Defaults are denied.** `UNANSWERED_CHOICES` is `false/false` — GDPR and the
  Garante's guidelines. rykabogados.cl grants by default under Chilean law;
  never copy that setting back.
- **The rule "a stored choice reads `=== true`" exists three times**:
  `readStoredChoices` and the snippet in `consent.ts`, and
  `normalizePreferences` in `CookieConsent/utils.ts`. Change all three; the
  parity test (`src/lib/consent/__tests__/consent.test.ts`) runs the snippet
  string to catch drift.
- **Consent commands are `arguments` objects, not arrays.** GTM silently
  ignores an array push as a command. That is why `gtag` is a `function`.
- **Declare all seven storage types** — an undeclared one behaves as granted.
- **Only `analytics.ts` pushes events; only `consent.ts` issues consent
  commands.** New events go in `EVENTS` with a payload in `EventPayloads`;
  new labels in `RESET_LABELS` (the compiler insists) — GTM's data model
  otherwise carries a label into the next event.
- **Never gate the container on consent.** Under Consent Mode it must load for
  everyone to receive the choice; consent restricts the tags inside.
- **The provider's state is `choice ?? storedState`, never
  `useState(storedState)`** — the latter hid rykabogados' banner for a month.
- **Refusals last as long as acceptances (180 days).** Re-asking sooner reads
  as pressure under the Garante's guidelines.
- Raising `REPROMPT_BELOW_VERSION` (with `CONSENT_VERSION` in `utils.ts`)
  re-asks everyone — do it when categories or wording change materially.

## Not ported (add when needed)

rykabogados' campaign attribution (`gclid`/`utm_*` first/last-touch cookies),
enhanced conversions `user_data`, and loading GTM immediately on campaign
visits. All three matter only once paid campaigns run.
