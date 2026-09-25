"use server";

import { z } from "zod";

import {
  type ContactFormField,
  type ContactFormState,
  contactFormSchema,
  HONEYPOT_FIELD,
} from "@/lib/validation/contactForm";

const FIELDS: ContactFormField[] = [
  "name",
  "email",
  "subject",
  "message",
  "policy",
];

/**
 * Validates the contact form. Delivery is deliberately a stub until an email
 * provider is chosen — see `docs/runbooks/contact-form.md` for where to plug
 * it in. It logs that a submission arrived, never its contents.
 */
export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "")])
  ) as Record<ContactFormField, string>;

  // Pretend success so the bot learns nothing.
  if (formData.get(HONEYPOT_FIELD)) {
    return { status: "success", fieldErrors: {}, values: {} };
  }

  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "invalid",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [
          field,
          messages?.[0],
        ])
      ),
      values,
    };
  }

  try {
    // TODO(contact-form): send `parsed.data` with the chosen provider.
    console.info("[contact-form] submission received (delivery not wired)");
    return { status: "success", fieldErrors: {}, values: {} };
  } catch {
    return { status: "error", fieldErrors: {}, values };
  }
}
