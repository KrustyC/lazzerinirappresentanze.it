// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";

import {
  buildConsentBootstrapSnippet,
  CONSENT_COOKIE_NAME,
  consentStateFrom,
  readStoredChoices,
} from "../consent";

function setConsentCookie(value: unknown) {
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(value))}; path=/`;
}

/** Runs the inline snippet and returns the consent default it pushed. */
function runSnippet(repromptBelow = 1) {
  const w = window as unknown as Record<string, unknown>;
  delete w.__consentDefaults;
  window.dataLayer = [];
  // oxlint-disable-next-line no-new-func -- executing the shipped string is the point
  new Function(buildConsentBootstrapSnippet(repromptBelow))();
  const [, , state] = Array.from(window.dataLayer[0] as ArrayLike<unknown>);
  return state;
}

afterEach(() => {
  document.cookie = `${CONSENT_COOKIE_NAME}=; path=/; max-age=0`;
});

describe("consent defaults", () => {
  it("denies analytics and advertising for a visitor who has not answered", () => {
    expect(readStoredChoices()).toEqual({
      analytics: false,
      advertising: false,
    });
    expect(runSnippet()).toEqual(
      consentStateFrom({ analytics: false, advertising: false })
    );
  });

  it.each([
    { analytics: true, advertising: false },
    { analytics: false, advertising: true },
    { analytics: true, advertising: true },
  ])("snippet and module agree on a stored %o", (choices) => {
    setConsentCookie({
      ...choices,
      timestamp: "2026-09-25T00:00:00Z",
      version: 1,
    });
    expect(readStoredChoices()).toEqual(choices);
    expect(runSnippet()).toEqual(consentStateFrom(choices));
  });

  it("ignores a record older than the reprompt version, in both readers", () => {
    setConsentCookie({
      analytics: true,
      advertising: true,
      timestamp: "x",
      version: 1,
    });
    expect(readStoredChoices(2)).toEqual({
      analytics: false,
      advertising: false,
    });
    expect(runSnippet(2)).toEqual(
      consentStateFrom({ analytics: false, advertising: false })
    );
  });

  it("reads a missing key as declined, never as truthy", () => {
    setConsentCookie({ analytics: "yes", timestamp: "x", version: 1 });
    expect(readStoredChoices()).toEqual({
      analytics: false,
      advertising: false,
    });
  });
});
