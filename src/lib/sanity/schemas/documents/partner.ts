import { defineField, defineType } from "sanity";

import { defineImageField } from "../imageField";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (R) => R.required().uri({ scheme: ["http", "https"] }),
    }),
    defineImageField("logo", "Logo"),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      description: "Posizione nella griglia; i numeri più bassi vengono prima.",
    }),
  ],
  orderings: [
    {
      title: "Ordine",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "name", subtitle: "link", media: "logo" } },
});
