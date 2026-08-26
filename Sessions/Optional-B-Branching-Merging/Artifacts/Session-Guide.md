# Branching & Merging

**Optional Session B** · Self-paced, anytime after Week 5 · Optional · Git & Version Control
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

`git branch`, `git switch` / `checkout`, feature branches, `git merge`, understanding and resolving merge conflicts.

## Prerequisites

- Optional A complete - you can commit confidently

## Session Agenda

| Time | Topic |
|---|---|
| 15 min | What a branch actually is (a moving pointer to a commit) |
| 20 min | Creating and switching branches; committing on a branch |
| 20 min | Merging back to `main`; fast-forward vs merge commit |
| 25 min | Creating a conflict on purpose and resolving it by hand |

## Key Points to Land

- A branch is cheap - one pointer. Make one per assignment; that's what this repo's PR flow expects.
- Commit or stash before switching branches, or your changes follow you across.
- A conflict is git telling you two humans changed the same line - only a human can decide.
- Resolve by deleting the `<<<<<<<`, `=======`, `>>>>>>>` markers AND choosing the real content.

## Deliverables

Submit these to `Sessions/Optional-B-Branching-Merging/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `branch-log.txt` | Output of `git log --oneline --graph --all` showing a branch that was created and merged. |
| `conflict-notes.md` | The conflict you created, the markers you saw (paste them), and how you resolved it. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] A branch `feature/arrays-practice` was created, committed on, and merged into `main`
- [ ] The merged change is visible in `main`'s history
- [ ] You created and resolved a real conflict, and no conflict markers remain in any file

## Common Mistakes

- Committing a file that still contains `<<<<<<< HEAD` markers - always re-read the file after resolving.
- Working on `main` by habit. Check `git branch` before you start.
- Deleting a branch before it's merged and losing the work.

## Stretch Goals (optional)

- Try `git merge --abort` mid-conflict to back out, then redo the merge deliberately.

## Resources

- [Pro Git ch. 3: Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
- [learngitbranching.js.org (do the Main levels)](https://learngitbranching.js.org/)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-b`
2. Put your files in `Sessions/Optional-B-Branching-Merging/<YourName>/` — flat, no extra subfolder.
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
