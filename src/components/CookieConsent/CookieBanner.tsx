"use client";

import Link from "next/link";

import { ConsentButton } from "./ConsentButton";
import { useCookieConsent } from "./useCookieConsent";

/**
 * First layer. Reject and accept are the same component with the same
 * weight, so neither is the easier button — the EDPB cookie-banner taskforce
 * went after banners that styled rejection to be less visible. Not
 * role="dialog": it is non-modal and the page stays usable behind it.
 *
 * Mounted but inert while COOKIE_BANNER_ENABLED is false.
 */
export const CookieBanner: React.FC = () => {
  const { showBanner, acceptAll, rejectAll, openSettings } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <section
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h2 id="cookie-banner-title" className="mb-2 text-lg">
            La tua privacy è importante
          </h2>
          <p className="text-sm">
            Utilizziamo cookie tecnici e, solo con il tuo consenso, cookie di
            analisi e di marketing. Puoi accettarli tutti, rifiutarli tutti o
            scegliere quali consentire da «Personalizza».{" "}
            <Link
              href="/privacy-policy#cookies"
              className="font-bold underline"
            >
              Maggiori informazioni
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <ConsentButton variant="quiet" onClick={openSettings}>
            Personalizza
          </ConsentButton>
          <ConsentButton onClick={rejectAll}>Rifiuta tutti</ConsentButton>
          <ConsentButton onClick={acceptAll}>Accetta tutti</ConsentButton>
        </div>
      </div>
    </section>
  );
};
