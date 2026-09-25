"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

import { CenteredColumn } from "@/components/CenteredColumn";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

/**
 * Catches anything a page throws, inside the site layout — so the header and
 * footer stay and the visitor can navigate away. Errors in the layout itself
 * fall through to `app/global-error.tsx`.
 */
export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <CenteredColumn className="mb-24 text-center">
      <h1 className="mb-4 text-3xl md:text-4xl">Qualcosa è andato storto</h1>
      <p className="mb-6">
        Si è verificato un errore imprevisto. Riprova tra qualche istante.
      </p>
      <div className="flex justify-center gap-6">
        <button
          type="button"
          onClick={retry}
          className="text-primary cursor-pointer font-bold underline"
        >
          Riprova
        </button>
        <Link href="/" className="text-primary font-bold underline">
          Torna alla home
        </Link>
      </div>
    </CenteredColumn>
  );
}
