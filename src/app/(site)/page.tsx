import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CenteredColumn } from "@/components/CenteredColumn";
import { ParallaxBand } from "@/components/ParallaxBand";
import { RichText } from "@/components/RichText";
import { DraftModeBoundary } from "@/components/Sanity/DraftModeBoundary";
import type { DynamicFetchOptions } from "@/lib/sanity/live";
import { getEmployees } from "@/lib/sanity/queries/getEmployees";
import { getHomePage } from "@/lib/sanity/queries/getHomePage";

import { Employees } from "./_components/Employees";

export const metadata: Metadata = { title: "Azienda" };

export default function HomePage() {
  return (
    <DraftModeBoundary>
      {(options) => <HomeContent {...options} />}
    </DraftModeBoundary>
  );
}

async function HomeContent(options: DynamicFetchOptions) {
  const [page, employees] = await Promise.all([
    getHomePage(options),
    getEmployees(options),
  ]);
  if (!page) notFound();

  return (
    <div className="mb-24">
      <CenteredColumn>
        <h1 className="sr-only">{page.title}</h1>
        <RichText value={page.introduction} />
      </CenteredColumn>

      <Employees employees={employees} />

      <CenteredColumn>
        <h2 className="mb-6 text-3xl md:text-4xl">La nostra storia</h2>
        <RichText value={page.ourHistory1} />
      </CenteredColumn>

      <ParallaxBand src="/images/wine-wide.jpg" className="my-24 h-[600px]" />

      <CenteredColumn>
        <RichText value={page.ourHistory2} />
      </CenteredColumn>
    </div>
  );
}
