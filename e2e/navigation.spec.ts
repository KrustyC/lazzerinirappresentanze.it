import { expect, test } from "@playwright/test";

import { dismissSplash } from "./fixtures";

const PAGES = [
  {
    link: "Servizi",
    path: "/servizi",
    heading: "“I nostri servizi diventano veri punti di forza”",
  },
  { link: "Partners", path: "/partners", heading: "I nostri partner" },
  {
    link: "Contatti",
    path: "/contatti",
    heading: "Mettiti in contatto con noi",
  },
];

test("the header reaches every page", async ({ page }) => {
  await page.goto("/");
  await dismissSplash(page);
  await expect(
    page.getByRole("heading", { name: "La nostra storia" })
  ).toBeVisible();

  const nav = page.getByRole("navigation", { name: "Principale" });
  for (const { link, path, heading } of PAGES) {
    await nav.getByRole("link", { name: link }).click();
    await expect(page).toHaveURL(path);
    await expect(
      page.getByRole("heading", { level: 1, name: heading })
    ).toBeVisible();
  }
});

test("an unknown URL is a branded 404", async ({ page }) => {
  const response = await page.goto("/pagina-inesistente");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Pagina non trovata" })
  ).toBeVisible();
});

test("the cookie banner stays hidden while tracking is not wired", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("region", { name: "La tua privacy è importante" })
  ).toHaveCount(0);
});
