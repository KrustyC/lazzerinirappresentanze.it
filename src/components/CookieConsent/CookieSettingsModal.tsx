"use client";

import { useEffect, useRef, useState } from "react";

import { ConsentButton } from "./ConsentButton";
import { ConsentToggle } from "./ConsentToggle";
import { useCookieConsent } from "./useCookieConsent";

/**
 * Second layer: the three categories and the three real choices. Cancelling
 * is the ✕ (and Esc), not a fourth button — it is not a
 * decision about cookies. A native <dialog>, so focus trapping and Esc come
 * from the browser.
 */
export const CookieSettingsModal: React.FC = () => {
  const {
    showModal,
    closeSettings,
    savePreferences,
    acceptAll,
    rejectAll,
    preferences,
  } = useCookieConsent();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [analytics, setAnalytics] = useState(preferences?.analytics ?? false);
  const [advertising, setAdvertising] = useState(
    preferences?.advertising ?? false
  );

  // Re-seed each time the dialog opens, not only on mount: the loader keeps
  // this mounted, and stale switches saved back would silently revoke what
  // the visitor had just granted from the banner.
  const [wasOpen, setWasOpen] = useState(showModal);
  if (wasOpen !== showModal) {
    setWasOpen(showModal);
    if (showModal) {
      setAnalytics(preferences?.analytics ?? false);
      setAdvertising(preferences?.advertising ?? false);
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (showModal && !dialog.open) dialog.showModal();
    if (!showModal && dialog.open) dialog.close();
  }, [showModal]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-settings-title"
      onClose={closeSettings}
      className="m-auto w-full max-w-2xl rounded-xl bg-white p-0 shadow-2xl backdrop:bg-black/30"
    >
      <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4">
        <div>
          <h2 id="cookie-settings-title" className="text-2xl">
            Preferenze cookie
          </h2>
          <p className="text-sm">Scegli quali cookie consentire.</p>
        </div>
        <button
          type="button"
          onClick={closeSettings}
          aria-label="Chiudi senza salvare"
          className="cursor-pointer rounded p-2 text-xl leading-none hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[60vh] space-y-4 overflow-y-auto px-6 py-6">
        <ConsentToggle
          title="Cookie necessari"
          description="Servono al funzionamento del sito, incluso il cookie che ricorda questa scelta. Non possono essere disattivati."
          checked
        />
        <ConsentToggle
          title="Cookie di analisi"
          description="Ci aiutano a capire, in forma aggregata, come viene usato il sito."
          checked={analytics}
          onChange={setAnalytics}
        />
        <ConsentToggle
          title="Cookie di marketing"
          description="Ci permettono di misurare l'efficacia delle nostre campagne pubblicitarie."
          checked={advertising}
          onChange={setAdvertising}
        />
      </div>

      <div className="flex flex-col justify-end gap-3 border-t border-gray-200 px-6 py-4 md:flex-row">
        <ConsentButton onClick={rejectAll}>Rifiuta tutti</ConsentButton>
        <ConsentButton
          variant="quiet"
          onClick={() => savePreferences({ analytics, advertising })}
        >
          Salva preferenze
        </ConsentButton>
        <ConsentButton onClick={acceptAll}>Accetta tutti</ConsentButton>
      </div>
    </dialog>
  );
};
