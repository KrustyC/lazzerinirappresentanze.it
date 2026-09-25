import { defineField, defineType } from "sanity";

import { defineImageField } from "../imageField";

export const employee = defineType({
  name: "employee",
  title: "Personale",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({ name: "job", title: "Titolo di lavoro", type: "string" }),
    defineImageField("picture", "Foto"),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      description: "Posizione nella pagina; i numeri più bassi vengono prima.",
    }),
  ],
  orderings: [
    {
      title: "Ordine",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "name", subtitle: "job", media: "picture" } },
});
