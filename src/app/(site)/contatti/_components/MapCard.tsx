import { SITE } from "@/lib/site";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${SITE.coordinates.lat},${SITE.coordinates.lng}`;

/**
 * Stands in for the Google Maps embed the Gatsby site used. An embedded map
 * sets third-party cookies and needs an API key, so it waits for the redesign
 * (and the consent banner) to decide how it comes back.
 */
export const MapCard: React.FC = () => (
  <a
    href={MAPS_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="my-12 flex h-72 w-full flex-col items-center justify-center gap-2 bg-gray-100 text-center font-bold hover:bg-gray-200"
  >
    <span>
      {SITE.street} - {SITE.postalCode} {SITE.city} ({SITE.province})
    </span>
    <span className="text-primary underline">Apri in Google Maps</span>
  </a>
);
