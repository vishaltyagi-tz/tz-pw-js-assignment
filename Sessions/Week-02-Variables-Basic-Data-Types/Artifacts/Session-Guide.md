# Variables & Basic Data Types

**Week 2** · Wed, Aug 05, 2026 · Core · Module 1: JS Fundamentals
**Session Owner:** Tarun

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

let vs const, block scope, Strings, Numbers, Booleans, string concatenation with `+`.

## Prerequisites

- Week 1 complete - you can create and run a `.js` file

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | `let` vs `const`; what block scope means and why it prevents bugs |
| 20 min | Strings: quotes vs backticks, immutability |
| 20 min | Numbers and the arithmetic operators `+ - * / %` |
| 15 min | Booleans, and how a comparison produces one |
| 25 min | String concatenation with `+`, and remembering your own spaces |

## Key Points to Land

- Start with `const`. Reach for `let` only once you know the value must change.
- `const` must be initialised at declaration, and cannot be reassigned.
- Both `let` and `const` are block-scoped - they exist only inside their `{ }`.
- `+` between a string and a number converts the number to text: `"a" + 1` is `"a1"`.
- Concatenation adds no spaces for you - `first + " " + last`, not `first + last`.

## Deliverables

Submit these to `Sessions/Week-02-Variables-Basic-Data-Types/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `studentName.js` | `let studentName` with your name; print it. |
| `birthYear.js` | `const birthYear`; then TRY to reassign it, run it, and paste the exact error in a comment. |
| `numbers.js` | `num1` and `num2`; print their sum, difference, product, and division result. |
| `courseName.js` | `courseName = "JavaScript Basics"`; print `I am learning JavaScript Basics.` |
| `fullName.js` | `firstName` + `lastName` combined into `fullName`; print it. |
| `marks.js` | `marks`, plus a boolean `isPassed` holding whether marks >= 40. |
| `city.js` | `city`; use concatenation to print `I live in <city>.` |
| `vote.js` | `age`, plus a boolean `canVote` holding whether age >= 18. |
| `totalPrice.js` | `productPrice` and `quantity`; print e.g. `Total price is 500`. |
| `selfIntro.js` | A self-introduction from `name`, `age`, `city`, `course` joined by concatenation. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All ten files run cleanly with `node <file>.js`
- [ ] `birthYear.js` contains the real `TypeError: Assignment to constant variable.` text
- [ ] Every printed sentence has correct spacing (no `Iliveinnoida`)
- [ ] You used `const` wherever the value never changes

## Common Mistakes

- Forgetting spaces in concatenation - the single most common bug this week.
- `const` with no value: `const x;` is a SyntaxError.
- Using a variable outside the `{ }` block it was declared in.
- `"5" + 3` gives `"53"`, not `8`. Watch for numbers arriving as strings.

## Stretch Goals (optional)

- Rewrite `selfIntro.js` using template literals (backticks and `${}`) and note which reads better. Backticks are formally introduced later - this is a preview.
- Print `typeof` each of your variables and explain any result that surprises you.

## Resources

- [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [javascript.info: Data types](https://javascript.info/types)
- Participant handout in this folder — `PW_Week 2 tranning.docx`

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-2`
2. Put your files in `Sessions/Week-02-Variables-Basic-Data-Types/<YourName>/` — flat, no extra subfolder.
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
