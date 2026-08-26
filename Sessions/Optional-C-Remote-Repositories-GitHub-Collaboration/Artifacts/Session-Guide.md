# Remote Repositories & GitHub Collaboration

**Optional Session C** · Self-paced, anytime after Week 7 · Optional · Git & Version Control
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`git remote`, `git push` / `git pull`, cloning, forking, Pull Requests, code review basics.

## Prerequisites

- Optional A and B complete
- A GitHub account with an SSH key set up (see the repo README)

## Session Agenda

| Time | Topic |
|---|---|
| 15 min | Local vs remote; what `origin` means |
| 20 min | Creating a GitHub repo and pushing an existing local project |
| 20 min | Cloning into a second folder to simulate a teammate |
| 25 min | Opening a Pull Request; what a reviewer looks for |
| 15 min | Merging, then pulling the merge back down |

## Key Points to Land

- `git push` only sends committed work. Uncommitted changes stay on your machine.
- A PR is a request for review, not a delivery mechanism - the conversation is the point.
- Small PRs get reviewed; 40-file PRs get rubber-stamped. This is why one PR per assignment.
- After a PR merges, `git pull` on `main` locally or your next branch starts from stale code.

## Deliverables

Submit these to `Sessions/Optional-C-Remote-Repositories-GitHub-Collaboration/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `pr-link.md` | The URL of a Pull Request you opened, plus a paste of the review comment you left on it. |
| `remote-notes.md` | In your own words: the difference between `git fetch`, `git pull`, and `git push`. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] Your Playwright project is pushed to a GitHub repo you own
- [ ] You opened a PR from a branch, left at least one review comment, and merged it
- [ ] You pulled the merged result back into your original local clone

## Common Mistakes

- Pushing to `main` directly out of habit - this repo uses a branch + PR per assignment.
- `git push` rejected because someone else pushed first. Fix: `git pull --rebase`, then push.
- Committing secrets (a `.env`, a token) - once pushed, treat it as leaked and rotate it.

## Stretch Goals (optional)

- Enable branch protection on your repo requiring one approving review, then try to push straight to `main`.

## Resources

- [GitHub: About Pull Requests](https://docs.github.com/en/pull-requests)
- [Pro Git ch. 2.5: Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)
- This repo's README - SSH setup and the everyday workflow — `../../README.md`

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-c`
2. Put your files in `Sessions/Optional-C-Remote-Repositories-GitHub-Collaboration/<YourName>/` — flat, no extra subfolder.
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
