import { expect, test } from "@playwright/test";

test("/work renders every entry, grouped, with a pulse dot on current roles", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { level: 2, name: "NOW" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "PREVIOUSLY" })).toBeVisible();
  const rows = page.locator(".xp-row");
  await expect(rows).toHaveCount(5);
  const ga = rows.filter({ hasText: "General Atlantic" });
  await expect(ga.locator(".pulse-dot")).toHaveCount(1);
  await expect(ga.locator(".xp-row__date")).toContainText("JUL 2026 to PRESENT");
  await expect(rows.filter({ hasText: "Brewster" }).locator(".pulse-dot")).toHaveCount(0);
});

test.describe("phone", () => {
  test.use({ viewport: { width: 375, height: 800 } });
  test("date stacks above the org at 375px", async ({ page }) => {
    await page.goto("/work");
    const row = page.locator(".xp-row").first();
    const date = await row.locator(".xp-row__date").boundingBox();
    const org = await row.locator(".xp-row__org").boundingBox();
    expect(date!.y + date!.height).toBeLessThanOrEqual(org!.y);
  });
});

test("Home shows featured work in compact mode", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("#work .xp-row");
  await expect(rows).toHaveCount(2);
  await expect(rows.locator(".xp-row__bullets")).toHaveCount(0);
  await expect(page.locator("#work").getByRole("link", { name: "Full history" })).toHaveAttribute(
    "href",
    "/work",
  );
});

test("Home headshot: AVIF, explicit size, lazy, grayscale until hover", async ({ page }) => {
  await page.goto("/");
  const img = page.getByRole("img", { name: "Mehr Anand", exact: true }).and(page.locator("img"));
  await img.scrollIntoViewIfNeeded();
  await expect(img).toHaveAttribute("width", "160");
  await expect(img).toHaveAttribute("height", "160");
  await expect(img).toHaveAttribute("loading", "lazy");
  await expect
    .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth))
    .toBeGreaterThan(0);
  expect(await img.evaluate((el: HTMLImageElement) => el.currentSrc)).toMatch(/\.avif$/);
  const box = await img.boundingBox();
  expect(Math.round(box!.width)).toBe(160);
  expect(Math.round(box!.height)).toBe(160);
  expect(await img.evaluate((el) => getComputedStyle(el).filter)).toBe("grayscale(1)");
  await img.hover();
  await expect.poll(() => img.evaluate((el) => getComputedStyle(el).filter)).toBe("none");
});
