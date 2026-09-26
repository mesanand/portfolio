import { expect, test } from "@playwright/test";

test("/highlights lists every item newest first, each card linking out", async ({ page }) => {
  await page.goto("/highlights");
  await expect(page.getByRole("heading", { level: 1, name: "Highlights" })).toBeVisible();
  const cards = page.locator(".press-card");
  await expect(cards).toHaveCount(15);
  const links = cards.locator("a.press-card__link");
  for (const a of await links.all()) {
    await expect(a).toHaveAttribute("target", "_blank");
    await expect(a).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(cards.first()).toContainText("SEP 2026");
  // Dated items run newest first; undated ones (e.g. paywalled articles) come after them.
  const metas = await cards.locator(".press-card__meta").allTextContents();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const keys = metas.map((m) => {
    const hit = /([A-Z]{3}) (\d{4})/.exec(m);
    return hit ? Number(hit[2]) * 12 + months.indexOf(hit[1]!) : null;
  });
  const dated = keys.filter((k): k is number => k !== null);
  expect(dated).toEqual([...dated].sort((a, b) => b - a));
  expect(keys.slice(dated.length).every((k) => k === null)).toBe(true);
  await expect(cards.last()).toContainText("SEP 2023");
  // Every highlight is dated, so the whole list is chronological.
  expect(dated).toHaveLength(15);
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
