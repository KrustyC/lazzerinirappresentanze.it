// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";

import {
  EVENTS,
  onceOnThisPage,
  pageTypeFromPathname,
  resetPageScope,
  trackEvent,
} from "../analytics";

beforeEach(() => {
  window.dataLayer = [];
  resetPageScope();
});

describe("analytics", () => {
  it("maps paths to page types, trailing slash included", () => {
    expect(pageTypeFromPathname("/")).toBe("home");
    expect(pageTypeFromPathname("/servizi/")).toBe("servizi");
    expect(pageTypeFromPathname("/altro")).toBe("other");
  });

  it("resets every label the event does not set", () => {
    trackEvent(EVENTS.FORM_START, { form_name: "contatti" });
    trackEvent(EVENTS.SCROLL, { percent_scrolled: 50 });
    const scroll = window.dataLayer?.at(-1) as Record<string, unknown>;
    expect(scroll).toHaveProperty("form_name", undefined);
    expect(scroll).toMatchObject({ event: "lz_scroll", percent_scrolled: 50 });
  });

  it("fires once per page until the scope is reset", () => {
    expect(onceOnThisPage("k")).toBe(true);
    expect(onceOnThisPage("k")).toBe(false);
    resetPageScope();
    expect(onceOnThisPage("k")).toBe(true);
  });
});
