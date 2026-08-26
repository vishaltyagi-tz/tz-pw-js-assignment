# Functions & Reusability

**Week 4** · Wed, Aug 19, 2026 · Core · Module 1: JS Fundamentals
**Session Owner:** Prachi

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Function declarations, parameters & arguments, return values, arrow functions, default & rest parameters, higher-order functions, DRY.

## Prerequisites

- Week 3 complete - comfortable with conditions and booleans

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | Declarations, parameters vs arguments, and `return` |
| 20 min | Function expressions and arrow functions (block body vs shorthand) |
| 15 min | Declaration vs arrow: hoisting, `this`, when to use which |
| 15 min | Default parameters and rest parameters |
| 20 min | Why functions = reusability: DRY, single responsibility, naming |
| 20 min | Higher-order functions and a hand-rolled `runTest` - your first taste of a test runner |

## Key Points to Land

- A function with no `return` returns `undefined` - the most common silent bug this week.
- Declarations are hoisted; arrow functions assigned to a `const` are not.
- One function, one job. `isValidAge` validates - it does not also log or format.
- Name a boolean-returning function so the name reads as a question: `isValidPassword`.
- Test the boundaries (8, 20, 7, 21), not just the comfortable middle.

## Deliverables

Submit these to `Sessions/Week-04-Functions-Reusability/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `helpers.js` | `calculateTotal(price, quantity)` returning price * quantity, and `applyTax(price, taxRate = 5)` using a default parameter. |
| `arrowHelpers.js` | Rewrite `calculateTotal` as a shorthand arrow `calculateTotalArrow`, and compare the two syntaxes in a comment. |
| `formatProductLabel.js` | `formatProductLabel(name, category)` returning e.g. `Shoes (Footwear)`, using a small capitalise helper defined inside. |
| `passwordValidator.js` | `isValidPassword(password)` returning true only for length 8-20 inclusive. Call it with at least 5 values including both boundaries. |
| `average.js` | `average(...numbers)` using a rest parameter, returning the mean of any count of arguments. |
| `testRunner.js` | A `runTest(description, actual, expected)` higher-order helper; use it on three of your functions, with at least one deliberate failing test. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All six files run cleanly
- [ ] Every function `return`s a value - none rely on `console.log` as the result
- [ ] `passwordValidator.js` proves both boundaries (8 and 20 pass; 7 and 21 fail)
- [ ] `testRunner.js` output shows at least one PASS and one FAIL
- [ ] No logic is copy-pasted between files - shared logic became a function

## Common Mistakes

- `console.log()` inside the function instead of `return` - the caller then gets `undefined`.
- Calling an arrow function before the line that defines it (not hoisted).
- Off-by-one on inclusive boundaries: `> 8` excludes 8; you wanted `>= 8`.
- Mutating an argument instead of returning a new value.

## Stretch Goals (optional)

- Rewrite `average` using `.reduce()` and keep both versions side by side.
- Extend `runTest` to keep a pass/fail tally and print a summary line at the end.

## Resources

- [MDN: Functions guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- Study guide + practice file in this folder — `javascript-functions-study-guide.docx / javascript-functions-practice.js`

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-4`
2. Put your files in `Sessions/Week-04-Functions-Reusability/<YourName>/` — flat, no extra subfolder.
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
