# Optional H — Clean & Maintainable Test Code

Companion to `Session-Guide.md`.

## Naming

| Thing | Convention | Example |
|---|---|---|
| Spec file | kebab-case, `.spec.js` | `checkout-negative-paths.spec.js` |
| Page object file | PascalCase, matches the class | `LoginPage.js` |
| Page object class | PascalCase, ends in `Page` | `InventoryPage` |
| Test name | a sentence about behaviour | `rejects login with a blank username` |
| Action method | verb first, user-meaningful | `addItemToCart(itemName)` |
| Boolean function | reads as a question | `isValidPassword(pw)` |
| Constant | SCREAMING_SNAKE | `DEFAULT_TIMEOUT` |

The test name is the most valuable naming decision you make. It's what appears in
the report when it fails at 2am.

```js
test("test1", ...)                            // useless
test("login", ...)                            // which login behaviour?
test("login works", ...)                      // "works" says nothing
test("rejects login with a blank username")   // now the report is a spec
```

## ESLint + Prettier

```bash
npm install --save-dev eslint prettier eslint-plugin-playwright
npx eslint --init
```

`.prettierrc`:

```json
{ "semi": true, "singleQuote": false, "printWidth": 100, "trailingComma": "es5" }
```

`eslint.config.js` (flat config):

```js
const playwright = require("eslint-plugin-playwright");

module.exports = [
  {
    files: ["tests/**/*.js"],
    ...playwright.configs["flat/recommended"],
    rules: {
      "playwright/no-wait-for-timeout": "error",
      "playwright/no-focused-test": "error",     // catches a committed test.only
      "playwright/expect-expect": "error",       // catches a test with no assertion
    },
  },
];
```

Those three rules alone catch the most expensive mistakes in this course. Wire
them in and the linter enforces what a reviewer would otherwise have to spot.

```bash
npx eslint .            # find problems
npx eslint . --fix      # fix the mechanical ones
npx prettier --write .  # format everything
npx prettier --check .  # verify, for CI
```

**Do not** respond to a complaint by disabling the rule. If a rule is genuinely
wrong for your project, disable it deliberately in the config with a comment
saying why — not with a scattering of `// eslint-disable-next-line`.

## Magic strings and hardcoded values

```js
// Before
await page.goto("https://staging.example.com/login");
await page.getByPlaceholder("Username").fill("standard_user");
await page.waitForTimeout(3000);
await expect(page.locator(".title")).toHaveText("Products");

// After
// config: baseURL. fixtures/users.js: STANDARD_USER. No timeout at all.
await page.goto("/login");
await page.getByPlaceholder("Username").fill(STANDARD_USER.username);
await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
```

Extract a value when it appears in more than one place, or when it differs
between environments. Not before — a constant used once is indirection with no
payoff.

## DRY, but not at any cost

Test code is read far more often than it's written, and a spec should be
understandable in isolation. Some duplication is the right call.

```js
// Over-abstracted — you now have to read three files to understand one test
await runScenario(SCENARIOS.checkout, { validate: true, mode: "full" });

// Clear — slightly repetitive across tests, and much easier to debug
await loginPage.login("standard_user", "secret_sauce");
await inventory.addItemToCart("Sauce Labs Backpack");
await expect(inventory.cartBadge).toHaveText("1");
```

Rule of thumb: abstract **locators and mechanics** aggressively (that's what page
objects are for). Abstract **the shape of a scenario** rarely.

## Over-asserting

```js
// Over-asserted: this test now fails whenever anything on the page changes,
// telling you nothing about whether login works.
test("logs in", async ({ page }) => {
  await expect(page).toHaveTitle("Swag Labs");
  await expect(page.locator(".footer")).toContainText("2024");
  await expect(page.locator(".menu")).toBeVisible();
  await expect(page.locator(".cart")).toHaveText("");
  // ... 12 more
});

// Focused: asserts the behaviour under test, and nothing else.
test("a valid user reaches the inventory page", async ({ page }) => {
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
});
```

One test, one behaviour. When a focused test fails you know what broke.

## A review checklist worth having

Yours should be short enough to actually run. A starting point:

1. Does every test have at least one meaningful assertion?
2. Any `waitForTimeout`, or any wait that isn't a web-first assertion?
3. Any locator string in a spec file that belongs in a page object?
4. Do the test names describe behaviour, so the report reads as a spec?
5. Any hardcoded credential, URL, or environment-specific value?
6. Would this test pass run alone, and in a different order?
7. Any `test.only`, `test.skip` without a reason, or commented-out test?
8. Is there a simpler locator? (`getByRole` before CSS, always.)

## Folder structure

```
project/
├── tests/            specs only — no locators, no page classes
├── pages/            one class per page
├── fixtures/         test data and uploadable files
├── types/            TypeScript interfaces (Week 17 onward)
├── utils/            genuinely shared helpers
├── .env.example      documented, committed
└── playwright.config.js
```

## Assignment checklist

- [ ] ESLint + Prettier configured and committed; `npx eslint .` is clean
- [ ] One test file refactored: magic strings extracted, poor names fixed, before/after shown
- [ ] Your own 5-8 item review checklist, specific enough to actually run
- [ ] A self-review of one past assignment against it, naming at least three concrete changes
