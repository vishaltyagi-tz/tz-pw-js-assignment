# Writing Clean & Maintainable Test Code

**Optional Session H** · Self-paced, anytime after Week 12 · Optional · Coding Standards & Best Practices
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Naming conventions, ESLint & Prettier, avoiding hardcoded waits and magic strings, DRY in test code, meaningful vs over-asserting, PR review checklists, folder structure.

## Prerequisites

- Weeks 7-12 complete - you have real test code to clean up

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | Naming: files, tests, page objects, variables - conventions that scale |
| 20 min | Installing and configuring ESLint + Prettier; fixing the first wave of warnings |
| 20 min | Magic strings and hardcoded waits: extracting constants and config |
| 15 min | DRY vs premature abstraction in tests - when duplication is fine |
| 15 min | Over-asserting: the test that breaks on every unrelated change |
| 20 min | Building your own code review checklist |

## Key Points to Land

- A test name should say what behaviour is protected: `rejects login with a blank username`.
- Some duplication in tests is healthy - readability beats cleverness in a spec file.
- Over-asserting couples your test to layout. Assert the behaviour under test, not the whole page.
- A linter ends style arguments in review, so review can be about substance.
- Extract a locator into a page object when it's used twice, not on the first sighting.

## Deliverables

Submit these to `Sessions/Optional-H-Coding-Standards-Best-Practices/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `.eslintrc / eslint.config.js and .prettierrc` | Configured, committed, and all existing warnings across your previous weeks' scripts fixed. |
| `refactor-notes.md` | One test file refactored: magic strings/hardcoded values moved into a constants or config file, and poorly-named things renamed. Show before/after. |
| `code-review-checklist.md` | Your own 5-8 item checklist (e.g. no hardcoded waits, descriptive test names, no duplicated locators). |
| `self-review.md` | Apply your checklist to one of your own past assignments and note what you'd change. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `npx eslint .` reports zero errors
- [ ] `npx prettier --check .` passes
- [ ] No magic strings or hardcoded credentials remain in the refactored file
- [ ] Your self-review names at least three concrete changes

## Common Mistakes

- Installing ESLint then disabling every rule that complains.
- Extracting everything into helpers until the test is unreadable indirection.
- A checklist of vague items ('write good code') instead of checkable ones.

## Stretch Goals (optional)

- Add `eslint-plugin-playwright` and fix what it finds.

## Resources

- [ESLint: Getting started](https://eslint.org/docs/latest/use/getting-started)
- [Prettier](https://prettier.io/docs/en/index.html)
- [Playwright best practices](https://playwright.dev/docs/best-practices)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-h`
2. Put your files in `Sessions/Optional-H-Coding-Standards-Best-Practices/<YourName>/` — flat, no extra subfolder.
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
