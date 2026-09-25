"use client";

import { usePathname } from "next/navigation";

import { ScrollDepthListener } from "./ScrollDepthListener";

/** GA4's own scroll event fires only at 90%; these marks are finer. */
export const ScrollDepthTracker: React.FC = () => {
  const pathname = usePathname();
  return <ScrollDepthListener key={pathname} />;
};
