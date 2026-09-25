import * as Sentry from "@sentry/nextjs";

import { publicEnv } from "@/lib/env/public";

// No DSN, no SDK: init is a no-op until NEXT_PUBLIC_SENTRY_DSN is set.
Sentry.init({
  dsn: publicEnv.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
});

export { captureRouterTransitionStart as onRouterTransitionStart } from "@sentry/nextjs";
