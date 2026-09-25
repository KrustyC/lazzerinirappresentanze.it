import { Suspense } from "react";
import { draftMode } from "next/headers";

import { PUBLISHED } from "@/lib/sanity/live";

import { DraftContent, type RenderContent } from "./DraftContent";

interface DraftModeBoundaryProps {
  children: RenderContent;
  fallback?: React.ReactNode;
}

/**
 * Layers 1 and 2 of the three-layer pattern (see the
 * `sanity-live-cache-components` skill), written once instead of per page.
 *
 * Published visitors get `children(PUBLISHED)` with no Suspense, so the page
 * prerenders into the static shell. Only in draft mode are the cookies read —
 * inside Suspense — to resolve the Presentation tool's perspective. Layer 3,
 * the component `children` returns, fetches through `cachedSanity`.
 */
export const DraftModeBoundary = async ({
  children,
  fallback = null,
}: DraftModeBoundaryProps) => {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) return children(PUBLISHED);

  return (
    <Suspense fallback={fallback}>
      <DraftContent render={children} />
    </Suspense>
  );
};
