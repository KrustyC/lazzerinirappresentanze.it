// A global script (no imports/exports), so this merges into `Window`.
interface Window {
  /** Google Tag Manager's queue. See src/lib/consent/consent.ts. */
  dataLayer?: unknown[];
}
