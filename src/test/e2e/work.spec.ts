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

test("Home headshot: AVIF, 280px, lazy, always in color", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const img = page.locator(".about__headshot img");
  await img.scrollIntoViewIfNeeded();
  await expect(img).toHaveAttribute("alt", "Mehr Anand");
  await expect(img).toHaveAttribute("loading", "lazy");
  await expect
    .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth))
    .toBeGreaterThan(0);
  expect(await img.evaluate((el: HTMLImageElement) => el.currentSrc)).toMatch(/\.avif$/);
  const box = await img.boundingBox();
  expect(Math.round(box!.width)).toBe(280);
  expect(Math.round(box!.height)).toBe(280);
  expect(await img.evaluate((el) => getComputedStyle(el).filter)).toBe("none");
});

test("/work shows a photo on the four roles that have one", async ({ page }) => {
  await page.goto("/work");
  await expect(page.locator(".xp-row__photo img")).toHaveCount(4);
  await expect(
    page.locator(".xp-row", { hasText: "Dana-Farber" }).locator(".xp-row__photo"),
  ).toHaveCount(0);
  // NYC Connector is summary-only: no bullet list.
  await expect(
    page.locator(".xp-row", { hasText: "NYC Network Connector" }).locator(".xp-row__bullets"),
  ).toHaveCount(0);
});

test("Slice of my life drifts, pauses on hover and with the PAUSE button", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const viewport = page.locator(".carousel__viewport");
  const strip = page.locator(".carousel__strip");
  await viewport.scrollIntoViewIfNeeded();
  // The photo list is rendered twice for a seamless loop; the copy is hidden from assistive tech.
  await expect(page.locator(".carousel__set").first().locator(".carousel-card")).toHaveCount(17);
  await expect(page.locator(".carousel__set").nth(1)).toHaveAttribute("aria-hidden", "true");
  const x = () => strip.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  await page.mouse.move(0, 0);
  const a = await x();
  await page.waitForTimeout(700);
  expect(await x()).toBeLessThan(a); // moving left

  await viewport.hover();
  await page.waitForTimeout(200);
  const h1 = await x();
  await page.waitForTimeout(500);
  expect(await x()).toBe(h1); // paused while hovered

  await page.mouse.move(0, 0);
  const pause = page.getByRole("button", { name: "Pause" });
  await pause.click();
  await expect(page.getByRole("button", { name: "Play" })).toHaveAttribute("aria-pressed", "true");
  await page.mouse.move(0, 0);
  const p1 = await x();
  await page.waitForTimeout(500);
  expect(await x()).toBe(p1); // paused by the button
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("Slice of my life is a still, swipeable row with arrows", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.locator(".carousel__strip")).toHaveCount(0);
    const track = page.locator(".carousel__track");
    await expect(track.locator(".carousel-card")).toHaveCount(17);
    await expect(page.getByRole("button", { name: "Previous photos" })).toBeDisabled();
    await page.getByRole("button", { name: "Next photos" }).click();
    await expect.poll(() => track.evaluate((t) => t.scrollLeft)).toBeGreaterThan(0);
  });
});
