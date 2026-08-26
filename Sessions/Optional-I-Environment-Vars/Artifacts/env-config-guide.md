# Optional I — Environment Variables & Config

Companion to `Session-Guide.md`.

## The rule

**`.env` is never committed. `.env.example` always is.**

A credential committed once is leaked forever — it's in the history, in every
clone, and in every fork. Deleting the file later does not undo it. If it
happens, the only real fix is to rotate the secret.

## Setup

```bash
npm install --save-dev dotenv
```

`.env` (git-ignored, real values):

```bash
BASE_URL=https://www.saucedemo.com
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

`.env.example` (committed, placeholder values — this is your documentation):

```bash
# Copy to .env and fill in. Ask the team lead for credentials.
BASE_URL=https://www.saucedemo.com
TEST_USERNAME=your_username_here
TEST_PASSWORD=your_password_here
```

`.gitignore`:

```gitignore
.env
.env.*
!.env.example
```

## Load it in the config, not in a spec

```js
// playwright.config.js
require("dotenv").config();

module.exports = {
  use: {
    baseURL: process.env.BASE_URL,
  },
};
```

Loading `dotenv` inside a spec file is the classic mistake: the config is
evaluated *before* your specs, so `baseURL` is already `undefined` by the time
your spec runs.

## Using it in a test

```js
const { test, expect } = require("@playwright/test");

test("logs in with credentials from the environment", async ({ page }) => {
  await page.goto("/");                                   // baseURL applied
  await page.getByPlaceholder("Username").fill(process.env.TEST_USERNAME);
  await page.getByPlaceholder("Password").fill(process.env.TEST_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/inventory/);
});
```

## Fail loudly on missing config

A missing variable becomes `undefined`, and `page.goto(undefined)` produces a
confusing error a long way from the real cause. Validate up front:

```js
// playwright.config.js
require("dotenv").config();

const REQUIRED = ["BASE_URL", "TEST_USERNAME", "TEST_PASSWORD"];
const missing = REQUIRED.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(
    `Missing environment variable(s): ${missing.join(", ")}\n` +
      `Copy .env.example to .env and fill in the values.`
  );
}
```

Now a new joiner gets a message that tells them exactly what to do.

## Multiple environments

Keep one file per environment: `.env.dev`, `.env.staging` (all git-ignored).

```js
// playwright.config.js
const envFile = process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : ".env";
require("dotenv").config({ path: envFile, override: true });
```

```bash
npx playwright test                       # uses .env
TEST_ENV=staging npx playwright test      # uses .env.staging
```

On Windows PowerShell:

```powershell
$env:TEST_ENV="staging"; npx playwright test
```

Add scripts so nobody has to remember the syntax:

```jsonc
"scripts": {
  "test:dev": "TEST_ENV=dev playwright test",
  "test:staging": "TEST_ENV=staging playwright test"
}
```

## Gotchas

- **Everything is a string.** `process.env.RETRIES` is `"2"`, not `2`. Use `Number(...)`.
- **`"false"` is truthy.** `if (process.env.HEADLESS)` is true even when it's `"false"`. Compare explicitly: `process.env.HEADLESS === "true"`.
- **CI has no `.env` file.** Set the variables as CI secrets; the validation above then tells you clearly if one is missing.
- **`override: true`** matters when switching env files — without it, already-set variables win.

## Assignment checklist

- [ ] `dotenv` installed; `.env` created and git-ignored
- [ ] `.env.example` committed with placeholder values
- [ ] `playwright.config.js` loads dotenv and uses `process.env.BASE_URL` for `baseURL`
- [ ] A test refactored to read credentials from the environment
- [ ] `.env.dev` and `.env.staging` exist; `env-notes.md` documents the switch commands
- [ ] A missing required variable produces a clear error, not `undefined`
- [ ] `git status` shows no `.env` — verified before committing
