"use client";

import { useEffect } from "react";

import {
  EVENTS,
  onceOnThisPage,
  type ScrollDepth,
  trackEvent,
} from "@/lib/analytics/analytics";

const DEPTHS: readonly ScrollDepth[] = [25, 50, 75, 100];

/** Remounted per route by ScrollDepthTracker, so every page starts from zero. */
export const ScrollDepthListener: React.FC = () => {
  useEffect(() => {
    const reached = new Set<ScrollDepth>();
    let frame = 0;

    const cleanup = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", measure);
    };

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const percent =
        scrollable <= 0
          ? 100
          : ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;

      for (const depth of DEPTHS) {
        // Half a percent of slack for fractional-pixel devices.
        if (percent + 0.5 < depth) continue;
        if (onceOnThisPage(`scroll:${depth}`)) {
          trackEvent(EVENTS.SCROLL, { percent_scrolled: depth });
        }
        reached.add(depth);
      }

      if (reached.size === DEPTHS.length) cleanup();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Wait for images, or the page is briefly short enough to read as
    // fully scrolled.
    if (document.readyState === "complete") measure();
    else window.addEventListener("load", measure, { once: true });

    return cleanup;
  }, []);

  return null;
};
