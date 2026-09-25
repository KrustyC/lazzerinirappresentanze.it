import type { Metadata } from "next";

import { env } from "@/lib/env";
import { SITE } from "@/lib/site";
import { leagueSpartan } from "@/lib/utils/fonts";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: "website", siteName: SITE.name, locale: "it_IT" },
};

/**
 * Shared by the site and the embedded Studio. Everything site-specific —
 * header, footer, consent, Sanity Live — lives in `(site)/layout.tsx`, which
 * the Studio must not share.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={leagueSpartan.variable}>
      <body>{children}</body>
    </html>
  );
}
