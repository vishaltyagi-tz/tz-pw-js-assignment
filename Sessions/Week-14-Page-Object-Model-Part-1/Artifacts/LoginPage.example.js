/* ==============================================================
   WEEK 14 — PAGE OBJECT MODEL, PART 1 — WORKED EXAMPLE
   Companion to: Session-Guide.md

   This is the ONE page object we build together in the session.
   Use it as the template for InventoryPage.js and CartPage.js —
   don't copy it as your submission.

   PART 1 RULE: locators and a constructor only. Action methods
   come next week. Resist the urge to add login() today.
   ============================================================== */

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    // Store the page — every locator needs it.
    this.page = page;

    // Locators are LAZY. Nothing is queried here; each of these is a
    // description of how to find an element, evaluated when it's used.
    // That's why a constructor doesn't need to be async.
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorBanner = page.getByTestId("error");
    this.errorCloseButton = page.getByTestId("error-button");
  }

  // A navigation helper is fine in Part 1 — it's not a user action on
  // the page, it's how you get to the page.
  async goto() {
    await this.page.goto("/");
  }

  // Exposing STATE is fine. Judging it is the test's job.
  async errorText() {
    return this.errorBanner.textContent();
  }
}

module.exports = { LoginPage };

/* ==============================================================
   WHAT DOES NOT BELONG IN HERE
   ==============================================================

   1. Assertions.
        // WRONG — the failure now points at LoginPage.js, not at the test
        async login(user, pass) {
          ...
          await expect(this.page).toHaveURL(/inventory/);
        }
      The page object gets you into position. The TEST decides whether the
      result was correct. Keep every expect() in the spec file.

   2. Test data.
        // WRONG — now this class can only ever log in as one user
        this.username = "standard_user";
      Pass data in as a parameter instead.

   3. Another page's locators.
        // WRONG — this belongs to InventoryPage
        this.productList = page.locator(".inventory_item");
      If LoginPage needs it, your page boundaries are drawn in the wrong
      place. One class, one page.

   4. await in the constructor.
        // WRONG — constructors can't be async
        this.button = await page.getByRole("button");
      Store the locator, not a resolved element. Locators are lazy by design.

   ==============================================================
   HOW THE TEST USES IT
   ==============================================================

   const { test, expect } = require("@playwright/test");
   const { LoginPage } = require("../pages/LoginPage");

   test("the login page loads", async ({ page }) => {
     const loginPage = new LoginPage(page);
     await loginPage.goto();
     await expect(loginPage.loginButton).toBeVisible();   // assertion in the TEST
   });

   Note that the spec file contains no locator strings at all. That's the
   whole point, and it's what next week completes.
   ============================================================== */
