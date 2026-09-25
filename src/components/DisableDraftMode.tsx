export const DisableDraftMode: React.FC = () => (
  // oxlint-disable-next-line nextjs/no-html-link-for-pages -- target is a Route Handler (/api), not a page
  <a
    href="/api/draft/disable"
    className="fixed bottom-4 left-4 z-50 rounded-full bg-gray-900 px-4 py-2 text-sm text-white"
  >
    Esci dall&apos;anteprima
  </a>
);
