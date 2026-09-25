import type { StructureResolver } from "sanity/structure";

import { SINGLETON_TYPES } from "./schemas/singletons";

const SINGLETON_TITLES = {
  homePage: "Home Page",
  servicesPage: "Servizi",
  partnersPage: "Partners",
  contactsPage: "Contatti",
} as const;

/** Pages first as fixed singletons (as in the old CMS), then the two lists. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenuti")
    .items([
      S.listItem()
        .title("Pagine")
        .child(
          S.list()
            .title("Pagine")
            .items(
              SINGLETON_TYPES.map((type) =>
                S.listItem()
                  .title(SINGLETON_TITLES[type])
                  .id(type)
                  .child(S.document().schemaType(type).documentId(type))
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("Partners")
        .child(
          S.documentTypeList("partner")
            .title("Partners")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Personale")
        .child(
          S.documentTypeList("employee")
            .title("Personale")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ]);
