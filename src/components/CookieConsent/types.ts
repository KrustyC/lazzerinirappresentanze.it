export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
  /** The shape this record was written in. See REPROMPT_BELOW_VERSION. */
  version: number;
}

export interface CookieConsentState {
  preferences: CookieConsentPreferences | null;
  hasAnalyticsConsent: boolean;
  hasAdvertisingConsent: boolean;
  showBanner: boolean;
  showModal: boolean;
}

export interface CookieConsentContextValue extends CookieConsentState {
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  savePreferences: (
    preferences: Pick<CookieConsentPreferences, "analytics" | "advertising">
  ) => void;
}
