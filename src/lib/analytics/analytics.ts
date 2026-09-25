/**
 * The site's whole signal vocabulary, and the only file that pushes events
 * to the Tag Manager dataLayer. Ported from rykabogados.cl; the reasoning
 * behind each rule is in `docs/runbooks/consent-and-tracking.md`.
 *
 * Nothing here is wired to a report yet: without `NEXT_PUBLIC_GTM_ID` no
 * container loads and these pushes sit in `window.dataLayer` unread.
 */

import { ensureConsentDefaults } from "@/lib/consent/consent";

/**
 * Every event name is prefixed so one Tag Manager rule (`lz_.*`) can forward
 * the whole family to Analytics. Change the prefix per project.
 */
const EVENT_PREFIX = "lz";

/**
 * Call sites reference these rather than spelling the string out: a typo in a
 * literal is a signal that silently never appears in any report.
 */
export const EVENTS = {
  PAGE_VIEW: `${EVENT_PREFIX}_page_view`,
  SCROLL: `${EVENT_PREFIX}_scroll`,
  CONTACT_CLICK: `${EVENT_PREFIX}_contact_click`,
  OUTBOUND_CLICK: `${EVENT_PREFIX}_outbound_click`,
  FORM_START: `${EVENT_PREFIX}_form_start`,
  FORM_SUBMIT: `${EVENT_PREFIX}_form_submit`,
  FORM_FAIL: `${EVENT_PREFIX}_form_fail`,
} as const;

export type SiteEvent = (typeof EVENTS)[keyof typeof EVENTS];

/** A closed set on purpose: a free-form string becomes an unusable dimension. */
export type PageType =
  | "home"
  | "servizi"
  | "partners"
  | "contatti"
  | "legal"
  | "other";

export type ScrollDepth = 25 | 50 | 75 | 100;

export type FormName = "contatti";

/**
 * What each event is allowed — and required — to carry. The compiler, not
 * a report read six weeks later, catches a correct name with wrong labels.
 */
interface EventPayloads {
  [EVENTS.PAGE_VIEW]: {
    is_first_page: boolean;
    previous_page?: string;
    previous_page_type?: PageType;
  };
  [EVENTS.SCROLL]: { percent_scrolled: ScrollDepth };
  [EVENTS.CONTACT_CLICK]: { contact_method: "phone" | "email" };
  [EVENTS.OUTBOUND_CLICK]: { link_domain: string };
  [EVENTS.FORM_START]: { form_name: FormName };
  [EVENTS.FORM_SUBMIT]: { form_name: FormName };
  [EVENTS.FORM_FAIL]: { form_name: FormName; fail_reason: string };
}

type LabelKey = {
  [E in SiteEvent]: keyof EventPayloads[E];
}[SiteEvent];

/**
 * Tag Manager folds every push into one persistent model, where a key stays
 * set until a later push overwrites it — so a `form_name` from one event
 * would still be read on the next page view. Every push spreads this first,
 * making each label explicitly `undefined` unless the event sets it. Typed
 * over every label so adding one without resetting it is a compile error.
 */
const RESET_LABELS: Record<LabelKey, undefined> = {
  is_first_page: undefined,
  previous_page: undefined,
  previous_page_type: undefined,
  percent_scrolled: undefined,
  contact_method: undefined,
  link_domain: undefined,
  form_name: undefined,
  fail_reason: undefined,
};

const PAGE_TYPES: Record<string, PageType> = {
  "/": "home",
  "/servizi": "servizi",
  "/partners": "partners",
  "/contatti": "contatti",
  "/privacy-policy": "legal",
};

export function pageTypeFromPathname(pathname: string): PageType {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return PAGE_TYPES[path] ?? "other";
}

/**
 * Signals that mean "the first time on this page". The site never reloads
 * between pages, so PageViewTracker resets this on every navigation.
 */
let firedOnThisPage = new Set<string>();

export function onceOnThisPage(key: string): boolean {
  if (firedOnThisPage.has(key)) return false;
  firedOnThisPage.add(key);
  return true;
}

export function resetPageScope(): void {
  firedOnThisPage = new Set<string>();
}

/**
 * Safe before GTM has loaded: the container replays whatever is already in
 * the array. The consent default is guaranteed to precede every push.
 */
export function trackEvent<E extends SiteEvent>(
  event: E,
  payload: EventPayloads[E]
): void {
  if (typeof window === "undefined") return;

  ensureConsentDefaults();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...RESET_LABELS,
    event,
    page_type: pageTypeFromPathname(window.location.pathname),
    ...payload,
  });
}
