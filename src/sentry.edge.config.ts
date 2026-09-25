import * as Sentry from "@sentry/nextjs";

import { env } from "@/lib/env";

Sentry.init({
  dsn: env.SENTRY_DSN,
  tracesSampleRate: env.NODE_ENV === "development" ? 1.0 : 0.1,
});
