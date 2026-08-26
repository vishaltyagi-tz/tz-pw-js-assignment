# Locators & Page Interactions

**Week 8** · Wed, Sep 16, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Vishal Tyagi
**Practice site:** https://www.saucedemo.com and https://demo.playwright.dev/todomvc

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

User-facing locators (`getByRole`, `getByLabel`, `getByText`, `getByPlaceholder`, `getByTestId`), CSS/XPath alternatives, locator chaining, strictness.

## Prerequisites

- Week 7 complete - a working Playwright project
- Optional E recommended (DevTools)

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | The locator priority list and why `getByRole` comes first |
| 20 min | `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText` with live examples |
| 15 min | `getByTestId` and why teams add `data-testid` on purpose |
| 20 min | CSS and XPath: when they're still the right answer |
| 20 min | Strict mode: 'resolved to 2 elements' and how to narrow with chaining / `.filter()` |
| 15 min | A locator is lazy - it's a query, not an element |

## Key Points to Land

- Locator priority: role > label > placeholder > text > testid > CSS > XPath.
- A locator is lazy. Creating it does nothing; the query runs when you act or assert.
- Strict mode is a feature: 'resolved to 2 elements' means your selector is ambiguous, so fix it.
- Narrow by chaining (`page.getByRole('row').getByRole('button')`) or `.filter({ hasText })`, not by `.nth(3)`.
- `getByRole` survives redesigns because it targets what the user perceives, not the markup.

## Deliverables

Submit these to `Sessions/Week-08-Locators-Page-Interactions/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/locators-userfacing.spec.js` | Written by hand, no CodeGen: locate 5 different elements with `getByRole` / `getByLabel` and act on each. |
| `tests/locators-css.spec.js` | The same 5 elements via CSS selectors. Add a comment on which approach was more readable and more stable. |
| `tests/locators-testid.spec.js` | At least 2 elements via `getByTestId`, plus a comment explaining why test IDs are the most resilient strategy. |
| `tests/strict-mode.spec.js` | Deliberately write an ambiguous locator, capture the strict-mode error in a comment, then fix it by chaining or filtering. |
| `locator-notes.md` | Rank the locator strategies you used from most to least maintainable, with one sentence of justification each. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All four spec files pass with `npx playwright test`
- [ ] No `.nth()` or `:nth-child()` remains as a final answer - each was replaced by a semantic locator
- [ ] `strict-mode.spec.js` contains the real error text and the working fix
- [ ] Not one locator was pasted from CodeGen

## Common Mistakes

- `page.click('...')` old-style API instead of `page.locator(...).click()` / `getByRole(...)`.
- Using `.first()` to silence strict mode instead of making the locator specific.
- Targeting generated class names (`.css-1x2y3z`) that change every deploy.
- Forgetting `await` on the action - the test passes without doing anything.

## Stretch Goals (optional)

- Use `page.getByRole('row').filter({ hasText: 'Sauce Labs Bike Light' })` to act inside one table row only.
- Write the same locator three ways and time each with `--trace on` to see if it matters (it usually doesn't - readability wins).

## Resources

- [Playwright: Locators](https://playwright.dev/docs/locators)
- [Playwright: Best practices for locators](https://playwright.dev/docs/best-practices#use-locators)
- [ARIA roles reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-8`
2. Put your files in `Sessions/Week-08-Locators-Page-Interactions/<YourName>/` — flat, no extra subfolder.
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
