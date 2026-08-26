# Environment Variables & Config Management

**Optional Session I** · Self-paced, anytime after Week 13 · Optional · Module 3: Test Architecture
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`dotenv`, `.env` files, managing secrets, separating config from code, environment-specific URLs and credentials, `.env.example`.

## Prerequisites

- Week 13 complete

## Session Agenda

| Time | Topic |
|---|---|
| 15 min | Why credentials in a spec file is a security incident waiting to happen |
| 20 min | Installing `dotenv` and loading it in `playwright.config.js` |
| 20 min | Refactoring hardcoded values out of tests |
| 20 min | Per-environment files and switching between them |
| 10 min | `.env.example` - documenting what's needed without leaking values |

## Key Points to Land

- `.env` is NEVER committed. `.env.example` with dummy values always is.
- A secret committed once is leaked forever - rotate it, don't just delete the file.
- Load `dotenv` in `playwright.config.js` so config and tests both see the values.
- Give every env var a sensible default or fail loudly - a silent `undefined` URL is a confusing failure.

## Deliverables

Submit these to `Sessions/Optional-I-Environment-Vars/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `.env.example` | Committed, listing `BASE_URL`, `TEST_USERNAME`, `TEST_PASSWORD` with placeholder values. |
| `playwright.config.js` | Loading `dotenv` and using `process.env.BASE_URL` for `baseURL`. |
| `tests/env-login.spec.js` | An existing test refactored to read credentials from environment variables instead of hardcoded strings. |
| `env-notes.md` | How to switch between `.env.dev` and `.env.staging` when running tests, with the exact commands. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] No credential appears anywhere in committed code
- [ ] `.env` is in `.gitignore`; `.env.example` IS committed
- [ ] The suite runs against two different environments by changing only the env file
- [ ] A missing required variable produces a clear error, not `undefined`

## Common Mistakes

- Committing `.env`. Check `git status` before every commit.
- Loading `dotenv` inside a spec file instead of the config, so `baseURL` stays undefined.
- `process.env.PORT` being a string when you needed a number.

## Stretch Goals (optional)

- Add a config-validation step that throws a readable error listing every missing variable at startup.

## Resources

- [dotenv](https://github.com/motdotla/dotenv)
- [Playwright: Parameterize with env files](https://playwright.dev/docs/test-parameterize#passing-environment-variables)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-i`
2. Put your files in `Sessions/Optional-I-Environment-Vars/<YourName>/` — flat, no extra subfolder.
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
