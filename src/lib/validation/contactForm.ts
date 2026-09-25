import { z } from "zod";

/** The Gatsby form's Yup rules and messages, one for one. */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Per favore inserire un nome")
    .min(3, "Minimo 3 caratteri")
    .max(30, "Massimo 30 caratteri"),
  email: z
    .string()
    .trim()
    .min(1, "Per favore inserire un'email")
    .pipe(z.email("Inserire un indirizzo email corretto")),
  subject: z
    .string()
    .trim()
    .min(1, "Per favore inserire un oggetto")
    .min(5, "Inserire almeno 5 caratteri")
    .max(100, "Inserire meno di 100 caratteri"),
  message: z
    .string()
    .trim()
    .min(1, "Per favore inserire un messaggio")
    .min(50, "Inserire almeno 50 caratteri")
    .max(500, "Inserire meno di 500 caratteri"),
  policy: z.literal("on", {
    error: "È necessario accettare la privacy policy",
  }),
});

export type ContactFormField = keyof z.infer<typeof contactFormSchema>;

export interface ContactFormState {
  status: "idle" | "invalid" | "success" | "error";
  fieldErrors: Partial<Record<ContactFormField, string>>;
  /** Echoed back so a rejected submission keeps what the visitor typed. */
  values: Partial<Record<ContactFormField, string>>;
}

export const INITIAL_CONTACT_FORM_STATE: ContactFormState = {
  status: "idle",
  fieldErrors: {},
  values: {},
};

/** A hidden field people never see; anything in it came from a bot. */
export const HONEYPOT_FIELD = "bot-field";
