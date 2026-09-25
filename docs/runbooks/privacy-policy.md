# Runbook: Privacy and cookie policy

**Status:** Active — the current policy is outdated and must be replaced
**Date:** 2026-09-25
**Applies to:** `src/app/(site)/privacy-policy/page.tsx`
**Related:** `consent-and-tracking.md` (enabling the cookie banner), `contact-form.md`

---

> Not legal advice. The policy is the client's legal document (they are the
> *titolare del trattamento*); whatever we draft, they or their consultant
> sign it off.

## When to update it

- **Before the cookie banner goes live.** Step 5 of the checklist in
  `consent-and-tracking.md`: the banner links to `/privacy-policy#cookies`,
  so that section has to describe the cookies that actually exist.
- Whenever a new processor starts handling personal data: an email provider
  for the contact form, Tag Manager/GA4, Sentry with real DSNs, a map or
  video embed, a newsletter tool.
- When a data flow changes (a new form field, new purpose, longer retention).

Keep the `#cookies` anchor: the banner links to it.

## What is wrong with the current page

It is the Gatsby site's text, carried over word for word:

- It cites art. 7 and 13 of **D.Lgs. 196/2003** and the "misure minime,
  Allegato B". Since 2018 the rules are the **GDPR (Reg. UE 2016/679)** plus
  the Codice as amended by D.Lgs. 101/2018, and Allegato B was repealed.
- **"Usando il nostro sito web, acconsenti…"** is implied consent, which is
  not valid consent under the GDPR or the Garante's cookie guidelines.
- It mentions **transfer of data to third parties for email marketing**,
  Facebook/Google login, the "+1" on G+ and advertising partners — none of
  which the site does. A policy must describe what really happens.
- **"Tutti i dati richiesti sono obbligatori"** says nothing about why, or
  what happens if they are not provided.
- There is no legal basis, no retention period, no list of processors, no
  mention of transfers outside the EU, and no right to complain to the Garante.

## What a GDPR policy (informativa, art. 13) must contain

1. Identity and contact details of the controller (Lazzerini Rappresentanze
   S.r.l., address, VAT number, email) — and of a DPO if one is appointed.
2. For each processing activity: **purpose** and **legal basis** (art. 6).
   For this site, roughly:
   - answering the contact form — pre-contractual measures / legitimate interest;
   - server logs and security — legitimate interest;
   - analytics and marketing cookies — consent (only once the banner is live).
3. Recipients / categories of recipients — the processors, e.g. Vercel
   (hosting), Sanity (only if it stores personal data), the email provider,
   Google (GTM/GA4), Sentry.
4. **Transfers outside the EU** and the safeguard used (most of the above are
   US companies: EU-US Data Privacy Framework or standard contractual clauses).
5. **Retention period** for each purpose, or the criteria used to set it.
6. The data subject's rights: access, rectification, erasure, restriction,
   portability, objection, withdrawing consent at any time — and **the right
   to complain to the Garante per la protezione dei dati personali**.
7. Whether providing the data is required, and what happens if it is not
   (e.g. "without an email address we cannot reply").
8. Whether there is automated decision-making or profiling (here: no).

The **cookie section** additionally needs, per the Garante's guidelines on
cookies and other tracking tools (10 June 2021): a list of every cookie with
provider, purpose, duration and category (technical / analytics /
marketing); how to give and withdraw consent (the footer's "Preferenze
cookie"); and links to the third parties' own policies. The cookie list comes
from step 2 of the banner checklist in `consent-and-tracking.md`.

## Where to get a starting template

There is no official "default" policy: the Garante and the EDPB publish
requirements and guidelines, not ready-made texts. Options, best first:

| Source | What it gives | Notes |
|---|---|---|
| **iubenda** (iubenda.com) | Generator for privacy + cookie policy in Italian, kept up to date as laws change; also sells a consent banner | Paid (low yearly fee). The usual choice for Italian SMEs. The policy can be embedded or copied into the page |
| **The client's commercialista / consulente privacy** | A policy written for their real processing, often with the *registro dei trattamenti* | Best for accuracy; the client may already have one for the company |
| **GDPR.eu privacy notice template** (gdpr.eu) | Free English template structured around art. 13 | Needs translating and adapting |
| **Garante** (garanteprivacy.it) | The cookie guidelines (2021) and FAQs: the authority's own list of what to include | Guidance, not a template. Use it to check whatever text you end up with |
| **EDPB transparency guidelines** (WP260 rev.01) | The EU-level reading of art. 12–14 | Reference only |

Recommendation: ask the client first whether they already have an
informativa from their consultant. If not, iubenda is the cheapest way to get
an Italian text that stays maintained. Either way, fill it in with the list
of processors and cookies above, and have the client approve it.

## Implementing it

- Replace the body of `privacy-policy/page.tsx`. Keep company details coming
  from `SITE` (`src/lib/site.ts`) and keep the `id="cookies"` section.
- If the client wants to edit it themselves, make it a Sanity singleton with a
  Portable Text body (see `sanity.md` for the three places a new page type
  needs registering).
- If using iubenda's hosted policy instead of copying the text, embedding it
  loads a third-party script: check it against `consent-and-tracking.md` and
  `security-headers.md`.
- Add a "last updated" date at the top.
