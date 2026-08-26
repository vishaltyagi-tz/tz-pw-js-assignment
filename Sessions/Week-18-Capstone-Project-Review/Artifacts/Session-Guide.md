# Capstone Project & Review

**Week 18** · Wed, Nov 25, 2026 · Core · Module 4: TypeScript Intro
**Session Owner:** Vishal Tyagi

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

End-to-end suite review, framework design, documentation, presenting your work.

## Prerequisites

- Weeks 1-17 complete. This assembles everything - start it by Week 15, not Week 17.

## Session Agenda

| Time | Topic |
|---|---|
| 10 min | What's being assessed and how |
| 60 min | Capstone presentations (5-10 min each) |
| 20 min | Cross-cutting feedback: what the cohort did well, what to work on |
| 15 min | Where to go next: CI, sharding, visual testing, contract testing |

## Key Points to Land

- The suite is judged on maintainability, not test count. Ten clear tests beat forty copy-pasted ones.
- A README that lets someone else run your suite is part of the deliverable, not an afterthought.
- Every test must pass from a clean clone: `npm ci`, `npx playwright install`, `npm test`.
- Be honest about limitations in the presentation - naming what you'd improve is a senior signal.

## Deliverables

Submit these to `Sessions/Week-18-Capstone-Project-Review/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `A complete E2E regression suite` | TypeScript + Playwright + POM against a sample web application. Committed to your own participant folder or a linked repo. |
| `README.md` | How to install dependencies, run the suite, run a subset, and view the HTML report. Plus your framework structure and any known limitations. |
| `presentation.md (or slides)` | A 5-10 minute walkthrough: framework structure, one interesting bug you found, and one improvement you'd make with more time. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `npm ci && npx playwright install && npm test` passes from a clean clone with no manual steps
- [ ] `npx tsc --noEmit` is clean
- [ ] Zero `waitForTimeout`, zero `test.only`, zero hardcoded credentials, zero raw locators in spec files
- [ ] Every page object lives in `pages/`, every type in `types/`, every spec in `tests/`
- [ ] The README is good enough that a reviewer never has to ask you a question to run it
- [ ] The suite passes twice in a row (`--repeat-each=2`) - no flakiness

## Common Mistakes

- Leaving it until Week 17. Start in Week 15.
- A suite that only runs on your machine (absolute paths, a manually-created `.env`, missing fixtures).
- Padding the test count with trivial duplicates.
- No README, so the reviewer can't run it at all.

## Stretch Goals (optional)

- Add a GitHub Actions workflow running the suite on every push, with the HTML report as an artifact.
- Shard the suite across workers and report the wall-clock improvement.

## Resources

- [Playwright best practices - the review checklist](https://playwright.dev/docs/best-practices)
- [Playwright: CI](https://playwright.dev/docs/ci-intro)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-18`
2. Put your files in `Sessions/Week-18-Capstone-Project-Review/<YourName>/` — flat, no extra subfolder.
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
