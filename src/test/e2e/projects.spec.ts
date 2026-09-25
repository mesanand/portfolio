import { expect, test } from "@playwright/test";

test("?tag=hackathon loads filtered; ALL restores and clears the param", async ({ page }) => {
  await page.goto("/projects?tag=hackathon");
  const cells = page.locator(".cells .cell");
  const hackathon = page.getByRole("button", { name: "hackathon", exact: true });
  const all = page.getByRole("button", { name: "All", exact: true });

  await expect(hackathon).toHaveAttribute("aria-pressed", "true");
  await expect(all).toHaveAttribute("aria-pressed", "false");
  await expect(cells).toHaveCount(3);
  for (const text of await cells.locator(".cell__foot .chips").allTextContents())
    expect(text.toLowerCase()).toContain("hackathon");

  await all.click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(all).toHaveAttribute("aria-pressed", "true");
  await expect(cells).toHaveCount(6);
});

test("filter buttons are keyboard-operable and announce state", async ({ page }) => {
  await page.goto("/projects");
  const api = page.getByRole("button", { name: "api", exact: true });
  await api.focus();
  await page.keyboard.press("Enter");
  await expect(api).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/\?tag=api$/);
  await expect(page.locator(".cells .cell")).toHaveCount(1);
  await page.getByRole("button", { name: "ml", exact: true }).focus();
  await page.keyboard.press("Space");
  await expect(page).toHaveURL(/\?tag=ml$/);
  await expect(page.locator(".cells .cell")).toHaveCount(3);
});

test("Home shows the three featured projects and a link to all", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#projects .cell")).toHaveCount(3);
  await expect(
    page.locator("#projects").getByRole("link", { name: "All projects" }),
  ).toHaveAttribute("href", "/projects");
});
