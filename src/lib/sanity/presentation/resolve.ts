import { defineDocuments, defineLocations } from "sanity/presentation";

const PAGES = {
  home: { title: "Azienda", href: "/" },
  services: { title: "Servizi", href: "/servizi" },
  partners: { title: "Partners", href: "/partners" },
  contacts: { title: "Contatti", href: "/contatti" },
} as const;

const on = (...pages: (keyof typeof PAGES)[]) =>
  defineLocations({ locations: pages.map((page) => PAGES[page]) });

export const locations = {
  homePage: on("home"),
  employee: on("home"),
  servicesPage: on("services"),
  partnersPage: on("partners"),
  partner: on("partners"),
  contactsPage: on("contacts"),
};

export const mainDocuments = defineDocuments([
  { route: "/", filter: `_type == "homePage"` },
  { route: "/servizi", filter: `_type == "servicesPage"` },
  { route: "/partners", filter: `_type == "partnersPage"` },
  { route: "/contatti", filter: `_type == "contactsPage"` },
]);
