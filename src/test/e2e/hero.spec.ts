import { expect, test } from "@playwright/test";

for (const width of [320, 768, 1440]) {
  test(`hero mark renders legibly at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const mark = page.getByRole("img", { name: "Mehr Anand" });
    await expect(mark).toBeVisible();
    const box = await mark.boundingBox();
    expect(box).not.toBeNull();
    // Never overflows the viewport, never smaller than the 260px clamp minimum.
    expect(box!.width).toBeGreaterThanOrEqual(260 - 1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
    await page.waitForTimeout(1200); // let the entrance finish
    await page.locator(".hero").screenshot({ path: `test-results/hero-${width}.png` });
  });
}

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("hero content is visible immediately and nothing animates", async ({ page }) => {
    await page.goto("/");
    const opacities = await page.$$eval(
      ".hero__mark, .hero__subline, .hero__where, .hero__actions",
      (els) => els.map((el) => getComputedStyle(el).opacity),
    );
    expect(opacities).toEqual(["1", "1", "1", "1"]);
    const running = await page.evaluate(() => document.getAnimations().length);
    expect(running).toBe(0);
  });
});
