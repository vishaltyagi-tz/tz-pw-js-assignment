# Playwright Setup & CodeGen Intro

**Week 7** · Wed, Sep 09, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Hritik
**Practice site:** https://www.saucedemo.com (user `standard_user` / `secret_sauce`)

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`npm init playwright@latest`, project structure, `playwright.config`, running tests, `npx playwright codegen`, the HTML report.

## Prerequisites

- Week 6 complete - you understand `async` / `await`
- Node.js LTS installed and working (`node -v`)

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | `npm init playwright@latest` walkthrough; what each prompt means |
| 20 min | Project tour: `tests/`, `tests-examples/`, `playwright.config.js`, `package.json` |
| 15 min | Running tests: headless, `--headed`, `--project=chromium`, `--ui` |
| 25 min | CodeGen live: recording a login and search on SauceDemo |
| 20 min | Cleaning up generated code - why you never commit CodeGen output raw |
| 20 min | Reading the HTML report |

## Key Points to Land

- CodeGen is a starting point, not a deliverable. It over-records and picks brittle locators.
- `baseURL` in the config lets your tests say `page.goto('/')` instead of a full URL.
- `headless: true` is the default and the right choice for CI; `--headed` is for humans debugging.
- `retries` hides flakiness - useful in CI, dangerous as a substitute for fixing a real race.
- Never commit `node_modules/`, `test-results/`, or `playwright-report/`.

## Deliverables

Submit these to `Sessions/Week-07-Playwright-Setup-CodeGen-Intro/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/login-search.spec.js` | A CodeGen recording of login + product search on SauceDemo, cleaned up: no redundant clicks, meaningful test name. |
| `tests/checkout.spec.js` | A second CodeGen flow - add to cart and complete checkout - also cleaned up. |
| `config-notes.md` | What `baseURL`, `headless`, `retries`, `timeout`, and `projects` each control in `playwright.config.js`, in your own words. |
| `codegen-cleanup.md` | Paste 5 lines CodeGen generated that you deleted or rewrote, and say why for each. |
| `.gitignore` | Must exclude `node_modules/`, `test-results/`, `playwright-report/`, `playwright/.cache/`. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `npx playwright test` runs both spec files green from a clean checkout after `npm install`
- [ ] `npx playwright show-report` opens a report with both tests passing
- [ ] No `node_modules/`, `test-results/`, or `playwright-report/` in your commit
- [ ] Both spec files are readable - a colleague could tell what each test does from the test name alone

## Common Mistakes

- Committing `node_modules/` - write `.gitignore` before your first `git add`.
- Leaving CodeGen's `page.getByRole('cell', { name: '...' }).nth(3)` style locators in place.
- Running `npx playwright test` from the wrong folder (no config found).
- Skipping `npx playwright install` and getting a 'browser not found' error.

## Stretch Goals (optional)

- Run the same spec against `--project=firefox` and `--project=webkit` and note any difference.
- Try `npx playwright test --ui` and explore the time-travel view.

## Resources

- [Playwright: Installation](https://playwright.dev/docs/intro)
- [Playwright: Test generator (CodeGen)](https://playwright.dev/docs/codegen)
- [Playwright: Configuration](https://playwright.dev/docs/test-configuration)
- [Practice site](https://www.saucedemo.com)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-7`
2. Put your files in `Sessions/Week-07-Playwright-Setup-CodeGen-Intro/<YourName>/` — flat, no extra subfolder.
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
