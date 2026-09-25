import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { publicEnv } from "./src/lib/env/public";
import { locations, mainDocuments } from "./src/lib/sanity/presentation/resolve";
import { schemaTypes } from "./src/lib/sanity/schemas";
import { isSingletonType } from "./src/lib/sanity/schemas/singletons";
import { structure } from "./src/lib/sanity/structure";

/** Singletons can be edited and published, never created, duplicated or deleted. */
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Lazzerini Rappresentanze",

  // The placeholder only lets the config load (and `bun run typegen` run)
  // before the project exists; the Studio route refuses to mount without a
  // real id.
  projectId: publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "not-configured",
  dataset: publicEnv.NEXT_PUBLIC_SANITY_DATASET,
  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve: { locations, mainDocuments },
      previewUrl: {
        previewMode: {
          enable: "/api/draft/enable",
          disable: "/api/draft/disable",
        },
      },
    }),
    visionTool({ defaultApiVersion: publicEnv.NEXT_PUBLIC_SANITY_API_VERSION }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !isSingletonType(schemaType)),
  },

  document: {
    actions: (actions, { schemaType }) =>
      isSingletonType(schemaType)
        ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },
});
