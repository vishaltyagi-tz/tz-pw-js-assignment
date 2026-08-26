# IFrames, Dialogs & Complex Popups

**Optional Session F** · Self-paced, anytime after Week 11 · Optional · Module 2: Playwright Core
**Session Owner:** Self-study
**Practice site:** https://the-internet.herokuapp.com/iframe, /javascript_alerts, /windows

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`frameLocator()`, nested frames, `page.on('dialog')`, accepting/dismissing alerts and confirms, new tabs/windows via `context.on('page')`.

## Prerequisites

- Week 11 complete

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | Why an iframe is a separate document and locators don't cross into it |
| 20 min | `frameLocator()` and chaining into nested frames |
| 20 min | Native dialogs: `page.on('dialog')`, accept vs dismiss |
| 15 min | New tabs and popups: waiting for the `page` event |

## Key Points to Land

- `page.getByRole(...)` cannot see inside an iframe - you must go through `frameLocator()`.
- Playwright auto-dismisses dialogs unless you register a `dialog` handler FIRST.
- Register the handler before the action that triggers the dialog, or you'll miss it.
- A popup arrives as a new `Page` - capture it with `context.waitForEvent('page')`.

## Deliverables

Submit these to `Sessions/Optional-F-Complex-Popups/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/iframe.spec.js` | Interact with an element inside an iframe using `frameLocator()`. |
| `tests/alert-accept.spec.js` | Handle a JS alert with `page.on('dialog')`, accept it, and assert the resulting page state. |
| `tests/confirm-dismiss.spec.js` | Dismiss a confirm dialog and assert the Cancel path was taken. |
| `tests/new-tab.spec.js` | Click a link that opens a new tab, capture the new page, and assert its title. |
| `popup-notes.md` | Why dialogs need a handler registered in advance, and what happens if you forget. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All four spec files pass
- [ ] No test relies on Playwright's default auto-dismiss behaviour by accident
- [ ] `new-tab.spec.js` asserts against the NEW page object, not the original

## Common Mistakes

- Registering the dialog handler after the click - too late.
- Expecting `page.locator()` to reach into an iframe.
- Forgetting `await newPage.waitForLoadState()` before asserting on a fresh tab.

## Stretch Goals (optional)

- Handle a nested iframe (a frame inside a frame) by chaining two `frameLocator()` calls.

## Resources

- [Playwright: Frames](https://playwright.dev/docs/frames)
- [Playwright: Dialogs](https://playwright.dev/docs/dialogs)
- [Playwright: Pages / popups](https://playwright.dev/docs/pages#handling-new-pages)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-f`
2. Put your files in `Sessions/Optional-F-Complex-Popups/<YourName>/` — flat, no extra subfolder.
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
