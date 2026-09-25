import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (R) =>
        R.max(60).warning(
          "I risultati di ricerca tagliano i titoli oltre 60 caratteri."
        ),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 3,
      validation: (R) =>
        R.max(160).warning(
          "I risultati di ricerca tagliano le descrizioni oltre 160 caratteri."
        ),
    }),
  ],
});
