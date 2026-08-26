/* ==============================================================
   WEEK 13 — SUITE ORGANIZATION & HOOKS — PRACTICE
   Companion to: Session-Guide.md
   Run:  npx playwright test hooks-practice

   THE TEST THAT MATTERS: your suite must pass with
     npx playwright test --workers=1
     npx playwright test -g "<any single test name>"
   If a test only passes as part of the group, it isn't a test.
   ============================================================== */

const { test, expect } = require("@playwright/test");

/* ------------------------------------------------------------
   EXERCISE 1 — describe + beforeEach
   Group the login tests and move the shared navigation into a
   beforeEach. Every test should start from a known state.
   ------------------------------------------------------------ */
test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    // TODO: navigate to the login page
  });

  test("succeeds with valid credentials", async ({ page }) => {
    // TODO
  });

  test("fails with an invalid password", async ({ page }) => {
    // TODO
  });
});

/* ------------------------------------------------------------
   EXERCISE 2 — afterEach with testInfo
   Log the test name and its pass/fail status after every test.
   testInfo.status is 'passed' | 'failed' | 'timedOut' | 'skipped'.
   ------------------------------------------------------------ */
test.describe("Checkout", () => {
  test.afterEach(async ({ page }, testInfo) => {
    // TODO: console.log(`${testInfo.title} -> ${testInfo.status}`);
  });

  test("completes a purchase", async ({ page }) => {
    // TODO
  });
});

/* ------------------------------------------------------------
   EXERCISE 3 — beforeAll / afterAll, and the trap
   Set up shared data once, tear it down at the end. Then answer
   in a comment: what breaks if a test MUTATES that shared data?
   ------------------------------------------------------------ */
test.describe("Shared setup", () => {
  let sharedCart;

  test.beforeAll(async () => {
    // TODO: create shared test data (runs ONCE for this describe)
  });

  test.afterAll(async () => {
    // TODO: tear it down
  });

  test("first test using shared data", async ({ page }) => {
    // TODO
  });

  test("second test using shared data", async ({ page }) => {
    // TODO
  });

  // WHAT BREAKS IF A TEST MUTATES sharedCart: ...
});

/* ------------------------------------------------------------
   EXERCISE 4 — Tags
   Tag three tests @smoke and run only those:
     npx playwright test --grep @smoke
   Paste the command output in a comment.
   ------------------------------------------------------------ */
test("shows the product list @smoke", async ({ page }) => {
  // TODO
});
// OUTPUT OF --grep @smoke: ...

/* ------------------------------------------------------------
   EXERCISE 5 — Prove independence
   Run the whole file with --workers=1, then run each test alone
   with -g. Record both results. Fix anything order-dependent.
   ------------------------------------------------------------ */
// --workers=1 RESULT: ...
// EACH TEST ALONE:    ...

/* ==============================================================
   SOLUTIONS

// 1
test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
  });

  test("succeeds with valid credentials", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/inventory/);
  });
});

// 2
test.afterEach(async ({ page }, testInfo) => {
  console.log(`${testInfo.title} -> ${testInfo.status} (${testInfo.duration}ms)`);
});

// 3
// beforeAll runs ONCE for the describe block; every test then shares that one
// object. If test 1 mutates it, test 2 no longer starts from a known state —
// and because Playwright may run them in a different order or in parallel, the
// failure is intermittent and depends on scheduling. That is the single hardest
// class of test bug to diagnose. Use beforeEach unless setup is genuinely
// expensive, and when you must share, treat the shared data as read-only.

// 4
test("shows the product list @smoke", async ({ page }) => { ... });
// npx playwright test --grep @smoke
//   Running 3 tests using 3 workers ... 3 passed

// 5
// If a test passes in the suite but fails alone, it depended on state another
// test created — usually a login, or a cart item. Move that setup into the
// test's own beforeEach.
   ============================================================== */
