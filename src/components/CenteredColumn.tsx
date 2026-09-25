import type { PropsWithChildren } from "react";

import { classNames } from "@/lib/utils/classNames";

interface CenteredColumnProps extends PropsWithChildren {
  className?: string;
}

/** The 920px reading column every page's copy sits in. */
export const CenteredColumn: React.FC<CenteredColumnProps> = ({
  className,
  children,
}) => (
  <div className={classNames("mx-auto w-[85vw] max-w-[920px]", className)}>
    {children}
  </div>
);
