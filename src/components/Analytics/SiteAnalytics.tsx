import { publicEnv } from "@/lib/env/public";

import { DeferredGoogleTagManager } from "./DeferredGoogleTagManager";
import { LinkClickTracker } from "./LinkClickTracker";
import { PageViewTracker } from "./PageViewTracker";
import { ScrollDepthTracker } from "./ScrollDepthTracker";

/**
 * Everything tracking-related, in one mount point. Renders nothing until
 * `NEXT_PUBLIC_GTM_ID` is set: with no container there is no reader for the
 * dataLayer, so collecting into it would only be noise.
 */
export const SiteAnalytics: React.FC = () => {
  const containerId = publicEnv.NEXT_PUBLIC_GTM_ID;
  if (!containerId) return null;

  return (
    <>
      <PageViewTracker />
      <ScrollDepthTracker />
      <LinkClickTracker />
      <DeferredGoogleTagManager containerId={containerId} />
    </>
  );
};
