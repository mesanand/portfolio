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

  test("tab order: skip link, wordmark, nav items", async ({ page }) => {
    await page.goto("/");
    const expected = [
      "Skip to content",
      "Mehr Anand, home",
      "WORK",
      "PROJECTS",
      "LEADERSHIP",
      "HIGHLIGHTS",
      "NETWORK",
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
  for (const path of ["/", "/work", "/projects", "/leadership", "/highlights"]) {
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

test("no resume link anywhere; Request my resume opens a prefilled email", async ({ page }) => {
  for (const path of ["/", "/work"]) {
    await page.goto(path);
    await expect(page.locator('a[href*="resume.pdf"]')).toHaveCount(0);
    await expect(page.locator("header").getByText(/resume/i)).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Request my resume" })).toHaveAttribute(
      "href",
      "mailto:anand.me@northeastern.edu?subject=Resume%20request",
    );
  }
});

test.describe("NETWORK (the Tower, proxied at /network)", () => {
  // Stand in for the Tower app: in production Vercel rewrites /network to it.
  const stubTower = (page: import("@playwright/test").Page) =>
    page.route("**/network", (route) =>
      route.fulfill({ contentType: "text/html", body: "<title>Tower stub</title><h1>TOWER</h1>" }),
    );

  const expectPlainAnchor = async (link: import("@playwright/test").Locator) => {
    await expect(link).toHaveAttribute("href", "/network");
    // React Router's <Link>/<NavLink> add data-discover; a plain anchor does not.
    await expect(link).not.toHaveAttribute("data-discover", /.*/);
  };

  /** Clicking must be a full page load: a marker on window must not survive. */
  const expectFullPageLoad = async (
    page: import("@playwright/test").Page,
    click: () => Promise<void>,
  ) => {
    await page.evaluate(() => ((window as unknown as { __spa: boolean }).__spa = true));
    await click();
    await expect(page).toHaveURL(/\/network$/);
    await expect(page.locator("h1")).toHaveText("TOWER");
    expect(
      await page.evaluate(() => (window as unknown as { __spa?: boolean }).__spa),
    ).toBeUndefined();
  };

  test("header link is a plain anchor that fully reloads", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await stubTower(page);
    await page.goto("/");
    const link = page.locator(".site-nav").getByRole("link", { name: "NETWORK", exact: true });
    await expectPlainAnchor(link);
    await expectFullPageLoad(page, () => link.click());
  });

  test("footer link is a plain anchor that fully reloads", async ({ page }) => {
    await stubTower(page);
    await page.goto("/");
    const link = page.locator("footer").getByRole("link", { name: "NETWORK", exact: true });
    await expectPlainAnchor(link);
    await expectFullPageLoad(page, () => link.click());
  });

  test("phone menu link is a plain anchor that fully reloads", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 740 });
    await stubTower(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const link = page.getByRole("dialog").getByRole("link", { name: "NETWORK", exact: true });
    await expectPlainAnchor(link);
    await expectFullPageLoad(page, () => link.click());
  });
});
