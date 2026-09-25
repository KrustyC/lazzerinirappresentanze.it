"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <Link
      href={href}
      onNavigate={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={classNames(
        "font-bold transition-colors aria-[current=page]:text-primary hover:text-primary",
        className
      )}
    >
      {children}
    </Link>
  );
};
