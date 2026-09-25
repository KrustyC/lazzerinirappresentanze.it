import Image from "next/image";
import Link from "next/link";

import { CookieSettingsButton } from "@/components/CookieConsent/CookieSettingsButton";
import { FOOTER_LINKS, SITE } from "@/lib/site";

export const Footer: React.FC = () => (
  <footer className="bg-black px-10 py-16 text-white md:px-20">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-stretch">
      <div className="flex flex-2 items-center justify-center">
        <Image
          src="/images/visual_identity_bcolour_white_stage02.png"
          alt={SITE.name}
          width={120}
          height={109}
          className="h-auto"
        />
      </div>

      <nav
        aria-label="Footer"
        className="flex w-full flex-5 flex-col gap-4 border-y border-white py-8 md:border-x md:border-y-0 md:px-8 md:py-0"
      >
        {FOOTER_LINKS.map(({ text, href }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-primary text-base font-bold text-white uppercase"
          >
            {text}
          </Link>
        ))}
        <CookieSettingsButton className="hover:text-primary cursor-pointer text-left text-base font-bold text-white uppercase" />
      </nav>

      <address className="w-full flex-3 text-sm font-bold text-white not-italic">
        {SITE.legalName.toUpperCase()}
        <br />
        {SITE.street} - {SITE.postalCode}
        <br />
        {SITE.city} ({SITE.province}) - {SITE.country}
        <br />
        <br />
        Tel/Fax.{" "}
        <a href={`tel:+39${SITE.phone.replaceAll(" ", "")}`}>{SITE.phone}</a>
        <br />
        P.Iva {SITE.vatNumber}
        <br />
        <br />
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex size-12 items-center justify-center rounded bg-white"
        >
          <Image src="/images/linkedin.png" alt="" width={30} height={30} />
        </a>
      </address>
    </div>
  </footer>
);
