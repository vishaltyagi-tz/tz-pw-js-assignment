/* ==============================================================
   OPTIONAL F — IFRAMES, DIALOGS & POPUPS — PRACTICE
   Companion to: Session-Guide.md
   Run:  npx playwright test popups-practice --headed
   ============================================================== */

const { test, expect } = require("@playwright/test");

/* ------------------------------------------------------------
   EXERCISE 1 — An iframe is a separate document
   First, PROVE the problem: try to reach the editor body with a
   normal locator and watch it time out. Then do it properly with
   frameLocator().
   ------------------------------------------------------------ */
test("interacts with content inside an iframe", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");
  // TODO (the failure): page.locator("#tinymce") with a short timeout
  // TODO (the fix):     page.frameLocator("#mce_0_ifr").locator("#tinymce")
  // WHY A NORMAL LOCATOR CAN'T SEE IN: ...
});

/* ------------------------------------------------------------
   EXERCISE 2 — Accept an alert
   Register the handler BEFORE the click that triggers it.
   ------------------------------------------------------------ */
test("accepts a JS alert", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  // TODO: page.on("dialog", ...) then click, then assert #result
});

/* ------------------------------------------------------------
   EXERCISE 3 — Dismiss a confirm
   Assert that the Cancel path was taken, not just that nothing
   crashed.
   ------------------------------------------------------------ */
test("dismisses a confirm dialog", async ({ page }) => {
  // TODO
});

/* ------------------------------------------------------------
   EXERCISE 4 — Register the handler too late, on purpose
   Click first, THEN register the handler. Note what happens and
   explain it. (Playwright auto-dismisses unhandled dialogs.)
   ------------------------------------------------------------ */
test("shows what happens without a handler", async ({ page }) => {
  // TODO
  // WHAT HAPPENED: ...
  // WHY:           ...
});

/* ------------------------------------------------------------
   EXERCISE 5 — A new tab
   A popup arrives as a whole new Page object. Capture it, and
   assert against the NEW page, not the original.
   ------------------------------------------------------------ */
test("captures a new tab", async ({ page, context }) => {
  await page.goto("https://the-internet.herokuapp.com/windows");
  // TODO: context.waitForEvent("page") BEFORE the click
});

/* ==============================================================
   SOLUTIONS

// 1
// The failure:
await expect(page.locator("#tinymce")).toBeVisible({ timeout: 2000 });
// TimeoutError — the element exists, but in a different document. A frame is a
// separate DOM tree; the top-level page's locators simply cannot traverse into
// it. That's a browser security boundary, not a Playwright limitation.

// The fix:
const editor = page.frameLocator("#mce_0_ifr").locator("#tinymce");
await editor.fill("Typed inside the iframe");
await expect(editor).toContainText("Typed inside the iframe");

// 2
page.on("dialog", async (dialog) => {
  expect(dialog.type()).toBe("alert");
  expect(dialog.message()).toBe("I am a JS Alert");
  await dialog.accept();
});
await page.getByRole("button", { name: "Click for JS Alert" }).click();
await expect(page.locator("#result")).toHaveText("You successfully clicked an alert");

// 3
page.on("dialog", (dialog) => dialog.dismiss());
await page.getByRole("button", { name: "Click for JS Confirm" }).click();
await expect(page.locator("#result")).toHaveText("You clicked: Cancel");

// 4
await page.getByRole("button", { name: "Click for JS Confirm" }).click();
page.on("dialog", (dialog) => dialog.accept());   // too late
// WHAT HAPPENED: the result reads "You clicked: Cancel".
// WHY: with no handler registered at the moment the dialog opens, Playwright
// auto-DISMISSES it so the test can't hang. Your handler arrives after the
// dialog is already gone and never fires. Always register first.

// 5
const popupPromise = context.waitForEvent("page");
await page.getByRole("link", { name: "Click Here" }).click();
const popup = await popupPromise;
await popup.waitForLoadState();
await expect(popup.getByText("New Window")).toBeVisible();
await expect(popup).toHaveTitle("New Window");
// Note: assert on `popup`, not `page`. The original page is still sitting on
// the old URL, so asserting against it passes or fails for the wrong reasons.

// NESTED FRAMES — chain frameLocator calls:
// page.frameLocator("#outer").frameLocator("#inner").getByRole("button")
   ============================================================== */
