"use client";

import { useEffect } from "react";

import { EVENTS, trackEvent } from "@/lib/analytics/analytics";

/**
 * One delegated listener for `tel:`/`mailto:` links and links to other
 * sites (the partner logos), so server components need no handlers. Capture
 * phase, so the signal is recorded even if something stops propagation.
 */
export const LinkClickTracker: React.FC = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const href = event.target.closest("a")?.getAttribute("href");
      if (!href) return;

      if (href.startsWith("tel:") || href.startsWith("mailto:")) {
        trackEvent(EVENTS.CONTACT_CLICK, {
          contact_method: href.startsWith("tel:") ? "phone" : "email",
        });
        return;
      }

      const url = URL.parse(href, window.location.href);
      if (url && url.origin !== window.location.origin) {
        trackEvent(EVENTS.OUTBOUND_CLICK, { link_domain: url.hostname });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
};
