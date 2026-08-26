# Project Config, package.json & npm

**Optional Session D** · Self-paced, anytime after Week 7 · Optional · Module 2: Playwright Core
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`package.json` structure, npm scripts, `node_modules`, dependencies vs devDependencies, semantic versioning, `package-lock.json`.

## Prerequisites

- Week 7 complete - you have a Playwright project

## Session Agenda

| Time | Topic |
|---|---|
| 15 min | Every field in `package.json`, line by line |
| 20 min | npm scripts: writing them, chaining them, `npm run` |
| 15 min | dependencies vs devDependencies - why Playwright is a devDependency |
| 15 min | Semver: what `^1.2.3` actually allows, and why `package-lock.json` exists |
| 15 min | Deleting `node_modules` and reinstalling from the lockfile |

## Key Points to Land

- `node_modules` is disposable and derived - never commit it, always commit `package-lock.json`.
- `^1.2.3` allows any 1.x.y at or above 1.2.3. That's how a green suite breaks overnight.
- Test tooling belongs in `devDependencies` - it isn't needed to run the product.
- npm scripts are the project's documented entry points; a new joiner should need only `npm ci` and `npm test`.

## Deliverables

Submit these to `Sessions/Optional-D-Project-Config/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `package-json-notes.md` | Every section of your `package.json` explained: `name`, `version`, `scripts`, `dependencies`, `devDependencies`. |
| `package.json` | With at least three custom scripts added: `test:smoke` (a `--grep @smoke` run), `test:headed`, and `report`. |
| `npm-notes.md` | What happened when you deleted `node_modules` and ran `npm install`; why it works, and when you'd do it. Include the difference between `npm install` and `npm ci`. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `npm run test:smoke`, `npm run test:headed`, and `npm run report` all execute
- [ ] `node_modules` was deleted and restored successfully
- [ ] You can explain why `package-lock.json` is committed but `node_modules` is not

## Common Mistakes

- Committing `node_modules` (hundreds of MB) or ignoring `package-lock.json` (breaks reproducibility).
- Editing files inside `node_modules` - changes vanish on reinstall.
- Installing Playwright with `-g` instead of into the project.

## Stretch Goals (optional)

- Add a `pretest` script and observe npm running it automatically before `test`.

## Resources

- [npm docs: package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npm docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [Semantic versioning](https://semver.org/)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-d`
2. Put your files in `Sessions/Optional-D-Project-Config/<YourName>/` — flat, no extra subfolder.
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
