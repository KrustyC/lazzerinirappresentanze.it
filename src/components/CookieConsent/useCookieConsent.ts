"use client";

import { use } from "react";

import { CookieConsentContext } from "./CookieConsentProvider";

export function useCookieConsent() {
  const context = use(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    );
  }

  return context;
}
