# Actions & User Inputs

**Week 9** · Wed, Sep 23, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Tarun
**Practice site:** https://demoqa.com/automation-practice-form and https://www.saucedemo.com/checkout-step-one.html

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`.fill()`, `.click()`, `.check()` / `.uncheck()`, `.selectOption()`, `.press()`, `.hover()`, `.setInputFiles()`, negative-path validation.

## Prerequisites

- Week 8 complete - you can locate any element by hand

## Session Agenda

| Time | Topic |
|---|---|
| 15 min | `.fill()` vs `.type()` vs `.pressSequentially()` - which and why |
| 20 min | Clicks, checkboxes, radio buttons; `.check()` is idempotent, `.click()` is a toggle |
| 20 min | Dropdowns: `.selectOption()` by value, label, and index; multi-select |
| 20 min | Keyboard: `.press('Tab')`, `.press('Enter')`, submitting without clicking |
| 20 min | File upload with `.setInputFiles()` |
| 15 min | The negative path: submitting an empty form and asserting the validation |

## Key Points to Land

- `.fill()` clears then sets in one step - prefer it. `.type()` is for when the app listens to keystrokes.
- `.check()` guarantees checked state; `.click()` on a checkbox flips it, so twice = unchanged.
- `.selectOption({ label: 'India' })` is far more readable than `.selectOption('IN')`.
- Every action auto-waits for the element to be visible, stable, enabled, and receiving events.
- Negative-path tests find more real bugs than happy-path tests. Write them deliberately.

## Deliverables

Submit these to `Sessions/Week-09-Actions-User-Inputs/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/registration-form.spec.js` | Fill a full registration form: text fields, checkboxes, radio buttons, and a multi-select dropdown. |
| `tests/keyboard-nav.spec.js` | Move between fields with `.press('Tab')` and submit with `.press('Enter')` - no click on the submit button. |
| `tests/negative-path.spec.js` | Submit the form with required fields blank and assert each validation message that appears. |
| `tests/file-upload.spec.js` | Upload a small file with `.setInputFiles()` and assert the filename appears in the UI. Commit the fixture file too. |
| `action-notes.md` | When you'd choose `.fill()` over `.type()`, `.check()` over `.click()`, and `.selectOption({label})` over a raw value. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All four spec files pass
- [ ] `negative-path.spec.js` asserts real validation text, not just that the page didn't navigate
- [ ] No `page.waitForTimeout()` anywhere - rely on auto-waiting
- [ ] The upload fixture is committed and the test passes from a clean clone

## Common Mistakes

- `.click()` twice on a checkbox and wondering why nothing changed.
- `.selectOption('India')` when the option's VALUE is `IN` - pass `{ label: 'India' }`.
- Asserting on a validation message before the app renders it - assert on the locator, let Playwright wait.
- An absolute path in `.setInputFiles()` that only exists on your machine. Use `path.join(__dirname, ...)`.

## Stretch Goals (optional)

- Automate a date picker without typing into it - clicking through the calendar widget.
- Handle a `<select multiple>` and assert all selected values.

## Resources

- [Playwright: Actions](https://playwright.dev/docs/input)
- [Playwright: Auto-waiting](https://playwright.dev/docs/actionability)
- [Practice form](https://demoqa.com/automation-practice-form)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-9`
2. Put your files in `Sessions/Week-09-Actions-User-Inputs/<YourName>/` — flat, no extra subfolder.
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
