"use client";

import { useActionState } from "react";
import Link from "next/link";

import { submitContactForm } from "@/actions/submitContactForm";
import { CenteredColumn } from "@/components/CenteredColumn";
import { EVENTS, onceOnThisPage, trackEvent } from "@/lib/analytics/analytics";
import {
  HONEYPOT_FIELD,
  INITIAL_CONTACT_FORM_STATE,
  type ContactFormState,
} from "@/lib/validation/contactForm";

import { FormField } from "./FormField";

const trackFormStart = () => {
  if (onceOnThisPage("form_start:contatti")) {
    trackEvent(EVENTS.FORM_START, { form_name: "contatti" });
  }
};

const submitAndTrack = async (
  previous: ContactFormState,
  formData: FormData
) => {
  const next = await submitContactForm(previous, formData);
  if (next.status === "success") {
    trackEvent(EVENTS.FORM_SUBMIT, { form_name: "contatti" });
  } else {
    trackEvent(EVENTS.FORM_FAIL, {
      form_name: "contatti",
      fail_reason: next.status,
    });
  }
  return next;
};

export const ContactForm: React.FC = () => {
  const [state, formAction, isPending] = useActionState(
    submitAndTrack,
    INITIAL_CONTACT_FORM_STATE
  );
  const { fieldErrors: errors, values } = state;

  return (
    <CenteredColumn className="my-16">
      <form action={formAction} noValidate className="flex flex-col gap-6">
        <div aria-live="polite">
          {state.status === "success" && (
            <p className="bg-primary rounded p-4 font-bold text-white">
              Grazie per averci contattato! Ti risponderemo il prima possibile!
            </p>
          )}
          {state.status === "error" && (
            <p className="rounded bg-red-700 p-4 font-bold text-white">
              Oops! Sembrerebbe essersi verificato un errore. Per favore,
              riprovare più tardi.
            </p>
          )}
        </div>

        <p hidden>
          <label>
            Non compilare questo campo:{" "}
            <input name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="flex flex-col gap-6 md:flex-row">
          <FormField
            name="name"
            label="Nome"
            autoComplete="name"
            defaultValue={values.name}
            error={errors.name}
            onFocus={trackFormStart}
            className="flex-1"
          />
          <FormField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            defaultValue={values.email}
            error={errors.email}
            onFocus={trackFormStart}
            className="flex-1"
          />
        </div>

        <FormField
          name="subject"
          label="Oggetto"
          defaultValue={values.subject}
          error={errors.subject}
          onFocus={trackFormStart}
        />

        <FormField
          name="message"
          label="Messaggio"
          multiline
          defaultValue={values.message}
          error={errors.message}
          onFocus={trackFormStart}
        />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <label className="flex items-start gap-3 text-base">
              <input
                name="policy"
                type="checkbox"
                defaultChecked={values.policy === "on"}
                aria-invalid={errors.policy ? true : undefined}
                aria-describedby={errors.policy ? "policy-error" : undefined}
                className="accent-primary mt-1.5 size-4"
              />
              <span>
                Confermo di aver preso visione dell&apos;
                <Link href="/privacy-policy" className="underline">
                  informativa sul trattamento dei dati
                </Link>
              </span>
            </label>
            {errors.policy && (
              <p id="policy-error" className="mt-1 text-sm text-red-700">
                {errors.policy}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary cursor-pointer px-12 py-3 text-xl font-bold text-white disabled:cursor-wait disabled:opacity-60"
          >
            {isPending ? "Invio…" : "Invia"}
          </button>
        </div>
      </form>
    </CenteredColumn>
  );
};
