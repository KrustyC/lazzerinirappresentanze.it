import { defineField, defineType } from "sanity";

export const contactsPage = defineType({
  name: "contactsPage",
  title: "Contatti",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      initialValue: "Contattaci",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "address",
      title: "Indirizzo",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contatti" }) },
});
