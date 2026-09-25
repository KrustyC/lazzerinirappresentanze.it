import type { Page } from "@playwright/test";

/** Every full page load opens on the slogan splash; click through it. */
export async function dismissSplash(page: Page) {
  await page.getByRole("button", { name: "Entra nel sito" }).click();
}
