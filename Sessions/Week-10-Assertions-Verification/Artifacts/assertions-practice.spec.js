/* ==============================================================
   WEEK 10 — ASSERTIONS — PRACTICE EXERCISES
   Companion to: Session-Guide.md
   Run:  npx playwright test assertions-practice

   THE ONE RULE THIS WEEK:
     await expect(locator).toBeVisible()      <- retries, stable
     expect(await locator.isVisible())        <- checks once, flaky
   Learn to spot the difference on sight.
   ============================================================== */

const { test, expect } = require("@playwright/test");

const SAUCE = "https://www.saucedemo.com";

async function login(page, username, password) {
  await page.goto(SAUCE);
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}

test.describe("Week 10 — assertion practice", () => {
  /* ----------------------------------------------------------
     EXERCISE 1 — The three login scenarios
     Assert something specific and user-visible in each.
     ---------------------------------------------------------- */
  test("logs in successfully", async ({ page }) => {
    // TODO: login as standard_user, assert URL and that products are visible
  });

  test("rejects an invalid password", async ({ page }) => {
    // TODO: assert the error banner text
  });

  test("rejects a blank username", async ({ page }) => {
    // TODO: assert the error banner text
  });

  /* ----------------------------------------------------------
     EXERCISE 2 — The locked-out user
     Use toContainText, not toHaveText. Work out why by trying
     toHaveText first and reading the failure.
     ---------------------------------------------------------- */
  test("reports a locked out user", async ({ page }) => {
    // TODO: locked_out_user / secret_sauce
    // WHY toContainText: ...
  });

  /* ----------------------------------------------------------
     EXERCISE 3 — State assertions
     Assert the Login button's enabled state before and after
     filling the form.
     ---------------------------------------------------------- */
  test("checks button state", async ({ page }) => {
    // TODO: toBeEnabled / toBeDisabled
  });

  /* ----------------------------------------------------------
     EXERCISE 4 — Page-level assertions
     After logging in, assert the title, the URL, and the number
     of products with toHaveCount.
     ---------------------------------------------------------- */
  test("checks page-level facts", async ({ page }) => {
    // TODO: toHaveTitle, toHaveURL, toHaveCount (expect 6 products)
  });

  /* ----------------------------------------------------------
     EXERCISE 5 — The flaky anti-pattern, demonstrated
     Write the SAME check twice: once the flaky way, once the
     web-first way. Both may pass today. Explain in a comment
     which one fails on a slow CI machine, and why.
     ---------------------------------------------------------- */
  test("flaky vs web-first", async ({ page }) => {
    // TODO
    // WHICH FAILS ON SLOW CI: ...
  });

  /* ----------------------------------------------------------
     EXERCISE 6 — Soft assertions
     Assert three things about the inventory page with
     expect.soft() and deliberately make one wrong. Note how many
     failures are reported.
     ---------------------------------------------------------- */
  test("collects several failures with soft assertions", async ({ page }) => {
    // TODO
    // FAILURES REPORTED: ...
  });
});

/* ==============================================================
   SOLUTIONS

// 1
await login(page, "standard_user", "secret_sauce");
await expect(page).toHaveURL(/inventory\.html/);
await expect(page.getByText("Products")).toBeVisible();

await login(page, "standard_user", "wrong_password");
await expect(page.getByTestId("error"))
  .toContainText("Username and password do not match");

await login(page, "", "secret_sauce");
await expect(page.getByTestId("error")).toContainText("Username is required");

// 2
await login(page, "locked_out_user", "secret_sauce");
await expect(page.getByTestId("error")).toContainText("Sorry, this user has been locked out");
// The real banner includes a leading icon and trailing whitespace, so an exact
// toHaveText match fails on text you can't see. toContainText asserts the part
// that actually matters.

// 3
await page.goto(SAUCE);
const loginButton = page.getByRole("button", { name: "Login" });
await expect(loginButton).toBeEnabled();     // SauceDemo enables it from the start
await page.getByPlaceholder("Username").fill("standard_user");
await expect(loginButton).toBeEnabled();

// 4
await login(page, "standard_user", "secret_sauce");
await expect(page).toHaveTitle("Swag Labs");
await expect(page).toHaveURL(/inventory\.html/);
await expect(page.locator(".inventory_item")).toHaveCount(6);

// 5
// FLAKY — evaluates once, the moment it runs:
expect(await page.locator(".inventory_item").count()).toBe(6);
// WEB-FIRST — retries until it's true or the timeout expires:
await expect(page.locator(".inventory_item")).toHaveCount(6);
// The first fails on slow CI because the assertion runs before the products
// have rendered. There is no retry, so a 50ms delay is a red build.

// 6
await login(page, "standard_user", "secret_sauce");
await expect.soft(page).toHaveTitle("Swag Labs");
await expect.soft(page.locator(".inventory_item")).toHaveCount(99);  // wrong on purpose
await expect.soft(page.getByText("Products")).toBeVisible();
// All three run; the test fails at the end reporting the one bad assertion.
// A plain expect() would have stopped at the second and hidden the third.
   ============================================================== */
