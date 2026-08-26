# Week 7 — Playwright Setup Walkthrough

Companion to `Session-Guide.md`. Follow this end to end before the session if
you can; we'll debug whatever broke together.

## 1. Create the project

Make a NEW folder outside this training repo (your Playwright project is your
own repo — you'll submit only the spec files back here):

```bash
mkdir ~/playwright-training && cd ~/playwright-training
npm init playwright@latest
```

Answer the prompts:

| Prompt | Answer | Why |
|---|---|---|
| TypeScript or JavaScript? | **JavaScript** | We switch to TypeScript in Week 16 |
| Name of your Tests folder | `tests` | The convention everyone expects |
| Add a GitHub Actions workflow? | **No** (for now) | We cover CI at the end |
| Install Playwright browsers? | **Yes** | Nothing runs without them |

If you skipped the browser install, run it yourself:

```bash
npx playwright install
```

## 2. What you just got

```
playwright-training/
├── node_modules/          <- NEVER commit this
├── tests/
│   └── example.spec.js    <- a working sample test
├── tests-examples/
│   └── demo-todo-app.spec.js  <- a bigger realistic example, worth reading
├── playwright.config.js   <- all configuration lives here
├── package.json
└── package-lock.json      <- DO commit this
```

## 3. Run it

```bash
npx playwright test                    # headless, all browsers
npx playwright test --headed           # watch it happen
npx playwright test --project=chromium # one browser only, much faster
npx playwright test --ui               # the interactive UI mode — try this one
npx playwright show-report             # open the last HTML report
```

## 4. Record something with CodeGen

```bash
npx playwright codegen https://www.saucedemo.com
```

Log in with `standard_user` / `secret_sauce`, search/sort a product, then copy
the generated code into `tests/login-search.spec.js`.

**Now clean it up.** CodeGen is a starting point, not a deliverable. Typical
things to fix:

| CodeGen produces | Replace with | Why |
|---|---|---|
| `await page.goto('https://www.saucedemo.com/')` | `await page.goto('/')` + `baseURL` in config | One place to change environments |
| `page.locator('#user-name')` | `page.getByPlaceholder('Username')` | Survives an id change |
| `page.locator('div:nth-child(3) > .btn')` | `page.getByRole('button', { name: 'Add to cart' })` | Readable and stable |
| `test('test', async ({ page }) => {` | `test('logs in and searches for a product', ...` | The report becomes readable |
| Repeated redundant clicks | Delete them | CodeGen records your fumbling too |

## 5. The config fields you must be able to explain

Open `playwright.config.js` and find each of these:

- **`baseURL`** — the prefix for every `page.goto('/...')`. Set it to `https://www.saucedemo.com`.
- **`headless`** — whether a browser window is shown. Default true; `--headed` overrides.
- **`retries`** — how many times a failed test is re-run. Useful in CI, dangerous as a flakiness cure.
- **`timeout`** — per-test budget in ms (default 30000).
- **`projects`** — the browser matrix (chromium / firefox / webkit).
- **`trace`** — set it to `'on-first-retry'`; you'll thank yourself in Week 12.
- **`reporter`** — `'html'` gives you `npx playwright show-report`.

## 6. `.gitignore` — before your first commit

```gitignore
node_modules/
test-results/
playwright-report/
playwright/.cache/
blob-report/
.env
```

## 7. Common setup failures

| Symptom | Cause | Fix |
|---|---|---|
| `Executable doesn't exist at ...` | Browsers not installed | `npx playwright install` |
| `Error: No tests found` | Wrong folder, or file isn't `*.spec.js` | Run from the project root; check the filename |
| `Cannot find module '@playwright/test'` | Dependencies not installed | `npm install` |
| Test passes but did nothing | Missing `await` | Await every Playwright call |
| Very slow runs | Running all three browsers | `--project=chromium` while developing |
