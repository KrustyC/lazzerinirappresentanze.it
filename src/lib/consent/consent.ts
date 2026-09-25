/**
 * Google Consent Mode v2: the visitor's cookie choice, in the form Google
 * understands. Ported from rykabogados.cl, where every rule below was learned
 * the hard way — read `docs/runbooks/consent-and-tracking.md` before changing
 * any of it.
 *
 * This is the only file that issues gtag commands, and the bootstrap snippet
 * below is the only thing that touches `window.dataLayer` before hydration.
 * `src/lib/analytics/analytics.ts` is the only file that pushes events.
 *
 * `window.gtag` does not exist here: the Google tag is loaded *through* GTM,
 * which keeps the gtag API internal, so consent commands are pushed onto the
 * dataLayer ourselves in the shape gtag.js would have pushed them. That shape
 * is an `arguments` object, not an array — GTM ignores an array push as a
 * command, silently — which is why `gtag` below is a non-arrow function
 * reaching for `arguments`.
 */

/** The seven storage types Consent Mode v2 defines. */
export interface ConsentModeState {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
  functionality_storage: ConsentValue;
  personalization_storage: ConsentValue;
  security_storage: ConsentValue;
}

export type ConsentValue = "granted" | "denied";

/** The two categories the banner asks about. */
export interface ConsentChoices {
  analytics: boolean;
  advertising: boolean;
}

/** The subset a visitor's choice can move. The other three never change. */
type MutableConsentState = Pick<
  ConsentModeState,
  "ad_storage" | "ad_user_data" | "ad_personalization" | "analytics_storage"
>;

type GtagCommand =
  | ["consent", "default", ConsentModeState]
  | ["consent", "update", MutableConsentState]
  | ["set", "url_passthrough" | "ads_data_redaction", boolean];

/**
 * Whether the banner mounts at all. Before flipping it, follow the checklist
 * in `docs/runbooks/consent-and-tracking.md` ("Enabling the cookie banner").
 *
 * `false` while nothing on the site sets a cookie that needs consent: no
 * Tag Manager container is wired in yet (`NEXT_PUBLIC_GTM_ID` is unset), so
 * there is nothing to ask about. Flip it to `true` in the same change that
 * sets the container id, and update the cookie section of the privacy
 * policy. The footer's "Preferenze cookie" link follows this flag too.
 */
export const COOKIE_BANNER_ENABLED = false;

/**
 * The cookie the banner writes. Declared here rather than in the CookieConsent
 * component because two things read it and only one of them is React: the
 * provider, and the pre-hydration snippet below.
 */
export const CONSENT_COOKIE_NAME = "cookie-consent";

/**
 * Records below this version are treated as no answer at all: the banner
 * comes back and Google is told nothing was granted. Raise it (together with
 * `CONSENT_VERSION` in `src/components/CookieConsent/utils.ts`) whenever the
 * categories or the wording change enough that earlier answers stop counting.
 */
export const REPROMPT_BELOW_VERSION = 1;

/** A record with no `version` field predates versioning. */
export const LEGACY_CONSENT_VERSION = 0;

/**
 * What a visitor who has not answered is taken to have said: nothing.
 *
 * Denied by default because this is an Italian site under the GDPR and the
 * Garante's cookie guidelines — prior consent, no pre-ticked boxes, no
 * "scrolling means yes". rykabogados.cl ran this the other way round under
 * Chilean law; do not copy that setting here.
 */
export const UNANSWERED_CHOICES: ConsentChoices = {
  analytics: false,
  advertising: false,
};

/**
 * Marks the defaults as sent, so the snippet and `ensureConsentDefaults` can
 * both run without double-pushing. Whichever gets there first wins.
 */
const CONSENT_READY_FLAG = "__consentDefaults";

function grant(allowed: boolean): ConsentValue {
  return allowed ? "granted" : "denied";
}

/**
 * The category-to-storage-type mapping, in one place.
 *
 * All seven types are declared, including the three no choice moves: an
 * *undeclared* type behaves as granted, so listing only the four the banner
 * controls would leave the rest silently permissive.
 */
export function consentStateFrom(choices: ConsentChoices): ConsentModeState {
  return {
    ad_storage: grant(choices.advertising),
    ad_user_data: grant(choices.advertising),
    ad_personalization: grant(choices.advertising),
    analytics_storage: grant(choices.analytics),
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  };
}

const gtag: (...command: GtagCommand) => void = function () {
  window.dataLayer = window.dataLayer || [];
  // oxlint-disable-next-line prefer-rest-params -- GTM reads the arguments
  // object itself; an array is not a command. See the file header.
  window.dataLayer.push(arguments);
};

/**
 * Reads the stored choice without React, for the framework-free callers.
 *
 * `repromptBelow` is a parameter only so the version gate can be tested
 * without editing the constant; callers never pass it.
 */
export function readStoredChoices(
  repromptBelow: number = REPROMPT_BELOW_VERSION
): ConsentChoices {
  if (typeof document === "undefined") return UNANSWERED_CHOICES;

  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`)
    );
    if (!match) return UNANSWERED_CHOICES;

    const stored: unknown = JSON.parse(decodeURIComponent(match[1]));
    if (typeof stored !== "object" || stored === null) {
      return UNANSWERED_CHOICES;
    }

    const value = stored as Record<string, unknown>;
    const version =
      typeof value.version === "number"
        ? value.version
        : LEGACY_CONSENT_VERSION;
    if (version < repromptBelow) return UNANSWERED_CHOICES;

    // `=== true`, not truthiness. Mirrored in normalizePreferences
    // (src/components/CookieConsent/utils.ts) and in the bootstrap snippet
    // below — change all three together.
    return {
      analytics: value.analytics === true,
      advertising: value.advertising === true,
    };
  } catch {
    return UNANSWERED_CHOICES;
  }
}

/**
 * The defaults, sent once per page load before anything can trigger a tag.
 *
 * Idempotent: the inline snippet normally gets here first, and this is the
 * fallback for when it cannot run (a CSP without a hash, an extension that
 * strips inline scripts).
 */
export function ensureConsentDefaults(): void {
  if (typeof window === "undefined") return;

  const flagged = window as unknown as Record<string, unknown>;
  if (flagged[CONSENT_READY_FLAG]) return;
  flagged[CONSENT_READY_FLAG] = 1;

  gtag("consent", "default", consentStateFrom(readStoredChoices()));
  gtag("set", "ads_data_redaction", true);
  gtag("set", "url_passthrough", true);
}

/**
 * The visitor has just chosen. Moves the four types a choice can move.
 * Consent Mode does not replay: events already processed stay as they were.
 */
export function updateConsent(choices: ConsentChoices): void {
  if (typeof window === "undefined") return;

  const state = consentStateFrom(choices);

  gtag("consent", "update", {
    ad_storage: state.ad_storage,
    ad_user_data: state.ad_user_data,
    ad_personalization: state.ad_personalization,
    analytics_storage: state.analytics_storage,
  });
}

function compact(source: string): string {
  return source.replace(/\s+/g, " ").trim();
}

/**
 * The same defaults again, as a string for the site layout to inline.
 *
 * This is the copy that runs in production. It has to exist separately
 * because everything above loads with the bundle, after hydration — by which
 * time the page-view tracker has already pushed an event. GTM replays the
 * dataLayer in order and an undeclared consent type behaves as granted, so
 * only a script that runs before hydration guarantees the default is first.
 *
 * ES5 only (no const, no optional chaining). Every statement is
 * semicolon-terminated so collapsing whitespace is safe. Kept in sync with
 * `consentStateFrom` by `src/lib/consent/__tests__/consent.test.ts`, which
 * executes this string and compares the result.
 *
 * Exported as a builder so the version gate can be tested at values other
 * than the live one. Production uses CONSENT_BOOTSTRAP_SNIPPET.
 */
export function buildConsentBootstrapSnippet(repromptBelow: number): string {
  return compact(`
(function () {
  var w = window;
  if (w.${CONSENT_READY_FLAG}) return;
  w.${CONSENT_READY_FLAG} = 1;
  w.dataLayer = w.dataLayer || [];
  function g() { w.dataLayer.push(arguments); }
  var G = 'granted', N = 'denied';
  var a = ${UNANSWERED_CHOICES.analytics ? "G" : "N"}, d = ${UNANSWERED_CHOICES.advertising ? "G" : "N"};
  try {
    var m = document.cookie.match(/(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)/);
    if (m) {
      var p = JSON.parse(decodeURIComponent(m[1]));
      var v = typeof p.version === 'number' ? p.version : ${LEGACY_CONSENT_VERSION};
      if (v >= ${repromptBelow}) {
        a = p.analytics === true ? G : N;
        d = p.advertising === true ? G : N;
      }
    }
  } catch (e) {}
  g('consent', 'default', {
    ad_storage: d,
    ad_user_data: d,
    ad_personalization: d,
    analytics_storage: a,
    functionality_storage: G,
    personalization_storage: N,
    security_storage: G
  });
  g('set', 'ads_data_redaction', true);
  g('set', 'url_passthrough', true);
})();
`);
}

export const CONSENT_BOOTSTRAP_SNIPPET = buildConsentBootstrapSnippet(
  REPROMPT_BELOW_VERSION
);
