# Assertions & Verification

**Week 10** · Wed, Sep 30, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Hritik
**Practice site:** https://www.saucedemo.com (users: `standard_user`, `locked_out_user`, `problem_user`)

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Web-first assertions: `toBeVisible`, `toHaveText`, `toContainText`, `toHaveTitle`, `toHaveURL`, `toBeEnabled` / `toBeDisabled`, `toHaveValue`, `toHaveCount`, soft assertions.

## Prerequisites

- Week 9 complete - you can drive a form end to end

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | Web-first assertions: they retry until timeout, which is why they kill flakiness |
| 20 min | The visibility and text family; `toHaveText` (exact) vs `toContainText` (substring) |
| 15 min | State assertions: enabled/disabled, checked, editable |
| 20 min | Page-level: `toHaveTitle`, `toHaveURL` |
| 20 min | `expect.soft()` - collecting several failures in one run |
| 15 min | What makes a good assertion: one behaviour, a real expected value |

## Key Points to Land

- `await expect(locator).toBeVisible()` retries for the timeout. `expect(await locator.isVisible())` checks ONCE and is the top cause of flaky tests.
- Every `expect` on a locator needs `await`. Missing it makes the assertion silently pass.
- `toHaveText` matches the full string; `toContainText` matches a substring. Choose deliberately.
- Assert the thing the user cares about, not an implementation detail.
- `expect.soft()` reports and continues; plain `expect` stops the test at the first failure.

## Deliverables

Submit these to `Sessions/Week-10-Assertions-Verification/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/login.spec.js` | Three scenarios - success, invalid password, blank username - each with explicit `expect()` assertions. |
| `tests/locked-out.spec.js` | A fourth scenario for `locked_out_user`, asserting the error banner with `toContainText`. |
| `tests/button-state.spec.js` | Assert the submit button's enabled/disabled state before and after filling the form (`toBeEnabled` / `toBeDisabled`). |
| `tests/page-assertions.spec.js` | Assert `toHaveTitle` and `toHaveURL` after a successful login, plus `toHaveCount` on the product list. |
| `assertion-notes.md` | For each assertion you wrote, one line on what user-visible behaviour it protects. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All four spec files pass, and each test fails for the right reason when you break the app expectation on purpose
- [ ] Every `expect` on a locator is awaited
- [ ] No `if (await x.isVisible())` branching in place of an assertion
- [ ] At least one test uses `expect.soft()` and you can explain why it suited that case

## Common Mistakes

- `expect(await page.locator('.x').textContent()).toBe('Hi')` - no retry, instantly flaky. Use `toHaveText`.
- Forgetting `await` on `expect` - the test passes no matter what.
- `toHaveText` where the element has extra whitespace or a nested span; `toContainText` was what you wanted.
- A test with no assertion at all - it can only fail on a crash.

## Stretch Goals (optional)

- Write a custom matcher with `expect.extend()` for a domain rule you keep repeating.
- Use `toHaveScreenshot()` for a visual assertion and think about when that's worth the maintenance.

## Resources

- [Playwright: Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright: Soft assertions](https://playwright.dev/docs/test-assertions#soft-assertions)
- [Playwright best practices](https://playwright.dev/docs/best-practices)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-10`
2. Put your files in `Sessions/Week-10-Assertions-Verification/<YourName>/` — flat, no extra subfolder.
3. Use the exact filenames in the Deliverables table above.
4. Check your work against the Definition of Done.
5. Run `node scripts/check-submissions.js` from the repo root and fix anything it flags.
6. Commit, push your branch, and open a Pull Request.

Never commit `node_modules/`, `test-results/`, `playwright-report/`, or `.env`.

## For Session Owners

- Prepare talking points and live-demo code against the agenda and key points above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts/` folder.
- Add a `Sample-Submission/` folder here showing the expected shape of the answer.
- If the session's real exercises drift from this guide, update `scripts/session-data.json`
  and rerun the generator — otherwise submissions get graded against the wrong spec.
- After the session, review submissions in the sibling `../<ParticipantName>/` folders.
