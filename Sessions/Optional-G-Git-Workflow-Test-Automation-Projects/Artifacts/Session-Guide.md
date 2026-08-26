# Git Workflow for Test Automation Projects

**Optional Session G** · Self-paced, anytime after Week 12 · Optional · Git & Version Control
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Rebase vs merge, `git stash`, tagging, ignoring Playwright artifacts, commit conventions for test code, undoing safely (`git revert` vs `git reset`).

## Prerequisites

- Optional A, B, C complete
- A Playwright project with some history

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | Merge vs rebase: what each does to history, and when each is safe |
| 15 min | `git stash` for the urgent interruption |
| 15 min | Tagging a known-good suite state |
| 15 min | What a Playwright `.gitignore` must contain |
| 20 min | Undoing: `revert` (safe, public) vs `reset --hard` (destructive, local only) |

## Key Points to Land

- Never rebase a branch someone else has pulled - it rewrites shared history.
- `git revert` creates a new commit undoing an old one. That's the safe public undo.
- `git reset --hard` destroys uncommitted work with no recovery. Know what you're doing.
- `test-results/` and `playwright-report/` are regenerated every run - never commit them.
- Commit test code by intent: `Add negative-path checkout test`, not `update spec`.

## Deliverables

Submit these to `Sessions/Optional-G-Git-Workflow-Test-Automation-Projects/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `.gitignore` | A complete Playwright ignore file: `node_modules/`, `test-results/`, `playwright-report/`, `playwright/.cache/`, `.env`. |
| `stash-notes.md` | The `git stash` / switch / fix / `git stash pop` sequence you ran, with the commands and what each did. |
| `tag-and-revert.md` | The `git tag v1.0-suite` you created, plus a `git revert` you performed and why `reset --hard` would have been wrong there. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `git status` is clean and no generated Playwright folder is tracked
- [ ] `git tag` lists `v1.0-suite`
- [ ] You reverted a commit without rewriting history, and can explain the difference from reset

## Common Mistakes

- `git reset --hard` to 'clean up', losing a day's work.
- Rebasing a pushed branch and then force-pushing over a teammate.
- Committing `playwright-report/` - it makes every PR diff unreadable.
- `git stash` then forgetting it exists. `git stash list` is your friend.

## Stretch Goals (optional)

- Use `git bisect` to find which commit broke a test.

## Resources

- [Pro Git: Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)
- [Pro Git: Stashing](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-g`
2. Put your files in `Sessions/Optional-G-Git-Workflow-Test-Automation-Projects/<YourName>/` — flat, no extra subfolder.
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
