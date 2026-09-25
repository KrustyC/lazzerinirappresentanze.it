import { expect, test } from "@playwright/test";

import { dismissSplash } from "./fixtures";

test("the contact form validates, then accepts a complete message", async ({
  page,
}) => {
  await page.goto("/contatti");
  await dismissSplash(page);

  await page.getByRole("button", { name: "Invia" }).click();
  await expect(page.getByText("Per favore inserire un nome")).toBeVisible();
  await expect(
    page.getByText("È necessario accettare la privacy policy")
  ).toBeVisible();

  await page.getByLabel("Nome").fill("Mario Rossi");
  await page.getByLabel("Email").fill("mario@example.com");
  await page.getByLabel("Oggetto").fill("Richiesta informazioni");
  await page
    .getByLabel("Messaggio")
    .fill("Buongiorno, vorrei avere maggiori informazioni sui vostri servizi.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Invia" }).click();

  await expect(page.getByText("Grazie per averci contattato!")).toBeVisible();
});
