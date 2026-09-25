import { notFound } from "next/navigation";

/**
 * Sends every unmatched URL to `(site)/not-found.tsx`, so a 404 keeps the
 * header and footer. The root `not-found` would render outside the site
 * layout, which the Studio must not share.
 *
 * It never renders UI of its own, so instant validation only ever sees the
 * throw — hence the opt-out.
 */
export const instant = false;

export default function CatchAll() {
  notFound();
}
