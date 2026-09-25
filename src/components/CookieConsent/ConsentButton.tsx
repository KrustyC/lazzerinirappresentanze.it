import type { ButtonHTMLAttributes } from "react";

import { classNames } from "@/lib/utils/classNames";

interface ConsentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** "quiet" is for the way out to another surface, never for reject/accept. */
  variant?: "solid" | "quiet";
}

export const ConsentButton: React.FC<ConsentButtonProps> = ({
  variant = "solid",
  className,
  ...props
}) => (
  <button
    type="button"
    className={classNames(
      "cursor-pointer rounded px-5 py-2 text-sm font-bold transition-colors",
      variant === "solid"
        ? "bg-black text-white hover:bg-gray-800"
        : "border border-gray-300 bg-white text-black hover:bg-gray-100",
      className
    )}
    {...props}
  />
);
