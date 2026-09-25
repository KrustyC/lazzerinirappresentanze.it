"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { ensureConsentDefaults } from "@/lib/consent/consent";

const INTERACTION_EVENTS = [
  "pointerdown",
  "keydown",
  "touchstart",
  "scroll",
  "mousemove",
] as const;

/** Backstop so a visitor who reads without interacting is still recorded. */
const FALLBACK_MS = 3500;

interface DeferredGoogleTagManagerProps {
  containerId: string;
}

/**
 * GTM is the heaviest main-thread cost a marketing site carries and none of
 * it is needed to render, so it loads on the first sign of a real visitor.
 * Safe because nothing calls `gtag` directly: pushes made before it arrives
 * are replayed. Loads for everyone — under Consent Mode the container must
 * be present to receive the choice; what consent restricts is the tags.
 *
 * rykabogados.cl also loads it immediately on campaign visits (`?gclid=`),
 * because deferring past a client navigation loses Ads attribution. Port that
 * branch too if this site ever runs paid campaigns.
 */
export const DeferredGoogleTagManager: React.FC<
  DeferredGoogleTagManagerProps
> = ({ containerId }) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    ensureConsentDefaults();
    window.dataLayer = window.dataLayer || [];

    let timer: ReturnType<typeof setTimeout>;

    const cleanup = () => {
      clearTimeout(timer);
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, start);
      }
    };

    const start = () => {
      cleanup();
      setShouldLoad(true);
    };

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, start, { once: true, passive: true });
    }
    timer = setTimeout(start, FALLBACK_MS);

    return cleanup;
  }, []);

  if (!shouldLoad) return null;

  /* oxlint-disable react/no-danger -- static GTM bootstrap snippet, no user input */
  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}');`,
      }}
    />
  );
  /* oxlint-enable react/no-danger */
};
