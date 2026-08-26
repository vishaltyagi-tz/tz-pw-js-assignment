/* ==============================================================
   WEEK 11 — AUTO-WAITING — PRACTICE EXERCISES
   Companion to: Session-Guide.md
   Run:  npx playwright test waiting-practice

   HARD RULE THIS WEEK: no page.waitForTimeout(). Not once.
   Before you submit:  grep -r "waitForTimeout" tests/
   ============================================================== */

const { test, expect } = require("@playwright/test");

const DYNAMIC = "https://the-internet.herokuapp.com/dynamic_loading/2";
const SAUCE = "https://www.saucedemo.com";

test.describe("Week 11 — waiting practice", () => {
  /* ----------------------------------------------------------
     EXERCISE 1 — Let auto-waiting do the work
     This page shows "Hello World!" only after ~5 seconds, and
     the element doesn't exist in the DOM until then.
     Assert on it with NO explicit wait at all.
     ---------------------------------------------------------- */
  test("waits for a slow element without any explicit wait", async ({ page }) => {
    await page.goto(DYNAMIC);
    await page.getByRole("button", { name: "Start" }).click();
    // TODO: assert #finish contains "Hello World!"
    // Give the assertion a longer timeout if 5s exceeds your default.
  });

  /* ----------------------------------------------------------
     EXERCISE 2 — The wrong way, for contrast
     Do the same thing with waitForTimeout(5000). Then answer:
     what happens on a machine twice as slow? And what does it
     cost you on a machine twice as fast?
     (Delete this test before you submit — it's here to learn from.)
     ---------------------------------------------------------- */
  test("the anti-pattern, for comparison", async ({ page }) => {
    // TODO
    // ON A SLOWER MACHINE: ...
    // ON A FASTER MACHINE: ...
  });

  /* ----------------------------------------------------------
     EXERCISE 3 — waitForURL
     Log in to SauceDemo and wait for the URL to change with
     waitForURL, then assert content on the new page.
     ---------------------------------------------------------- */
  test("waits for a navigation with waitForURL", async ({ page }) => {
    // TODO
  });

  /* ----------------------------------------------------------
     EXERCISE 4 — Force a timeout, read the error
     Assert something true but give it a 100ms timeout so it
     fails anyway. Paste the error message, then fix it.
     The error text is the lesson here — read it closely.
     ---------------------------------------------------------- */
  test("forces a timeout on purpose", async ({ page }) => {
    // TODO: await expect(locator).toBeVisible({ timeout: 100 });
    // ERROR: ...
    // FIX:   ...
  });

  /* ----------------------------------------------------------
     EXERCISE 5 — waitForResponse
     Wait for a specific network response rather than a delay.
     Note the ordering trap: start waiting BEFORE you click.
     ---------------------------------------------------------- */
  test("waits on the network, not the clock", async ({ page }) => {
    // TODO
  });

  /* ----------------------------------------------------------
     EXERCISE 6 — Prove it isn't flaky
     Run your finished file with:
       npx playwright test waiting-practice --repeat-each=5
     Record the result. 5/5 or it isn't done.
     ---------------------------------------------------------- */
  // RESULT: ... / 5
});

/* ==============================================================
   SOLUTIONS

// 1
await expect(page.locator("#finish")).toHaveText("Hello World!", { timeout: 10000 });
// No explicit wait needed. The assertion polls until it passes or times out.

// 2
await page.waitForTimeout(5000);
await expect(page.locator("#finish")).toHaveText("Hello World!");
// SLOWER MACHINE: 5s isn't enough, the test fails — flaky.
// FASTER MACHINE: the element appeared at 1s but you still burn 5s. Multiply
// that across 200 tests and your suite takes 15 minutes for no reason.

// 3
await page.goto(SAUCE);
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByPlaceholder("Password").fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();
await page.waitForURL(/inventory\.html/);
await expect(page.getByText("Products")).toBeVisible();

// 4
await expect(page.getByText("Products")).toBeVisible({ timeout: 100 });
// ERROR: TimeoutError: expect(locator).toBeVisible() failed
//        Locator: getByText('Products')
//        Expected: visible
//        Received: <element(s) not found>
//        Timeout:  100ms exceeded
// FIX: remove the artificial timeout — the default 5s was always enough.
// Note the error names the locator and what it wanted. Read that before
// changing any number.

// 5
const responsePromise = page.waitForResponse(
  (response) => response.url().includes("/inventory") && response.status() === 200
);
await page.getByRole("button", { name: "Login" }).click();
await responsePromise;
// Create the promise BEFORE the click. Register the wait after the action and
// the response may already have arrived — you'd wait forever.
   ============================================================== */
