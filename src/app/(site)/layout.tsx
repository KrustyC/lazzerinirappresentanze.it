import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import { SiteAnalytics } from "@/components/Analytics/SiteAnalytics";
import { CookieBanner } from "@/components/CookieConsent/CookieBanner";
import { CookieConsentProvider } from "@/components/CookieConsent/CookieConsentProvider";
import { CookieSettingsModalLoader } from "@/components/CookieConsent/CookieSettingsModalLoader";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { InitialOverlay } from "@/components/InitialOverlay/InitialOverlay";
import { CONSENT_BOOTSTRAP_SNIPPET } from "@/lib/consent/consent";
import { isSanityConfigured } from "@/lib/env";
import { SanityLive } from "@/lib/sanity/live";

/**
 * Everything the public site shares and the embedded Studio must not:
 * chrome, consent, tracking and Sanity Live.
 *
 * Vercel Analytics and Speed Insights sit outside the consent gate on
 * purpose: they set no cookie and store nothing on the device, so the rule
 * the banner implements does not reach them. See
 * docs/runbooks/consent-and-tracking.md.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      {/*
        Consent Mode defaults, before anything else can reach the dataLayer.
        A plain inline script rather than next/script beforeInteractive so it
        is emitted verbatim and runs in document order, ahead of hydration.
        See src/lib/consent/consent.ts.
      */}
      {/* oxlint-disable-next-line react/no-danger -- static snippet, no user input */}
      <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP_SNIPPET }} />

      <CookieConsentProvider>
        <div className="site-root">
          <InitialOverlay />
          <Header />
          <main className="min-h-[67vh]">{children}</main>
          <Footer />

          <CookieBanner />
          <CookieSettingsModalLoader />
          <SiteAnalytics />
        </div>
      </CookieConsentProvider>

      {/* On every request, not only in draft mode: this is what revalidates
          the `use cache` entries when content is published. */}
      {isSanityConfigured && <SanityLive includeDrafts={isDraftMode} />}

      <Analytics />
      <SpeedInsights />

      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}
