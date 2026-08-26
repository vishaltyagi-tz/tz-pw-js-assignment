# Page Object Model (POM) - Part 2

**Week 15** · Wed, Nov 04, 2026 · Core · Module 3: Test Architecture
**Session Owner:** Vishal Tyagi

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Action methods inside page classes, method chaining, composing E2E tests from page objects, keeping tests free of raw locators.

## Prerequisites

- Week 14 complete - three page classes with locators

## Session Agenda

| Time | Topic |
|---|---|
| 25 min | Adding action methods: `login()`, `addItemToCart(name)`, `checkout(details)` |
| 20 min | Method granularity: one user action per method, and composing them |
| 25 min | Writing a clean E2E test that reads like a user story |
| 20 min | Returning a page object from a navigation method (chaining) |
| 20 min | Two more E2E scenarios built purely by composition |

## Key Points to Land

- After this week, a spec file should contain zero locator strings. If one remains, a method is missing.
- A method should be one user-meaningful action. `login(user, pass)`, not `typeIntoUsernameField()`.
- Return the next page object from a navigation method to enable readable chaining.
- Keep the assertions in the test. The page object gets you into position; the test judges the outcome.
- A well-composed test reads top to bottom like the manual test case it replaced.

## Deliverables

Submit these to `Sessions/Week-15-Page-Object-Model-Part-2/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `pages/*.js` | Your page classes extended with reusable action methods: `login()`, `addItemToCart(itemName)`, `checkout()`. |
| `tests/e2e-checkout.spec.js` | A complete Login -> Add to Cart -> Checkout flow with no raw locators in the test. |
| `tests/e2e-remove-item.spec.js` | Remove an item from the cart, composed purely from existing page object methods. |
| `tests/e2e-sort-products.spec.js` | Sort products by price and assert the order, again by composition only. |
| `pom-part2-notes.md` | Any method you had to add for the two new scenarios, and what that tells you about your Week 14 boundaries. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `grep -rE "getBy|locator\(|page\.\\$" tests/` returns nothing - every locator lives in `pages/`
- [ ] All three E2E specs pass and pass in parallel
- [ ] The two new scenarios needed few or no new locators - only new methods
- [ ] Every assertion is in a spec file, none in a page class

## Common Mistakes

- One giant `completePurchase()` method that no other test can reuse.
- Methods that assert internally, so the test can't say what it expected.
- Leaving `page.getByRole(...)` in the spec 'just this once'.
- Forgetting to `await` an action method that returns a Promise.

## Stretch Goals (optional)

- Convert your page objects into Playwright fixtures so tests receive them ready-made.
- Add a data-driven variant of the checkout test using an array of test-data objects.

## Resources

- [Playwright: Page object models](https://playwright.dev/docs/pom)
- [Playwright best practices](https://playwright.dev/docs/best-practices)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-15`
2. Put your files in `Sessions/Week-15-Page-Object-Model-Part-2/<YourName>/` — flat, no extra subfolder.
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
