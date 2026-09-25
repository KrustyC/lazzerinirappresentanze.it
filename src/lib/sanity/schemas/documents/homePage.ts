import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      initialValue: "Chi Siamo",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduzione",
      type: "portableText",
    }),
    defineField({
      name: "ourHistory1",
      title: "La nostra storia (sopra immagine)",
      type: "portableText",
    }),
    defineField({
      name: "ourHistory2",
      title: "La nostra storia (sotto immagine)",
      type: "portableText",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
