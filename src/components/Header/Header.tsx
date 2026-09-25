import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, SITE } from "@/lib/site";

import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

export const Header: React.FC = () => (
  <header className="mx-auto flex w-[80vw] items-center justify-between py-6">
    <Link href="/" aria-label={`${SITE.name} — home`}>
      <Image
        src="/images/visual_identity_colour_stage02.png"
        alt={SITE.name}
        width={150}
        height={136}
        priority
        className="h-auto"
      />
    </Link>

    <nav aria-label="Principale" className="hidden gap-8 md:flex">
      {NAV_LINKS.map(({ text, href }) => (
        <NavLink key={href} href={href}>
          {text}
        </NavLink>
      ))}
    </nav>

    <MobileMenu />
  </header>
);
