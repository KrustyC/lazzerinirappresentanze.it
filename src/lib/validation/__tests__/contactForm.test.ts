import { describe, expect, it } from "vitest";

import { contactFormSchema } from "../contactForm";

const valid = {
  name: "Mario Rossi",
  email: "mario@example.com",
  subject: "Richiesta informazioni",
  message: "x".repeat(50),
  policy: "on",
};

describe("contactFormSchema", () => {
  it("accepts a complete submission", () => {
    expect(contactFormSchema.safeParse(valid).success).toBe(true);
  });

  it("asks for a missing field before judging its length", () => {
    const result = contactFormSchema.safeParse({ ...valid, name: "" });
    expect(result.error?.issues[0].message).toBe("Per favore inserire un nome");
  });

  it("rejects a message under 50 characters", () => {
    const result = contactFormSchema.safeParse({ ...valid, message: "breve" });
    expect(result.error?.issues[0].message).toBe(
      "Inserire almeno 50 caratteri"
    );
  });

  it("requires the privacy checkbox", () => {
    const { policy: _policy, ...withoutPolicy } = valid;
    expect(contactFormSchema.safeParse(withoutPolicy).success).toBe(false);
  });
});
