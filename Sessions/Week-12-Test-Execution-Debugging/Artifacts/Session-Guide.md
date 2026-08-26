# Test Execution & Debugging

**Week 12** · Wed, Oct 14, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Aruneema

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

CLI runner flags, headed mode, `--debug` / Inspector, UI mode, HTML reports, trace viewer, screenshots & videos on failure, `--repeat-each`, `--grep`.

## Prerequisites

- Weeks 7-11 complete - you have a suite worth debugging

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | The flags that matter: `--headed`, `--debug`, `--ui`, `--grep`, `--repeat-each`, `--workers` |
| 20 min | The HTML report: reading a failure without rerunning it |
| 25 min | Trace viewer: timeline, DOM snapshots, network, console - a live walkthrough |
| 20 min | Playwright Inspector: stepping through, live-editing a locator |
| 15 min | Configuring `screenshot` / `video` / `trace` on failure |
| 15 min | A debugging method: reproduce, isolate, read the trace, then fix |

## Key Points to Land

- Read the trace before you change any code. The DOM snapshot shows what the page really looked like.
- `trace: 'on-first-retry'` is the standard config - full traces for failures, no cost when green.
- `--debug` opens the Inspector and pauses; `--ui` is the better day-to-day tool.
- A test that only fails in CI is usually a timing or test-data assumption, not a browser difference.
- `--repeat-each=10` is how you prove a flaky test is actually fixed.

## Deliverables

Submit these to `Sessions/Week-12-Test-Execution-Debugging/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/*` | Your existing suite, with one test deliberately failing. |
| `debug-report.md` | The HTML report and trace for that failure: what the trace showed, and the root cause you identified. |
| `inspector-notes.md` | Re-run the same test with `--debug`, step through it, and document what caused the failure and the moment you spotted it. |
| `slowest-step.md` | Run the suite with `--trace on`; name the slowest step and explain why it's slow. |
| `playwright.config.js` | Configured with `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] You can open a trace and explain a failure without rerunning the test
- [ ] The config captures trace, screenshot, and video on failure
- [ ] The deliberately failing test is fixed by the end, and the fix is explained
- [ ] `npx playwright show-report` works from a clean checkout

## Common Mistakes

- Guessing at fixes instead of reading the trace.
- Committing `test-results/` or `playwright-report/`.
- Debugging headed-only and never checking whether it passes headless.
- `console.log` debugging when the trace already shows you the DOM.

## Stretch Goals (optional)

- Use `--workers=1` vs the default and see whether any test depends on execution order (it shouldn't).
- Upload a trace to trace.playwright.dev and share the link in your notes.

## Resources

- [Playwright: Trace viewer](https://playwright.dev/docs/trace-viewer)
- [Playwright: Debugging tests](https://playwright.dev/docs/debug)
- [Playwright: Running and debugging](https://playwright.dev/docs/running-tests)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-12`
2. Put your files in `Sessions/Week-12-Test-Execution-Debugging/<YourName>/` — flat, no extra subfolder.
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
