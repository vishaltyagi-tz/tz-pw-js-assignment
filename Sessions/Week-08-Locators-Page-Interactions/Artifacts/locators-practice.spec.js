/* ==============================================================
   WEEK 8 — LOCATORS — PRACTICE EXERCISES
   Companion to: Session-Guide.md

   Copy this file into your Playwright project's tests/ folder and
   run:  npx playwright test locators-practice --headed

   RULE FOR THIS WEEK: no CodeGen. Write every locator by hand.
   Solutions are at the bottom.
   ============================================================== */

const { test, expect } = require("@playwright/test");

const SAUCE = "https://www.saucedemo.com";

test.describe("Week 8 — locator practice", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SAUCE);
  });

  /* ----------------------------------------------------------
     EXERCISE 1 — getByPlaceholder / getByRole
     Log in using getByPlaceholder for the two inputs and
     getByRole for the button. No CSS selectors.
     ---------------------------------------------------------- */
  test("logs in using user-facing locators", async ({ page }) => {
    // TODO: fill Username with 'standard_user'
    // TODO: fill Password with 'secret_sauce'
    // TODO: click the Login button by role
    // TODO: assert you landed on the inventory page
  });

  /* ----------------------------------------------------------
     EXERCISE 2 — The same thing with CSS
     Now do it again with CSS selectors (#user-name etc).
     Then answer in a comment: which would survive a redesign?
     ---------------------------------------------------------- */
  test("logs in using CSS selectors", async ({ page }) => {
    // TODO
    // ANSWER: ...
  });

  /* ----------------------------------------------------------
     EXERCISE 3 — getByTestId
     SauceDemo uses data-test, not data-testid. Set
     testIdAttribute: 'data-test' in playwright.config.js under
     `use`, then locate the login button with getByTestId.
     ---------------------------------------------------------- */
  test("locates elements by test id", async ({ page }) => {
    // TODO
  });

  /* ----------------------------------------------------------
     EXERCISE 4 — Strict mode, on purpose
     After logging in, write a locator that matches ALL of the
     'Add to cart' buttons and try to click it. Paste the
     strict-mode error, then fix it by narrowing to one product.
     ---------------------------------------------------------- */
  test("hits strict mode and then fixes it", async ({ page }) => {
    // TODO: log in first
    // TODO: page.getByRole('button', { name: 'Add to cart' }).click()  <- fails
    // ERROR: ...
    // TODO: fix it by scoping to one product's container
  });

  /* ----------------------------------------------------------
     EXERCISE 5 — Chaining and filtering
     Add ONLY the "Sauce Labs Bike Light" to the cart, by
     filtering the product list rather than using .nth().
     ---------------------------------------------------------- */
  test("adds one specific product using filter", async ({ page }) => {
    // TODO
  });
});

/* ==============================================================
   SOLUTIONS

// 1
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByPlaceholder("Password").fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();
await expect(page).toHaveURL(/inventory/);

// 2
await page.locator("#user-name").fill("standard_user");
await page.locator("#password").fill("secret_sauce");
await page.locator("#login-button").click();
// getByRole/getByPlaceholder survive a redesign: they describe what the user
// sees. #login-button breaks the moment a developer renames the id.

// 3  (playwright.config.js -> use: { testIdAttribute: 'data-test' })
await page.getByTestId("login-button").click();

// 4
// ERROR: strict mode violation: getByRole('button', { name: 'Add to cart' })
//        resolved to 6 elements
const bikeLight = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Bike Light" });
await bikeLight.getByRole("button", { name: "Add to cart" }).click();

// 5  (same as the fix above — filter, don't index)
await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
   ============================================================== */
