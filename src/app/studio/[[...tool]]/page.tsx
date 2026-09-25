import { isSanityConfigured } from "@/lib/env";

import { Studio } from "./Studio";
import { StudioNotConfigured } from "./StudioNotConfigured";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return isSanityConfigured ? <Studio /> : <StudioNotConfigured />;
}
