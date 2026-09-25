"use client";

import { useState } from "react";
import Image from "next/image";

import { SITE } from "@/lib/site";
import { classNames } from "@/lib/utils/classNames";

const FADE_MS = 400;

/**
 * The slogan splash the Gatsby site opened with, once per full page load.
 * Unlike the original it no longer withholds the page until dismissed: the
 * content is rendered underneath, so crawlers and slow scripts still get it.
 */
export const InitialOverlay: React.FC = () => {
  const [phase, setPhase] = useState<"shown" | "leaving" | "gone">("shown");

  if (phase === "gone") return null;

  const dismiss = () => {
    setPhase("leaving");
    setTimeout(() => setPhase("gone"), FADE_MS);
  };

  return (
    <button
      type="button"
      onClick={dismiss}
      aria-label="Entra nel sito"
      className={classNames(
        "fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center bg-primary px-6 transition-opacity motion-reduce:transition-none",
        phase === "leaving" && "opacity-0"
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <span className="max-w-[920px] text-center text-3xl leading-[1.6] text-white md:text-5xl md:leading-[1.4]">
        {SITE.slogan}
      </span>
      <span className="absolute top-10 flex w-full justify-center sm:top-auto sm:right-10 sm:bottom-10 sm:w-auto">
        <Image
          src="/images/visual_identity_white_stage02.png"
          alt={SITE.name}
          width={150}
          height={136}
          priority
          className="h-auto"
        />
      </span>
    </button>
  );
};
