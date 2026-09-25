// oxlint-disable-next-line no-restricted-imports -- the one place next/link is wrapped
import Link from "next/link";

type AppLinkProps = Omit<React.ComponentProps<typeof Link>, "prefetch">;

/**
 * Every internal link on the site. Prefetching is off: on a small site the
 * requests it saves matter more (Vercel bills CDN requests) than the few
 * hundred milliseconds it would shave off a navigation to a static page.
 * `false` in the App Router disables both viewport and hover prefetching.
 *
 * To turn it back on, delete `prefetch={false}` here — and consider
 * re-enabling `partialPrefetching` in next.config.ts.
 */
export const AppLink: React.FC<AppLinkProps> = (props) => (
  <Link {...props} prefetch={false} />
);
