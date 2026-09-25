import { defineField, type FieldDefinition } from "sanity";

/** A hotspot-cropped image carrying the alt text every image needs. */
export function defineImageField(name: string, title: string): FieldDefinition {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Testo alternativo",
        type: "string",
        validation: (R) =>
          R.required().warning(
            "Il testo alternativo serve ad accessibilità e SEO."
          ),
      }),
    ],
  });
}
