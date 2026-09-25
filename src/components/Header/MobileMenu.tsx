"use client";

import { useState } from "react";

import { NAV_LINKS } from "@/lib/site";

import { NavLink } from "./NavLink";

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5"
      >
        <span className="h-1 w-8 rounded bg-black" />
        <span className="h-1 w-8 rounded bg-black" />
        <span className="h-1 w-8 rounded bg-black" />
      </button>

      {isOpen && (
        <nav
          id="mobile-menu"
          className="bg-primary fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
        >
          {NAV_LINKS.map(({ text, href }) => (
            <NavLink
              key={href}
              href={href}
              onNavigate={() => setIsOpen(false)}
              className="text-3xl text-white hover:text-black aria-[current=page]:text-black"
            >
              {text}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
};
