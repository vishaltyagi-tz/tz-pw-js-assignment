/* ==============================================================
   WEEK 15 — PAGE OBJECT MODEL, PART 2 — WORKED EXAMPLE
   Companion to: Session-Guide.md

   Part 1 gave the page classes locators. Part 2 adds ACTION
   METHODS so specs contain no locators at all.

   The check that matters, run from your project root:
     grep -rE "getBy|locator\(" tests/
   It must return nothing.
   ============================================================== */

// ---------- pages/LoginPage.js (extended from Week 14) ----------
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorBanner = page.getByTestId("error");
  }

  async goto() {
    await this.page.goto("/");
  }

  // ONE user-meaningful action. Not typeUsername() + typePassword() +
  // clickLogin() — nobody wants to write those three lines 40 times.
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Returning the next page object enables readable chaining and means the
  // test never has to construct InventoryPage itself.
  async loginAs(username, password) {
    await this.login(username, password);
    return new InventoryPage(this.page);
  }
}

// ---------- pages/InventoryPage.js ----------
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByText("Products");
    this.items = page.locator(".inventory_item");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.sortDropdown = page.getByTestId("product-sort-container");
  }

  // Parameterised, so one method serves every product. This is what makes
  // the two extra scenarios cheap to write.
  itemByName(name) {
    return this.items.filter({ hasText: name });
  }

  async addItemToCart(itemName) {
    await this.itemByName(itemName).getByRole("button", { name: "Add to cart" }).click();
  }

  async removeItemFromCart(itemName) {
    await this.itemByName(itemName).getByRole("button", { name: "Remove" }).click();
  }

  async sortBy(optionLabel) {
    await this.sortDropdown.selectOption({ label: optionLabel });
  }

  // Exposes state for the test to assert on — no expect() in here.
  async productNames() {
    return this.items.locator(".inventory_item_name").allTextContents();
  }

  async goToCart() {
    await this.cartLink.click();
    return new CartPage(this.page);
  }
}

// ---------- pages/CartPage.js ----------
class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator(".cart_item");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async checkout(firstName, lastName, postalCode) {
    await this.checkoutButton.click();
    await this.page.getByTestId("firstName").fill(firstName);
    await this.page.getByTestId("lastName").fill(lastName);
    await this.page.getByTestId("postalCode").fill(postalCode);
    await this.page.getByTestId("continue").click();
    await this.page.getByTestId("finish").click();
  }
}

module.exports = { LoginPage, InventoryPage, CartPage };

/* ==============================================================
   WHAT THE SPEC NOW LOOKS LIKE — read it aloud

   const { test, expect } = require("@playwright/test");
   const { LoginPage } = require("../pages/LoginPage");

   test("a customer can buy a backpack", async ({ page }) => {
     const loginPage = new LoginPage(page);
     await loginPage.goto();

     const inventory = await loginPage.loginAs("standard_user", "secret_sauce");
     await inventory.addItemToCart("Sauce Labs Backpack");
     await expect(inventory.cartBadge).toHaveText("1");

     const cart = await inventory.goToCart();
     await expect(cart.items).toHaveCount(1);
     await cart.checkout("Aisha", "Khan", "110001");
     await expect(page.getByText("Thank you for your order!")).toBeVisible();
   });

   Zero locator strings. Every assertion in the test. It reads like the
   manual test case it replaced — which means a manual tester on your team
   can review it.

   ==============================================================
   THE TWO EXTRA SCENARIOS COST ALMOST NOTHING

   test("a customer can remove an item from the cart", async ({ page }) => {
     const inventory = await new LoginPage(page).loginAs("standard_user", "secret_sauce");
     await inventory.addItemToCart("Sauce Labs Backpack");
     await inventory.removeItemFromCart("Sauce Labs Backpack");
     await expect(inventory.cartBadge).toBeHidden();
   });

   test("products can be sorted by price, low to high", async ({ page }) => {
     const inventory = await new LoginPage(page).loginAs("standard_user", "secret_sauce");
     await inventory.sortBy("Price (low to high)");
     const names = await inventory.productNames();
     expect(names[0]).toBe("Sauce Labs Onesie");
   });

   Both were written with NO new locators — only existing methods. If your
   two new scenarios needed a pile of new locators, that's useful feedback
   about where you drew the boundaries in Week 14. Write that up in your notes.
   ============================================================== */
