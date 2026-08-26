# Auto-Waiting & Handling Delays

**Week 11** · Wed, Oct 07, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Vishal Tyagi - Jr
**Practice site:** https://demo.playwright.dev/todomvc and https://the-internet.herokuapp.com/dynamic_loading

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

The auto-waiting model, actionability checks, `waitForURL`, `waitForSelector`, `waitForLoadState`, `waitForResponse`, timeout configuration, why `waitForTimeout` is a smell.

## Prerequisites

- Week 10 complete - you write retrying assertions

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | What Playwright waits for before every action (visible, stable, enabled, receives events) |
| 20 min | Why `page.waitForTimeout()` is the wrong tool, always |
| 20 min | `waitForURL` after a navigation; `waitForLoadState` |
| 20 min | `waitForResponse` / `waitForRequest` - waiting on the network, not the clock |
| 20 min | Timeouts: global, per-test, per-action, per-assertion - and which to change |
| 15 min | Diagnosing a real timeout error message |

## Key Points to Land

- You almost never need an explicit wait. If you think you do, the assertion is probably non-retrying.
- `waitForTimeout` makes a fast machine slow and a slow machine still flaky. It fixes nothing.
- `await expect(locator).toBeVisible()` IS your wait - it retries until the timeout.
- A timeout error names the locator and what it was waiting for. Read it before changing any number.
- Raising the global timeout hides the bug. Fix the wait, not the number.

## Deliverables

Submit these to `Sessions/Week-11-Auto-Waiting-Handling-Delays/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/dynamic-loading.spec.js` | Test a page whose element appears after a ~3s delay, with NO hardcoded timeout. |
| `tests/wait-for-url.spec.js` | Wait for a URL change after navigating with `waitForURL`, then assert content on the new page. |
| `tests/timeout-experiment.spec.js` | Set a deliberately short timeout on one assertion to force a failure; paste the error, then fix it and document the difference. |
| `tests/wait-for-response.spec.js` | Use `waitForResponse` to wait for a specific network call rather than a fixed delay. |
| `waiting-notes.md` | Every wait you used, and why the auto-wait alone wasn't enough in that one case. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `grep -r 'waitForTimeout' tests/` returns nothing
- [ ] All four spec files pass, and pass again 5 times in a row (`--repeat-each=5`)
- [ ] `timeout-experiment.spec.js` contains the real timeout error text and the fix
- [ ] No global timeout was raised to make a test pass

## Common Mistakes

- Reaching for `waitForTimeout(5000)` the moment a test fails.
- `waitForSelector` immediately followed by an assertion on the same element - redundant.
- Raising `timeout` in the config to mask a genuinely broken locator.
- Waiting for `networkidle` on a page with polling or analytics - it never settles.

## Stretch Goals (optional)

- Use `page.route()` to delay a response artificially and prove your test still passes.
- Run the suite with `--repeat-each=10` and hunt any test that isn't 10/10.

## Resources

- [Playwright: Auto-waiting / actionability](https://playwright.dev/docs/actionability)
- [Playwright: Timeouts](https://playwright.dev/docs/test-timeouts)
- [Dynamic loading practice page](https://the-internet.herokuapp.com/dynamic_loading)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-11`
2. Put your files in `Sessions/Week-11-Auto-Waiting-Handling-Delays/<YourName>/` — flat, no extra subfolder.
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
