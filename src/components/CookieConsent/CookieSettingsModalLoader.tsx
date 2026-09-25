"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { useCookieConsent } from "./useCookieConsent";

// Only ever shown after a click, so it stays out of every page's bundle.
const CookieSettingsModal = dynamic(
  () => import("./CookieSettingsModal").then((m) => m.CookieSettingsModal),
  { ssr: false }
);

export const CookieSettingsModalLoader: React.FC = () => {
  const { showModal } = useCookieConsent();
  // Stays mounted after the first open. Derived during render so the modal
  // mounts in the same commit as the click.
  const [everOpened, setEverOpened] = useState(false);

  if (showModal && !everOpened) setEverOpened(true);

  if (!everOpened) return null;

  return <CookieSettingsModal />;
};
