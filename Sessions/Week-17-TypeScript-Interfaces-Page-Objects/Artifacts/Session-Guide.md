# TypeScript Interfaces & Typed Page Objects

**Week 17** · Wed, Nov 18, 2026 · Core · Module 4: TypeScript Intro
**Session Owner:** Vishal Tyagi

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`interface` vs `type`, optional & readonly properties, typing page objects, typed test data, union types, data-driven tests, IntelliSense payoff.

## Prerequisites

- Week 16 complete - the suite compiles under `strict`

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | `interface` vs `type` - and a rule of thumb for which to reach for |
| 25 min | Modelling test data: `UserCredentials`, `ProductDetails` |
| 20 min | Typing page object methods and their parameters |
| 20 min | Optional (`?`) and `readonly` properties; union types for fixed sets |
| 25 min | Data-driven tests over a typed array of cases |

## Key Points to Land

- A typed test-data object catches a typo'd property at write time, not at 3am in CI.
- Union types are ideal for fixed sets: `type Role = 'Admin' | 'Tester' | 'Guest'`.
- Typing a page object method's parameters is where IntelliSense starts paying you back.
- Use `interface` for object shapes you may extend; `type` for unions and aliases.
- A typed array of cases plus one `for...of` loop replaces ten near-identical tests.

## Deliverables

Submit these to `Sessions/Week-17-TypeScript-Interfaces-Page-Objects/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `types/TestData.ts` | Interfaces for `UserCredentials` and `ProductDetails`, plus a third `OrderSummary` (itemCount, totalPrice, shippingAddress). |
| `pages/*.ts` | Page objects refactored to take typed parameters; a checkout helper returning `OrderSummary`. |
| `fixtures/users.ts` | At least two typed test-data objects built from the interfaces. |
| `tests/data-driven-login.spec.ts` | A data-driven login test over your typed data covering valid and invalid credentials. |
| `types-notes.md` | Where you chose `interface` over `type` and why; plus one bug the compiler caught for you. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `npx tsc --noEmit` is clean
- [ ] The data-driven test generates one reported test per data case (not one test with a loop inside)
- [ ] No `any` remains in `types/`, `pages/`, or `fixtures/`
- [ ] `OrderSummary` is the actual declared return type of the checkout helper

## Common Mistakes

- A loop inside a single `test()`, so the report shows one test and stops at the first failure. Loop OUTSIDE and call `test()` per case.
- Marking everything optional with `?`, which defeats the point.
- Duplicating an interface instead of extending it.
- Typing a parameter as `object` - that's barely better than `any`.

## Stretch Goals (optional)

- Use a generic helper `pickTestUser<T extends UserCredentials>()` and explain what the generic buys you.
- Derive a type from your data with `typeof` / `keyof` instead of hand-writing it.

## Resources

- [TS Handbook: Object types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TS Handbook: Unions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [Playwright: Parameterize tests](https://playwright.dev/docs/test-parameterize)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-17`
2. Put your files in `Sessions/Week-17-TypeScript-Interfaces-Page-Objects/<YourName>/` — flat, no extra subfolder.
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
