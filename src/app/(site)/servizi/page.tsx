import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ParallaxBand } from "@/components/ParallaxBand";
import { DraftModeBoundary } from "@/components/Sanity/DraftModeBoundary";
import type { DynamicFetchOptions } from "@/lib/sanity/live";
import { getServicesPage } from "@/lib/sanity/queries/getServicesPage";

import { ServiceItem } from "./_components/ServiceItem";

export const metadata: Metadata = { title: "Servizi" };

export default function ServicesPage() {
  return (
    <DraftModeBoundary>
      {(options) => <ServicesContent {...options} />}
    </DraftModeBoundary>
  );
}

async function ServicesContent(options: DynamicFetchOptions) {
  const page = await getServicesPage(options);
  if (!page) notFound();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 flex flex-col justify-around"
      >
        <ParallaxBand src="/images/wine-wide.jpg" />
        <ParallaxBand src="/images/coffe.jpg" />
        <ParallaxBand src="/images/kegs.jpg" />
      </div>

      <div className="relative flex flex-col gap-16 py-24">
        <div className="flex w-full flex-col justify-center bg-black/50 px-5 py-10 text-white md:w-[70vw]">
          <h1 className="mb-4 text-3xl text-white md:text-4xl">
            {page.headline || page.title}
          </h1>
          <p>{page.intro}</p>
        </div>

        <ol className="flex flex-col gap-16">
          {page.services.map((service, index) => (
            <ServiceItem key={service} index={index} text={service} />
          ))}
        </ol>
      </div>
    </div>
  );
}
