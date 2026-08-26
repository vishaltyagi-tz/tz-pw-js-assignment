# Week 12 — Test Execution & Debugging Walkthrough

Companion to `Session-Guide.md`. This is a reference to keep open while you
debug, and the source of the commands your assignment asks you to run.

## The flags worth memorising

```bash
npx playwright test                          # everything, headless
npx playwright test login.spec.js            # one file
npx playwright test -g "locked out"          # one test by name
npx playwright test --project=chromium       # one browser (fastest feedback)
npx playwright test --headed                 # watch it
npx playwright test --ui                     # interactive UI mode — best default
npx playwright test --debug                  # Playwright Inspector, paused
npx playwright test --trace on               # trace every test, not just retries
npx playwright test --repeat-each=10         # prove a flaky fix
npx playwright test --workers=1              # serial — exposes order dependence
npx playwright test --grep @smoke            # tag subset
npx playwright show-report                   # open the last HTML report
npx playwright show-trace trace.zip          # open a specific trace
```

## The config that makes failures debuggable

In `playwright.config.js` under `use`:

```js
use: {
  baseURL: 'https://www.saucedemo.com',
  trace: 'on-first-retry',        // full trace when a test retries
  screenshot: 'only-on-failure',  // cheap, always worth it
  video: 'retain-on-failure',     // keeps video only for failures
},
```

`on-first-retry` is the standard choice: you get a complete trace for anything
that fails, and pay nothing when the suite is green.

## A debugging method that works

Guessing at fixes is the slow way. Do this instead:

1. **Reproduce it.** Can you get the failure locally? `--repeat-each=5` if it's intermittent.
2. **Isolate it.** Run that one test alone with `-g`. Does it still fail? If it only fails
   in the full suite, you have a test-independence problem, not a locator problem.
3. **Read the trace.** Do not skip to the code. The trace tells you what the page
   actually looked like at the moment of failure.
4. **Form one hypothesis**, change one thing, re-run.
5. **Prove it.** `--repeat-each=10`. Anything less than 10/10 isn't fixed.

## Reading a trace

`npx playwright show-report`, click the failed test, open the trace. You get:

| Panel | What it answers |
|---|---|
| **Timeline** (top) | Where the time went; which step hung |
| **Actions** (left) | Every step, with before/after screenshots |
| **DOM snapshot** (centre) | What the page really was — inspectable, not a picture |
| **Network** | Did the API call fire? What did it return? |
| **Console** | JS errors the app logged |
| **Source** | Your test code, with the failing line highlighted |

The DOM snapshot is the payoff. Nine times in ten, "element not found" turns out
to be an element that WAS there, behind a cookie banner, or in an iframe, or
with different text than you assumed.

## Interpreting the common failures

| Error | What it usually means |
|---|---|
| `TimeoutError: locator.click: Timeout 30000ms exceeded` | The element never became actionable. Check the DOM snapshot — is it covered, disabled, or in an iframe? |
| `strict mode violation: ... resolved to N elements` | Your locator is ambiguous. Narrow it — don't reach for `.first()`. |
| `expect(received).toBe(expected)` with a value you didn't expect | Real assertion failure — read the actual value; often the app is right and the test is wrong. |
| Passes locally, fails in CI | Timing, screen size, test data, or timezone. Check the CI screenshot first. |
| Passes alone, fails in the suite | Shared state between tests. This is a test-design bug. |
| Passes headed, fails headless | Almost always a race the slower headed run happened to hide. |

## Things that waste your time

- `console.log` debugging when the trace already shows you the DOM.
- Raising the global timeout to make a red test green. The bug is still there.
- Debugging in headed mode only and never verifying headless.
- Committing `test-results/` or `playwright-report/` — they're regenerated every run.
