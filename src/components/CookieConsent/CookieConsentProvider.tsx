"use client";

import {
  createContext,
  type PropsWithChildren,
  useState,
  useSyncExternalStore,
} from "react";

import {
  COOKIE_BANNER_ENABLED,
  UNANSWERED_CHOICES,
  updateConsent,
} from "@/lib/consent/consent";

import type {
  CookieConsentContextValue,
  CookieConsentPreferences,
  CookieConsentState,
} from "./types";
import {
  createPreferences,
  getCookieConsent,
  isConsentValid,
  setCookieConsent,
} from "./utils";

export const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

// Nothing outside this provider changes the consent cookie, so there is
// nothing to subscribe to.
const subscribe = () => () => {};

/**
 * `getSnapshot` must return a stable reference, so the result is computed
 * once. The cache goes stale the moment a visitor chooses, which is harmless
 * only because the provider lives in the site layout and never remounts.
 */
let cachedStoredState: CookieConsentState | undefined;

const getStoredState = (): CookieConsentState => {
  if (cachedStoredState) return cachedStoredState;

  const stored = getCookieConsent();

  cachedStoredState = isConsentValid(stored)
    ? {
        preferences: stored,
        hasAnalyticsConsent: stored.analytics,
        hasAdvertisingConsent: stored.advertising,
        showBanner: false,
        showModal: false,
      }
    : {
        preferences: null,
        hasAnalyticsConsent: UNANSWERED_CHOICES.analytics,
        hasAdvertisingConsent: UNANSWERED_CHOICES.advertising,
        showBanner: COOKIE_BANNER_ENABLED,
        showModal: false,
      };

  return cachedStoredState;
};

const SERVER_STATE: CookieConsentState = {
  preferences: null,
  hasAnalyticsConsent: false,
  hasAdvertisingConsent: false,
  showBanner: false,
  showModal: false,
};

export const CookieConsentProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // The document cookie, which the server cannot read: SERVER_STATE during
  // SSR and hydration, the real record right after.
  const storedState = useSyncExternalStore(
    subscribe,
    getStoredState,
    () => SERVER_STATE
  );

  // What the visitor has done since, if anything. Deliberately not
  // `useState(storedState)`: useState's initialiser runs once, during
  // hydration, where the store returns the *server* snapshot — and then
  // ignores the client one. That bug hid the banner from everyone on
  // rykabogados.cl for a month.
  const [choice, setChoice] = useState<CookieConsentState | null>(null);

  const state = choice ?? storedState;

  /** The single write path: store, tell Google, update the UI. */
  const applyChoice = (preferences: CookieConsentPreferences) => {
    setCookieConsent(preferences);
    updateConsent(preferences);
    setChoice({
      preferences,
      hasAnalyticsConsent: preferences.analytics,
      hasAdvertisingConsent: preferences.advertising,
      showBanner: false,
      showModal: false,
    });
  };

  const value: CookieConsentContextValue = {
    ...state,
    acceptAll: () =>
      applyChoice(createPreferences({ analytics: true, advertising: true })),
    rejectAll: () => applyChoice(createPreferences()),
    openSettings: () => setChoice({ ...state, showModal: true }),
    closeSettings: () => setChoice({ ...state, showModal: false }),
    savePreferences: (preferences) =>
      applyChoice(createPreferences(preferences)),
  };

  return <CookieConsentContext value={value}>{children}</CookieConsentContext>;
};
