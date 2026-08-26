# Git Basics & Local Workflow

**Optional Session A** · Self-paced, anytime after Week 1 · Optional · Git & Version Control
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Why version control matters, installing Git, `git init`, `git status`, `git add`, `git commit`, `git log`, writing good commit messages, `.gitignore` basics.

## Prerequisites

- Week 1 complete (you have some `.js` files to commit)
- Git installed (`git --version`)

## Session Agenda

| Time | Topic |
|---|---|
| 15 min | What problem version control solves; the three states (working tree / staging / commit) |
| 15 min | `git config` your name and email; `git init` a repo |
| 25 min | The core loop: `git status` -> `git add` -> `git commit` -> `git log` |
| 15 min | Writing a commit message someone else can read |
| 10 min | `.gitignore`: what never belongs in a repo |

## Key Points to Land

- A commit is a snapshot, not a diff you can half-apply. Commit one logical change at a time.
- `git add` stages; `git commit` records. Staging exists so you can commit part of your work.
- `git status` is the answer to almost every 'what's going on?' moment - run it constantly.
- A good message says WHY: `Add password validator with length rule`, not `changes`.

## Deliverables

Submit these to `Sessions/Optional-A-Git-Basics-Local-Workflow/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `git-log.txt` | Paste the output of `git log --oneline` showing at least 4 commits. |
| `.gitignore` | Excludes `node_modules/` and any local config; commit it. |
| `notes.md` | In your own words: what staging is for, and one commit message you rewrote and why. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `git config user.name` and `user.email` both return your values
- [ ] At least 4 commits exist, each a single logical change with a readable message
- [ ] `git status` is clean at the end (nothing uncommitted, nothing untracked that matters)

## Common Mistakes

- `git add .` sweeping in `node_modules/` - write `.gitignore` FIRST.
- One giant commit at the end of the day. Commit as you finish each piece.
- Commit messages like `update`, `fix`, `asdf` - useless in six weeks' time.

## Stretch Goals (optional)

- Use `git diff` and `git diff --staged` and explain the difference in `notes.md`.
- Try `git commit --amend` to fix the most recent commit message.

## Resources

- [Pro Git, chapters 1-2 (free)](https://git-scm.com/book/en/v2)
- [Interactive visual tutorial](https://learngitbranching.js.org/)
- [gitignore templates](https://github.com/github/gitignore)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-a`
2. Put your files in `Sessions/Optional-A-Git-Basics-Local-Workflow/<YourName>/` — flat, no extra subfolder.
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
