import Image from "next/image";

import type { Partner } from "@/content/types";

interface PartnerLogoProps {
  partner: Partner;
}

export const PartnerLogo: React.FC<PartnerLogoProps> = ({ partner }) => (
  <li>
    <a
      href={partner.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative mx-auto flex h-50 w-55 items-center justify-center"
    >
      {partner.logo?.url ? (
        <Image
          src={partner.logo.url}
          alt={partner.logo.alt}
          fill
          sizes="220px"
          className="object-contain"
        />
      ) : (
        <span className="font-bold">{partner.name}</span>
      )}
    </a>
  </li>
);
