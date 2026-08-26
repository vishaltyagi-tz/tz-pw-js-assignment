# Test Suite Organization & Hooks

**Week 13** · Wed, Oct 21, 2026 · Core · Module 3: Test Architecture
**Session Owner:** Vishal Tyagi - Jr

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`test.describe()`, `beforeEach` / `afterEach`, `beforeAll` / `afterAll`, tags & `--grep`, `test.skip` / `test.only`, test independence.

## Prerequisites

- Weeks 7-12 complete - a suite with repeated setup worth extracting

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | `test.describe()` for grouping, and how it shapes the report |
| 25 min | `beforeEach` / `afterEach` - extracting shared navigation and login |
| 20 min | `beforeAll` / `afterAll` and how their scope differs (and the trap) |
| 20 min | Test independence: why order-dependent tests eventually break |
| 15 min | Tagging (`@smoke`) and running subsets with `--grep` |
| 10 min | `test.only` / `test.skip` and never committing `only` |

## Key Points to Land

- Each test must pass alone AND in any order. If it doesn't, it's not a test, it's a step.
- `beforeEach` runs per test (fresh state); `beforeAll` runs once for the group (shared state, shared risk).
- State created in `beforeAll` leaks between tests. Prefer `beforeEach` unless setup is genuinely expensive.
- A committed `test.only` silently skips your whole suite in CI. Lint for it.
- Playwright gives each test a fresh browser context already - don't re-invent isolation.

## Deliverables

Submit these to `Sessions/Week-13-Test-Suite-Organization-Hooks/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/login.spec.js` | Existing login tests refactored into `test.describe` blocks sharing `beforeEach` navigation. |
| `tests/checkout.spec.js` | Same for checkout, with an `afterEach` that logs the test name and pass/fail status using `testInfo`. |
| `tests/shared-setup.spec.js` | A `beforeAll` / `afterAll` pair setting up and tearing down shared test data, with a comment explaining how their scope differs from `beforeEach` / `afterEach`. |
| `tests/tagged.spec.js` | At least three tests tagged `@smoke`; show the `--grep @smoke` command and its output in a comment. |
| `organization-notes.md` | Why you chose `beforeEach` vs `beforeAll` in each case, and the risk you avoided. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] The whole suite passes, and also passes with `--workers=1` and in a shuffled order
- [ ] Every test passes when run alone via `--grep`
- [ ] No `test.only` is committed
- [ ] `--grep @smoke` runs only the tagged subset

## Common Mistakes

- Test 2 depending on data test 1 created - it breaks the moment tests run in parallel.
- Logging in via the UI in `beforeEach` for 40 tests (slow) instead of reusing storage state.
- Putting an assertion in a hook, so a failure is reported against the wrong test.
- Committing `test.only` and shipping a green-but-empty CI run.

## Stretch Goals (optional)

- Use `storageState` to log in once and reuse the session across tests; measure the time saved.
- Write a custom fixture that provides an already-logged-in page.

## Resources

- [Playwright: Test hooks / describe](https://playwright.dev/docs/api/class-test)
- [Playwright: Annotations & tags](https://playwright.dev/docs/test-annotations)
- [Playwright: Parallelism](https://playwright.dev/docs/test-parallel)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-13`
2. Put your files in `Sessions/Week-13-Test-Suite-Organization-Hooks/<YourName>/` — flat, no extra subfolder.
3. Use the exact filenames in the Deliverables table above.
4. Check your work against the Definition of Done.
5. Run `node scripts/check-submissions.js` from the repo root and fix anything it flags.
6. Commit, push your branch, and open a Pull Request.

Never commit `node_modules/`, `test-results/`, `playwright-report/`, or `.env`.

## Using an AI Assistant

AI assistance is **allowed** on this programme — Optional K teaches it deliberately. Two conditions:

1. **Disclose it.** Add a comment at the top of any file where an assistant helped:
   `// AI-assisted: <tool> helped with <what>. I have verified and can explain every line.`
2. **Be able to explain every line.** You may be asked, in a spot check, why a
   particular line is there and to make a small change to it live.

What that rules out is submitting code you cannot explain. That fails the
Definition of Done above regardless of how it was produced, and it leaves you
unable to debug your own suite later in the course.

Note that several deliverables ask for the *real* error, output, or timing from
your machine. Those can only be completed by actually running the code.

## For Session Owners

- Prepare talking points and live-demo code against the agenda and key points above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts/` folder.
- Add a `Sample-Submission/` folder here showing the expected shape of the answer.
- If the session's real exercises drift from this guide, update `scripts/session-data.json`
  and rerun the generator — otherwise submissions get graded against the wrong spec.
- After the session, review submissions in the sibling `../<ParticipantName>/` folders.
