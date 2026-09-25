"use client";

import { COOKIE_BANNER_ENABLED } from "@/lib/consent/consent";

import { useCookieConsent } from "./useCookieConsent";

interface CookieSettingsButtonProps {
  className?: string;
}

/** The permanent way back to the choice. Hidden while there is no banner. */
export const CookieSettingsButton: React.FC<CookieSettingsButtonProps> = ({
  className,
}) => {
  const { openSettings } = useCookieConsent();

  if (!COOKIE_BANNER_ENABLED) return null;

  return (
    <button type="button" onClick={openSettings} className={className}>
      Preferenze cookie
    </button>
  );
};
