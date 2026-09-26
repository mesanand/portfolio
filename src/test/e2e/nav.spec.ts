import { expect, test, type Page } from "@playwright/test";

/** Accessible-ish name of the focused element: aria-label, else trimmed text. */
const focusedName = (page: Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el) return "";
    return (el.getAttribute("aria-label") ?? el.textContent ?? "").replace(/\s+/g, " ").trim();
  });

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("tab order: skip link, wordmark, nav items, resume", async ({ page }) => {
    await page.goto("/");
    const expected = [
      "Skip to content",
      "Mehr Anand, home",
      "WORK",
      "PROJECTS",
      "LEADERSHIP",
      "HIGHLIGHTS",
      "MY NETWORK",
      "Resume",
    ];
    const seen: string[] = [];
    for (let i = 0; i < expected.length; i++) {
      await page.keyboard.press("Tab");
      seen.push(await focusedName(page));
    }
    expect(seen).toEqual(expected);
    await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
  });

  test("skip link moves focus to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });

  test("active route is marked", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.locator(".site-nav .nav-link.active")).toHaveText("PROJECTS");
  });
});

test.describe("phone menu", () => {
  test.use({ viewport: { width: 375, height: 740 } });

  test("opens with Enter, traps focus, closes with Escape, returns focus", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await expect(page.locator(".site-nav")).toBeHidden();

    // Skip link, wordmark, then MENU.
    for (let i = 0; i < 3; i++) await page.keyboard.press("Tab");
    await expect(toggle).toBeFocused();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    // Tab well past the number of focusables; focus must never leave the dialog.
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    }
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Shift+Tab");
      expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(toggle).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  });

  test("navigating from the menu closes it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "WORK", exact: true }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

test.describe("frame", () => {
  for (const path of ["/", "/work", "/projects", "/leadership", "/highlights", "/network"]) {
    test(`${path} renders inside the frame`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("header.site-header")).toBeVisible();
      await expect(page.locator("main#main h1")).toBeVisible();
      await expect(page.locator("footer.site-footer")).toBeVisible();
    });
  }

  test("404 renders on a hard load of an unknown path", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page.locator("main h1")).toHaveText("Nothing at this address.");
    await expect(page.locator("header.site-header")).toBeVisible();
    await page.reload();
    await expect(page.locator("main h1")).toHaveText("Nothing at this address.");
  });
});
