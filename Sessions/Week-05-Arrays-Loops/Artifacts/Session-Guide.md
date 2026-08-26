# Arrays & Loops

**Week 5** · Wed, Aug 26, 2026 · Core · Module 1: JS Fundamentals
**Session Owner:** Tarun

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Array creation, indexing, `.length`, `for` loops, `for...of`, `.push()` / `.shift()` / `.pop()`, and a first look at `.includes()`.

## Prerequisites

- Week 4 complete - you can write and call a function that returns a value

## Session Agenda

| Time | Topic |
|---|---|
| 15 min | Creating arrays, zero-based indexing, `.length` |
| 20 min | The classic `for` loop: init / condition / increment |
| 15 min | `for...of` - when you want the value, not the index |
| 20 min | Mutating arrays: `.push()`, `.pop()`, `.shift()`, `.unshift()` |
| 20 min | Searching and filtering by hand: `.includes()`, counting matches |
| 20 min | Why this matters for testing: a list of test data driving one assertion |

## Key Points to Land

- Indexes start at 0, so the last item is `arr[arr.length - 1]`.
- `for (let i = 0; i < arr.length; i++)` - `<`, never `<=`, or you read `undefined`.
- Use `for...of` when you don't need the index; it's harder to get wrong.
- `.push()` adds to the end, `.shift()` removes from the FRONT (and shifts everything down).
- An array declared with `const` can still have items added - `const` blocks reassignment, not mutation.

## Deliverables

Submit these to `Sessions/Week-05-Arrays-Loops/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `products.js` | An array of 5 product titles. Loop through it and print only titles longer than 10 characters. |
| `arrayMutation.js` | Add a 6th product with `.push()`, remove the first with `.shift()`, printing the whole array after each change. |
| `countMatches.js` | Use `for...of` to count and print how many titles contain `'Shirt'` or `'Bag'`. |
| `loopComparison.js` | Print the same array twice - once with a `for` loop using the index, once with `for...of` - and compare them in a comment. |
| `testDataLoop.js` | An array of 4 login objects (`{ username, password }`); loop it and print a one-line summary per set. This is the shape of data-driven testing. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All five files run cleanly
- [ ] No loop reads past the end of its array (no stray `undefined` in output)
- [ ] `arrayMutation.js` output clearly shows the array before and after each operation
- [ ] `loopComparison.js` states which loop you'd choose and why

## Common Mistakes

- `i <= arr.length` - off by one, prints `undefined` as the last item.
- Confusing `.shift()` (removes first) with `.pop()` (removes last).
- Trying to reassign a `const` array (`products = [...]`) rather than mutating it.
- Comparing `.length` to a string: `if (title.length > '10')` happens to work but is wrong.

## Stretch Goals (optional)

- Redo `products.js` with `.filter()` and compare the line count to your `for` loop.
- Write `findLongestTitle(titles)` returning the longest string, and handle the empty-array case.

## Resources

- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [javascript.info: Arrays](https://javascript.info/array)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-5`
2. Put your files in `Sessions/Week-05-Arrays-Loops/<YourName>/` — flat, no extra subfolder.
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
