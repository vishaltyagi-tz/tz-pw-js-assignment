# Conditional Logic & Operators

**Week 3** · Wed, Aug 12, 2026 · Core · Module 1: JS Fundamentals
**Session Owner:** Aruneema

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

if / else / else if, comparison operators (===, !==, >=), logical operators (&&, ||, !), nested if, switch, ternary.

## Prerequisites

- Week 2 complete - comfortable with variables, numbers, booleans

## Session Agenda

| Time | Topic |
|---|---|
| 15 min | What a condition is: an expression that evaluates to true or false |
| 20 min | `if`, `if...else`, and `else if` chains |
| 15 min | Why order matters in an `else if` chain |
| 15 min | Nested `if` and combining conditions with `&&` / `||` / `!` |
| 20 min | `switch` / `case` / `break` / `default`, and fall-through |
| 15 min | The ternary `? :` and when it hurts readability |

## Key Points to Land

- An `else if` chain stops at the FIRST true branch - put the most specific condition first.
- Always use `===`, not `==`. `==` coerces types and will surprise you.
- `&&` needs both sides true; `||` needs one; `!` flips the result.
- Forgetting `break` in a `switch` causes fall-through into the next case.
- `default` in a `switch` is the `else` - always handle the unrecognised value.

## Deliverables

Submit these to `Sessions/Week-03-Conditional-Logic-Operators/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `userRoles.js` | Given `role` of `'Admin'` / `'Tester'` / `'Guest'`, print the matching permission level using `if` / `else if`, with an `else` for an unrecognised role. |
| `userAccess.js` | Using `&&` and `||`, check `isLoggedIn` AND `hasValidSession` and print `Access Granted` or `Access Denied`. |
| `gradeCalculator.js` | An `else if` chain turning `marks` into Grade A/B/C/D/Fail. Then deliberately put `marks >= 40` first, observe the wrong answer, and explain it in a comment. |
| `entryCheck.js` | A nested `if`: outer checks `age >= 18`, inner checks `hasID === true`. Print the outcome for both a passing and a failing case. |
| `roleSwitch.js` | Rewrite `userRoles.js` using `switch` / `case` / `break` / `default`. |
| `ternaryDemo.js` | Use the ternary `? :` to set `"Adult"` or `"Minor"` from `age`, and note in a comment when a full `if...else` would read better. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All six files run cleanly
- [ ] Every file uses `===` rather than `==`
- [ ] `gradeCalculator.js` documents the wrong-order experiment
- [ ] `roleSwitch.js` has a `break` in every case plus a `default`
- [ ] Each conditional has been tested with BOTH a true and a false input

## Common Mistakes

- `=` (assign) where you meant `===` (compare) - `if (role = 'Admin')` is always true.
- Ordering `else if` from general to specific, so later branches are unreachable.
- Missing `break`, causing two cases to run.
- Comparing a boolean to a string: `if (isLoggedIn === 'true')` is not the same as `=== true`.

## Stretch Goals (optional)

- Write a truth table in a comment for `age < 18 || hasPermission === true` covering all four input combinations.
- Explain in a comment why `!isLoggedIn` is preferred over `isLoggedIn === false`.

## Resources

- [MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN: switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [javascript.info: Logical operators](https://javascript.info/logical-operators)
- Participant handout in this folder — `Conditional-logical-operators.docx`

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-3`
2. Put your files in `Sessions/Week-03-Conditional-Logic-Operators/<YourName>/` — flat, no extra subfolder.
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
