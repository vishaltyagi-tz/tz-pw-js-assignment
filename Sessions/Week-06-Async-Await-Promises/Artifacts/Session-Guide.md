# Async/Await & Promises

**Week 6** · Wed, Sep 02, 2026 · Core · Module 1: JS Fundamentals
**Session Owner:** Prachi

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Synchronous vs asynchronous execution, the callback problem, Promises, `async` / `await`, `try/catch`, `Promise.all`.

## Prerequisites

- Week 4 complete (functions returning values)
- Week 5 complete (loops)

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | Sync vs async: why `setTimeout` doesn't block, demonstrated live |
| 20 min | A Promise as a receipt for a future value: pending -> fulfilled / rejected |
| 25 min | `async` / `await` - the readable way to consume a Promise |
| 20 min | Errors: `try/catch` around `await`, and what an unhandled rejection looks like |
| 20 min | Sequential vs parallel (`await` in series vs `Promise.all`) |
| 15 min | Why every Playwright call you'll write starts with `await` |

## Key Points to Land

- `await` only works inside an `async` function. This is the #1 error you'll hit.
- An `async` function ALWAYS returns a Promise, even when you return a plain value.
- Forgetting `await` gives you a `Promise { <pending> }` instead of your value - the single most common Playwright bug too.
- Sequential `await`s add up: two 2-second calls in series take 4s; `Promise.all` takes 2s.
- Only `try/catch` around an `await` catches an async error - a plain `if` won't.

## Deliverables

Submit these to `Sessions/Week-06-Async-Await-Promises/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `fetchUserData.js` | A mock `fetchUserData()` returning a Promise that resolves after 2s via `setTimeout`; call it with `async/await` and log the result. |
| `sequential.js` | Add `fetchOrderData()`; await both in sequence and log the total elapsed time using `Date.now()`. |
| `errorHandling.js` | A function that deliberately rejects; handle it with `try/catch` and log a friendly message. Also show what happens with NO try/catch, in a comment. |
| `parallel.js` | Run both mock fetches with `Promise.all` and log the elapsed time. Explain the difference from `sequential.js` in a comment. |
| `missingAwait.js` | Call an async function WITHOUT `await`, log the result, and explain the `Promise { <pending> }` output in a comment. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All five files run cleanly with no unhandled promise rejection warnings
- [ ] `sequential.js` and `parallel.js` both print real elapsed times, and the parallel one is measurably faster
- [ ] `errorHandling.js` never crashes the process
- [ ] `missingAwait.js` contains your explanation of the pending-Promise output

## Common Mistakes

- `await` at the top level of an old-style script - wrap it in an `async function main()` and call `main()`.
- Forgetting `await`, then wondering why a value is `undefined` or `[object Promise]`.
- `try/catch` placed around the function DEFINITION rather than the `await` call.
- Using `.then()` and `await` on the same call at once.

## Stretch Goals (optional)

- Write `retry(fn, attempts)` that awaits `fn()` and retries on rejection - the pattern behind flaky-test retries.
- Compare `Promise.all` with `Promise.allSettled` when one promise rejects.

## Resources

- [MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [javascript.info: Promises, async/await](https://javascript.info/async)
- [MDN: Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-6`
2. Put your files in `Sessions/Week-06-Async-Await-Promises/<YourName>/` — flat, no extra subfolder.
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
