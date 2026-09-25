import {
  CONSENT_COOKIE_NAME,
  LEGACY_CONSENT_VERSION,
  REPROMPT_BELOW_VERSION,
} from "@/lib/consent/consent";

import type { CookieConsentPreferences } from "./types";

const DAY = 24 * 60 * 60;

/** How long a record that grants something is kept (the Garante's ceiling). */
const CONSENT_MAX_AGE = 180 * DAY;

/**
 * How long a refusal is kept before the banner asks again. The Garante's
 * guidelines treat re-asking sooner than six months as pressure, so a
 * refusal lives exactly as long as an acceptance — unlike rykabogados.cl.
 */
const REJECTION_MAX_AGE = 180 * DAY;

/** The shape records are written in today. Raise with REPROMPT_BELOW_VERSION. */
const CONSENT_VERSION = 1;

function maxAgeFor(preferences: CookieConsentPreferences): number {
  return preferences.analytics || preferences.advertising
    ? CONSENT_MAX_AGE
    : REJECTION_MAX_AGE;
}

/**
 * Turns whatever is in the cookie into a record we can trust. The parse
 * result is `any`, so a record from an older build type-checks while being
 * structurally wrong at runtime.
 */
function normalizePreferences(raw: unknown): CookieConsentPreferences | null {
  if (typeof raw !== "object" || raw === null) return null;

  const value = raw as Record<string, unknown>;
  if (typeof value.timestamp !== "string") return null;

  return {
    necessary: true,
    // `=== true`, not truthiness. Mirrored in readStoredChoices and the
    // bootstrap snippet (src/lib/consent/consent.ts) — change all three.
    analytics: value.analytics === true,
    advertising: value.advertising === true,
    timestamp: value.timestamp,
    version:
      typeof value.version === "number"
        ? value.version
        : LEGACY_CONSENT_VERSION,
  };
}

export function getCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`))
    ?.split("=")[1];

  if (!cookieValue) return null;

  try {
    return normalizePreferences(JSON.parse(decodeURIComponent(cookieValue)));
  } catch {
    return null;
  }
}

export function setCookieConsent(preferences: CookieConsentPreferences): void {
  if (typeof window === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const value = encodeURIComponent(JSON.stringify(preferences));

  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${maxAgeFor(preferences)}; SameSite=Lax${secure}`;
}

/** Both optional categories default to declined: no pre-ticked boxes. */
export function createPreferences({
  analytics = false,
  advertising = false,
}: {
  analytics?: boolean;
  advertising?: boolean;
} = {}): CookieConsentPreferences {
  return {
    necessary: true,
    analytics,
    advertising,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

/** Whether the stored answer still stands: not expired, not a stale shape. */
export function isConsentValid(
  preferences: CookieConsentPreferences | null
): preferences is CookieConsentPreferences {
  if (!preferences?.timestamp) return false;
  if (preferences.version < REPROMPT_BELOW_VERSION) return false;

  const secondsSinceConsent =
    (Date.now() - new Date(preferences.timestamp).getTime()) / 1000;

  return secondsSinceConsent < maxAgeFor(preferences);
}
