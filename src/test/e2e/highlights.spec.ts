import { expect, test } from "@playwright/test";

test("/highlights lists every item newest first, each card linking out", async ({ page }) => {
  await page.goto("/highlights");
  await expect(page.getByRole("heading", { level: 1, name: "Highlights" })).toBeVisible();
  const cards = page.locator(".press-card");
  await expect(cards).toHaveCount(12);
  const links = cards.locator("a.press-card__link");
  for (const a of await links.all()) {
    await expect(a).toHaveAttribute("target", "_blank");
    await expect(a).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(cards.first()).toContainText("SEP 2026");
  await expect(cards.last()).toContainText("SEP 2023");
  // Thumbnails are stored locally, never hotlinked.
  const srcs = await cards
    .locator("img")
    .evaluateAll((els) => els.map((e) => (e as HTMLImageElement).src));
  expect(srcs.every((s) => new URL(s).host === new URL(page.url()).host)).toBe(true);
});

test("Home shows the three newest highlights and the renamed photo carousel", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#highlights .press-card")).toHaveCount(3);
  // Home shows the pinned items (home: true), newest first.
  await expect(page.locator("#highlights .press-card").last()).toContainText("Top 100");
  await expect(
    page.locator("#highlights").getByRole("link", { name: "All highlights" }),
  ).toHaveAttribute("href", "/highlights");
  await expect(page.getByRole("heading", { level: 2, name: "Slice of my life" })).toBeVisible();
});
