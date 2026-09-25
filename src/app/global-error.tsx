"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

// Replaces the root layout entirely when it fires, so it brings its own
// <html>/<body> and styles.
export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="it">
      <body className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl">Qualcosa è andato storto</h1>
          <p className="mb-4">Si è verificato un errore imprevisto.</p>
          <button
            type="button"
            onClick={retry}
            className="text-primary underline"
          >
            Riprova
          </button>
        </div>
      </body>
    </html>
  );
}
