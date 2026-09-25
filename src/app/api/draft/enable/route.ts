import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { env } from "@/lib/env";
import { client } from "@/lib/sanity/client";

// next-sanity's route rather than a hand-rolled one: it also stores the
// perspective the Studio opened the preview with (what
// `getDynamicFetchOptions` reads back) and marks the cookies `Partitioned`
// inside the Presentation iframe so Safari keeps draft mode there.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: env.SANITY_API_READ_TOKEN }),
});
