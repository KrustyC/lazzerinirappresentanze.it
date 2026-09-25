"use client";

import { usePathname } from "next/navigation";

import { AppLink } from "@/components/AppLink";
import { classNames } from "@/lib/utils/classNames";

interface NavLinkProps {
  href: "/" | "/servizi" | "/partners" | "/contatti";
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className,
  onNavigate,
}) => {
  const isActive = usePathname() === href;

  return (
    <AppLink
      href={href}
      onNavigate={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={classNames(
        "font-bold transition-colors aria-[current=page]:text-primary hover:text-primary",
        className
      )}
    >
      {children}
    </AppLink>
  );
};
