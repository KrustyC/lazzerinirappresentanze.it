import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CenteredColumn } from "@/components/CenteredColumn";
import { RichText } from "@/components/RichText";
import { DraftModeBoundary } from "@/components/Sanity/DraftModeBoundary";
import type { DynamicFetchOptions } from "@/lib/sanity/live";
import { getPartnersPage } from "@/lib/sanity/queries/getPartnersPage";

import { PartnerLogo } from "./_components/PartnerLogo";

export const metadata: Metadata = { title: "I nostri partner" };

export default function PartnersPage() {
  return (
    <DraftModeBoundary>
      {(options) => <PartnersContent {...options} />}
    </DraftModeBoundary>
  );
}

async function PartnersContent(options: DynamicFetchOptions) {
  const { page, partners } = await getPartnersPage(options);
  if (!page) notFound();

  return (
    <>
      <CenteredColumn>
        <h1 className="mb-6 text-3xl md:text-4xl">{page.title}</h1>
        <RichText value={page.body} />
      </CenteredColumn>

      <ul className="mx-auto my-24 grid w-[80vw] grid-cols-1 items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner) => (
          <PartnerLogo key={partner._id} partner={partner} />
        ))}
      </ul>
    </>
  );
}
