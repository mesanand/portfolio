import { expect, test } from "@playwright/test";

test("three visible groups plus a collapsed details", async ({ page }) => {
  await page.goto("/leadership");
  for (const name of ["NOW", "HONORS", "PREVIOUSLY"])
    await expect(page.getByRole("heading", { level: 2, name, exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "BOSTON" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "OAKLAND" })).toBeVisible();
  await expect(page.locator(".lead-group .cells .cell")).toHaveCount(4);
  // Each current card shows its org logo, decorative (the name is already the heading).
  const logos = page.locator(".lead-group .cells .cell__logo");
  await expect(logos).toHaveCount(4);
  for (const img of await logos.all()) await expect(img).toHaveAttribute("alt", "");

  const details = page.locator("details.lead-archive");
  await expect(details).not.toHaveAttribute("open", /.*/);
  await expect(details.locator(".role-line").first()).toBeHidden();
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("details is native markup (no JS needed to open it)", async ({ page }) => {
    // The SPA needs JS to render, so check the mechanism instead: native <details>/<summary>.
    await page.setContent(
      '<details class="lead-archive"><summary>High school</summary><p id="x">inside</p></details>',
    );
    await expect(page.locator("#x")).toBeHidden();
    await page.locator("summary").click();
    await expect(page.locator("#x")).toBeVisible();
  });
});

test("opening the archive reveals high-school roles; +/- toggles via CSS", async ({ page }) => {
  await page.goto("/leadership");
  const summary = page.locator(".lead-archive__summary");
  const marker = () => summary.evaluate((el) => getComputedStyle(el, "::after").content);
  expect(await marker()).toContain("+");
  await summary.click();
  await expect(page.locator("details.lead-archive .role-line")).toHaveCount(5);
  expect(await marker()).toContain("-");
});

test("groups are newest first and current roles read PRESENT", async ({ page }) => {
  await page.goto("/leadership");
  const cellDates = await page.locator(".lead-group .cell__date").allTextContents();
  expect(cellDates.every((d) => d.endsWith("PRESENT"))).toBe(true);
  const starts = cellDates.map((d) => Date.parse(`1 ${d.split(" to ")[0]}`));
  expect([...starts].sort((a, b) => b - a)).toEqual(starts);

  const honorYears = (
    await page.locator('[aria-labelledby="lead-honors"] .role-line__date').allTextContents()
  ).map(Number);
  expect([...honorYears].sort((a, b) => b - a)).toEqual(honorYears);

  const boston = await page
    .locator(".lead-era")
    .first()
    .locator(".role-line__date")
    .allTextContents();
  const presentIdx = boston.map((d) => d.endsWith("PRESENT"));
  expect(
    presentIdx.indexOf(false) === -1 || !presentIdx.slice(presentIdx.indexOf(false)).includes(true),
  ).toBe(true);
});
