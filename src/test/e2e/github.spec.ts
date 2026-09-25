import { existsSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import type { ContributionLevel, GithubPayload } from "../../lib/github-types";

const LEVELS: ContributionLevel[] = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
];
const iso = (d: Date) => d.toISOString().slice(0, 10);

/** A GitHub-shaped year ending today: 52 full weeks plus a partial current week. */
function fixture(): GithubPayload {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 364 - today.getUTCDay());
  const weeks: GithubPayload["calendar"]["weeks"] = [];
  for (let d = new Date(start), i = 0; d <= today; d.setUTCDate(d.getUTCDate() + 1), i++) {
    if (d.getUTCDay() === 0) weeks.push({ days: [] });
    const count = i % 5;
    weeks.at(-1)!.days.push({ date: iso(d), count, level: LEVELS[count]! });
  }
  return {
    fetchedAt: new Date().toISOString(),
    user: {
      login: "mesanand",
      name: "Mehr Anand",
      avatarUrl: "",
      url: "https://github.com/mesanand",
      followers: 1,
    },
    calendar: { total: 700, weeks },
    stats: {
      commits365: 123,
      streak: 4,
      streakIncludesToday: true,
      lastPush: new Date().toISOString(),
      publicRepos: 22,
    },
    events: [
      {
        at: new Date().toISOString(),
        verb: "pushed",
        repo: "mesanand/portfolio",
        repoUrl: "https://github.com/mesanand/portfolio",
        message: "feat: something",
        url: "https://github.com/mesanand/portfolio/commit/abc",
      },
    ],
    repos: [],
  };
}

const mock = (page: Page, status = 200) =>
  page.route("**/api/github", (route) =>
    status === 200
      ? route.fulfill({ status, contentType: "application/json", body: JSON.stringify(fixture()) })
      : route.fulfill({
          status,
          contentType: "application/json",
          body: '{"error":"missing_token"}',
        }),
  );

test("heatmap: 53x7 = 371 cells, one accessible image, last cell is today", async ({ page }) => {
  await mock(page);
  await page.goto("/");
  const grid = page.getByRole("img", { name: "GitHub contributions, 700 in the last year" });
  await grid.scrollIntoViewIfNeeded();
  await expect(grid.locator(".gh-cell")).toHaveCount(371);
  expect(
    await grid
      .locator(".gh-cell")
      .evaluateAll((els) => els.every((e) => e.getAttribute("aria-hidden") === "true")),
  ).toBe(true);
  const dates = await grid
    .locator(".gh-cell[data-date]")
    .evaluateAll((els) => els.map((e) => e.getAttribute("data-date")));
  expect(dates.at(-1)).toBe(new Date().toISOString().slice(0, 10));
  await expect(page.locator(".gh-stats")).toContainText("123");
  await expect(page.locator(".gh-stats")).toContainText("4 days");
  // Recent activity is intentionally not shown (Mehr, 2026-09-25): heatmap and stats only.
  await expect(page.locator(".gh-activity__row")).toHaveCount(0);
});

test("error state is one line and the rest of the page is unaffected", async ({ page }) => {
  await mock(page, 500);
  await page.goto("/");
  await expect(page.locator(".gh-error")).toHaveText(
    "GitHub is not answering. Try github.com/mesanand.",
  );
  await expect(page.locator("#github svg")).toHaveCount(0);
  await expect(page.locator("#elsewhere .link-card")).toHaveCount(4);
  await expect(page.locator("footer.site-footer")).toBeVisible();
});

test.describe("phone", () => {
  test.use({ viewport: { width: 375, height: 800 } });
  test("heatmap scrolls horizontally and starts at the most recent weeks", async ({ page }) => {
    await mock(page);
    await page.goto("/");
    const scroller = page.locator(".gh-heatmap");
    await scroller.scrollIntoViewIfNeeded();
    const { left, max } = await scroller.evaluate((el) => ({
      left: el.scrollLeft,
      max: el.scrollWidth - el.clientWidth,
    }));
    expect(max).toBeGreaterThan(0);
    expect(left).toBeGreaterThanOrEqual(max - 1);
  });
});

// Hits real GitHub through the local API; only when a token is configured.
test("live /api/github returns all five keys and the cache header", async ({ request }) => {
  test.skip(!existsSync(".env.local"), "no .env.local");
  const res = await request.get("/api/github");
  expect(res.status()).toBe(200);
  expect(res.headers()["cache-control"]).toBe("public, s-maxage=900, stale-while-revalidate=3600");
  const body = (await res.json()) as GithubPayload;
  for (const key of ["user", "calendar", "stats", "events", "repos"])
    expect(body).toHaveProperty(key);
  const days = body.calendar.weeks.flatMap((w) => w.days);
  const last = days.at(-1)!.date;
  const ms = Date.parse(`${last}T00:00:00Z`);
  expect(Math.abs(Date.now() - ms)).toBeLessThan(2 * 24 * 3600 * 1000);
});
