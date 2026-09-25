import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CenteredColumn } from "@/components/CenteredColumn";
import { DraftModeBoundary } from "@/components/Sanity/DraftModeBoundary";
import type { DynamicFetchOptions } from "@/lib/sanity/live";
import { getContactsPage } from "@/lib/sanity/queries/getContactsPage";

import { ContactForm } from "./_components/ContactForm";
import { MapCard } from "./_components/MapCard";
import { OfficeInfo } from "./_components/OfficeInfo";

export const metadata: Metadata = { title: "Contatti" };

export default function ContactsPage() {
  return (
    <DraftModeBoundary>
      {(options) => <ContactsContent {...options} />}
    </DraftModeBoundary>
  );
}

async function ContactsContent(options: DynamicFetchOptions) {
  const page = await getContactsPage(options);
  if (!page) notFound();

  return (
    <div className="mb-24">
      <CenteredColumn>
        <h1 className="text-3xl md:text-4xl">{page.title}</h1>
      </CenteredColumn>
      <MapCard />
      <OfficeInfo address={page.address} />
      <ContactForm />
    </div>
  );
}
