# Transitioning JS to TypeScript

**Week 16** · Wed, Nov 11, 2026 · Core · Module 4: TypeScript Intro
**Session Owner:** Vishal Tyagi

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Why TypeScript, `.ts` files, `tsconfig.json`, basic annotations (`string`, `number`, `boolean`, arrays), inference, `any` vs `unknown`, compile-time vs run-time errors.

## Prerequisites

- Week 15 complete - a working POM framework in JavaScript

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | What TypeScript buys a test suite: errors at write time, real autocomplete |
| 20 min | Renaming `.js` to `.ts`; what Playwright already does for you |
| 20 min | Annotating parameters, return types, and variables; letting inference do the rest |
| 20 min | `tsconfig.json`: the options that actually matter (`strict`, `target`, `types`) |
| 20 min | Compile error vs runtime error, demonstrated side by side |
| 15 min | `any` is an escape hatch, `unknown` is a safe one |

## Key Points to Land

- Playwright runs `.ts` out of the box - no build step to configure.
- Don't annotate what's obvious. `const name: string = 'x'` is noise; inference has it.
- DO annotate function parameters and return types - that's where the value is.
- `any` disables checking for that value and everything it touches. Every `any` is a deferred bug.
- A compile error happens before the browser opens; a runtime error happens 40 seconds in. Prefer the first.

## Deliverables

Submit these to `Sessions/Week-16-Transitioning-JS-to-TypeScript/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `helpers/*.ts` | Your existing JS helper files renamed to `.ts` with explicit annotations, and all compiler warnings resolved. |
| `tsconfig.json` | Committed, with `strict: true`, and a comment on each option you changed. |
| `type-error-demo.ts` | Deliberately pass a wrong-typed argument; paste the exact compiler error in a comment, then fix it. |
| `any-removal.md` | Every `any` you replaced, what you replaced it with, and any you deliberately kept plus why. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `npx tsc --noEmit` reports zero errors
- [ ] The whole Playwright suite still passes after the conversion
- [ ] Every exported function has annotated parameters and a return type
- [ ] `type-error-demo.ts` contains the real compiler error text

## Common Mistakes

- Silencing errors with `any` or `@ts-ignore` instead of fixing the type.
- Over-annotating every local variable until the code is unreadable.
- Forgetting to install `@types/node` and getting errors on `process` or `path`.
- Renaming to `.ts` and never actually running `tsc`, so nothing is checked.

## Stretch Goals (optional)

- Turn on `noUncheckedIndexedAccess` and fix what it surfaces.
- Convert one page object to `.ts` and see what autocomplete gives you that JS didn't.

## Resources

- [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Playwright: TypeScript support](https://playwright.dev/docs/test-typescript)
- [tsconfig reference](https://www.typescriptlang.org/tsconfig)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-16`
2. Put your files in `Sessions/Week-16-Transitioning-JS-to-TypeScript/<YourName>/` — flat, no extra subfolder.
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
