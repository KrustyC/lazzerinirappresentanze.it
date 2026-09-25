import { defineField, defineType } from "sanity";

export const partnersPage = defineType({
  name: "partnersPage",
  title: "Partners",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      initialValue: "I nostri partner",
      validation: (R) => R.required(),
    }),
    defineField({ name: "body", title: "Intestazione", type: "portableText" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Partners" }) },
});
