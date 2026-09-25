"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  EVENTS,
  pageTypeFromPathname,
  resetPageScope,
  trackEvent,
} from "@/lib/analytics/analytics";

/**
 * Sends a page view on every client-side navigation, with the three labels
 * GA4's own soft-navigation page views lack: what kind of page, where from,
 * and whether it was the entry point.
 */
export const PageViewTracker: React.FC = () => {
  const pathname = usePathname();
  const reported = useRef<string | null>(null);

  useEffect(() => {
    // Guard on the page already reported rather than a first-run flag, so
    // Strict Mode's double mount cannot produce a second page view.
    if (reported.current === pathname) return;

    const previous = reported.current;
    reported.current = pathname;

    resetPageScope();

    trackEvent(EVENTS.PAGE_VIEW, {
      is_first_page: previous === null,
      ...(previous && {
        previous_page: previous,
        previous_page_type: pageTypeFromPathname(previous),
      }),
    });
  }, [pathname]);

  return null;
};
