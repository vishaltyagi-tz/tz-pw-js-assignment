# Page Object Model (POM) - Part 1

**Week 14** · Wed, Oct 28, 2026 · Core · Module 3: Test Architecture
**Session Owner:** Hritik

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

The POM pattern, page classes, constructors, encapsulating locators, `pages/` folder structure, what does NOT belong in a page object.

## Prerequisites

- Week 13 complete - organised tests with hooks

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | The problem POM solves: one locator changing in 30 spec files |
| 20 min | Anatomy of a page class: constructor, `page`, locator properties |
| 25 min | Building `LoginPage.js` together |
| 20 min | `InventoryPage.js` and `CartPage.js` on your own |
| 15 min | What does NOT go in a page object: assertions, test data, other pages' locators |
| 10 min | Folder structure: `pages/`, `tests/`, `fixtures/` |

## Key Points to Land

- One page class owns the locators for one page. No overlap, no reaching into another page.
- Define locators as properties in the constructor - resolved lazily, so it's safe.
- Assertions belong in the TEST, not the page object. The page object exposes state; the test judges it.
- A page object never contains test data. Pass it in as a parameter.
- If a class needs another page's locators, you've drawn the boundary in the wrong place.

## Deliverables

Submit these to `Sessions/Week-14-Page-Object-Model-Part-1/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `pages/LoginPage.js` | A class encapsulating the login page's locators and a constructor taking `page`. Locators only this week. |
| `pages/InventoryPage.js` | Same pattern for the inventory/products page. |
| `pages/CartPage.js` | Same pattern, cart-related locators only. |
| `tests/pom-smoke.spec.js` | Imports all three classes and verifies each page loads - no actions yet - proving the structure works end to end. |
| `pom-notes.md` | Why you assigned each locator to the page you did, and one locator you were tempted to duplicate across two classes. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `pom-smoke.spec.js` passes and uses all three page classes
- [ ] No page class contains an `expect()`
- [ ] No page class contains a hardcoded username or password
- [ ] No locator string appears in the spec file

## Common Mistakes

- Resolving locators in the constructor with `await` - a constructor can't be async. Store the locator, not the element.
- Putting assertions in the page object, so failures point at the wrong file.
- A god-object `AppPage.js` holding every locator in the app.
- Hardcoding credentials inside the page class.

## Stretch Goals (optional)

- Add a `BasePage` with shared navigation helpers and have the three pages extend it - then argue whether it earned its place.

## Resources

- [Playwright: Page object models](https://playwright.dev/docs/pom)
- [Practice site](https://www.saucedemo.com)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-14`
2. Put your files in `Sessions/Week-14-Page-Object-Model-Part-1/<YourName>/` — flat, no extra subfolder.
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
