/* ==============================================================
   WEEK 9 — ACTIONS & USER INPUTS — PRACTICE EXERCISES
   Companion to: Session-Guide.md
   Run:  npx playwright test actions-practice --headed
   ============================================================== */

const { test, expect } = require("@playwright/test");
const path = require("path");

const FORM = "https://demoqa.com/automation-practice-form";

test.describe("Week 9 — action practice", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FORM);
  });

  /* ----------------------------------------------------------
     EXERCISE 1 — fill vs type
     Fill First Name with .fill(), then Last Name with
     .pressSequentially(). Watch both in --headed mode and note
     the difference in a comment.
     ---------------------------------------------------------- */
  test("fills text inputs two different ways", async ({ page }) => {
    // TODO
    // DIFFERENCE: ...
  });

  /* ----------------------------------------------------------
     EXERCISE 2 — check() is not click()
     Check a hobby checkbox with .check(). Then in a second step,
     .click() the same checkbox TWICE and assert it ended up
     unchanged. Explain why in a comment.
     ---------------------------------------------------------- */
  test("checkboxes: check vs double click", async ({ page }) => {
    // TODO
    // WHY: ...
  });

  /* ----------------------------------------------------------
     EXERCISE 3 — Radio buttons
     Select a Gender radio. Note that on this site the <input> is
     hidden behind a <label> — so click the label, by role.
     ---------------------------------------------------------- */
  test("selects a radio button", async ({ page }) => {
    // TODO
  });

  /* ----------------------------------------------------------
     EXERCISE 4 — selectOption by label vs value
     Pick a State and City from the dropdowns. Then find a real
     <select> somewhere and select by { label: ... }, by value,
     and by index — comment on which reads best.
     ---------------------------------------------------------- */
  test("selects from dropdowns", async ({ page }) => {
    // TODO
  });

  /* ----------------------------------------------------------
     EXERCISE 5 — Keyboard only
     Fill the first three fields moving between them with
     .press('Tab') and submit with .press('Enter'). Do not click
     the submit button.
     ---------------------------------------------------------- */
  test("completes the form using only the keyboard", async ({ page }) => {
    // TODO
  });

  /* ----------------------------------------------------------
     EXERCISE 6 — File upload
     Create a small fixture file in your project (e.g.
     fixtures/upload-me.txt), upload it with .setInputFiles(),
     and assert the filename appears. Use path.join(__dirname...)
     so it works on someone else's machine too.
     ---------------------------------------------------------- */
  test("uploads a file", async ({ page }) => {
    // TODO: const file = path.join(__dirname, "..", "fixtures", "upload-me.txt");
  });

  /* ----------------------------------------------------------
     EXERCISE 7 — The negative path (the valuable one)
     Submit the form completely empty and assert the validation
     state. This finds more real bugs than any happy path.
     ---------------------------------------------------------- */
  test("shows validation when required fields are blank", async ({ page }) => {
    // TODO: submit empty, then assert the invalid state
  });
});

/* ==============================================================
   SOLUTIONS

// 1
await page.getByPlaceholder("First Name").fill("Aisha");
await page.getByPlaceholder("Last Name").pressSequentially("Khan");
// .fill() clears and sets the value in one step (fast, what you want 99% of
// the time). .pressSequentially() emits real keystrokes — needed only when the
// app reacts to each keypress, e.g. an autocomplete.

// 2
await page.getByText("Sports", { exact: true }).check();
await expect(page.locator("#hobbies-checkbox-1")).toBeChecked();
await page.getByText("Sports", { exact: true }).click();
await page.getByText("Sports", { exact: true }).click();
await expect(page.locator("#hobbies-checkbox-1")).toBeChecked();
// .click() TOGGLES, so twice returns to the start. .check() is idempotent —
// it guarantees the checked state no matter where it started.

// 3
await page.getByText("Female", { exact: true }).click();

// 4
await page.locator("#state").click();
await page.getByText("NCR", { exact: true }).click();
// For a real <select>:
// await page.getByLabel("Country").selectOption({ label: "India" });  <- clearest
// await page.getByLabel("Country").selectOption("IN");                <- value, opaque
// await page.getByLabel("Country").selectOption({ index: 3 });        <- worst, breaks on reorder

// 5
await page.getByPlaceholder("First Name").fill("Aisha");
await page.keyboard.press("Tab");
await page.keyboard.type("Khan");
await page.keyboard.press("Enter");

// 6
const file = path.join(__dirname, "..", "fixtures", "upload-me.txt");
await page.locator("#uploadPicture").setInputFiles(file);
await expect(page.locator("#uploadPicture")).toHaveValue(/upload-me\.txt/);

// 7
await page.locator("#submit").click();
await expect(page.locator("#firstName")).toHaveClass(/is-invalid|field-error/);
// The exact assertion depends on how the app signals invalidity — inspect it
// first, and assert on what the USER would notice.
   ============================================================== */
