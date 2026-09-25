# Runbook: Contact form

**Status:** Active — delivery is a stub
**Applies to:** `src/actions/submitContactForm.ts`, `src/lib/validation/contactForm.ts`, `src/app/(site)/contatti/_components/ContactForm.tsx`

The Gatsby site posted to Netlify Forms, which does not exist on Vercel. The
form now submits to a server action that validates with zod (same rules and
Italian messages as the old Yup schema), rejects the `bot-field` honeypot
silently, and **logs that a submission arrived without sending it anywhere**.

## Wiring delivery

1. Pick a provider (Resend is the lightest on Vercel; Mailjet was in the old
   dependencies). `bun add <sdk>@latest`.
2. Add its key and the recipient to `src/lib/env.ts` and `.env.template`.
3. Replace the `TODO(contact-form)` in `submitContactForm.ts`. Keep the
   `try/catch`: a thrown send must return `status: "error"`, which the form
   shows and tracks as `lz_form_fail`.
4. Never log `parsed.data` — it is personal data.
5. Update `e2e/contatti.spec.ts` to stub the provider.
6. Add the provider to the privacy policy (processor, transfer, retention) —
   see `privacy-policy.md`.
