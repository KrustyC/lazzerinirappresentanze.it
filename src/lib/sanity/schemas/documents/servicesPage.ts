import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The old CMS had only `title` and an unused `body` here; the headline, intro
 * and service list were hardcoded in the page. They are fields now so the
 * copy the page actually shows is editable.
 */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Servizi",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      initialValue: "I nostri servizi",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "headline",
      title: "Frase in evidenza",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Introduzione",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "services",
      title: "Servizi",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Servizi" }) },
});
