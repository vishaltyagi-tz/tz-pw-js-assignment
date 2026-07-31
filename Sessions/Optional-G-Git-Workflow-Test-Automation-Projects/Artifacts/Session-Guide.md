# Git Workflow for Test Automation Projects

**Optional Session G** · Self-paced, anytime after Week 12 · Optional · Git & Version Control
**Session Owner:** Self-study

## Learning Objectives

Rebase vs merge, `git stash`, tagging releases, ignoring Playwright artifacts (`test-results/`, `playwright-report/`), commit conventions for test code, undoing mistakes (`git revert`, `git reset`).

## For Session Owners

- Prepare talking points and any live-demo code around the objectives above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts` folder.
- Review participant submissions in the sibling `../<ParticipantName>/` folders after the session.

## Weekly Assignment (Homework)

1) Set up a proper `.gitignore` for a Playwright project (`node_modules/`, `test-results/`, `playwright-report/`, `.env`).

2) Practice `git stash` while mid-way through a test change, switch branches to fix something urgent, then `git stash pop` to resume.

3) Tag a stable commit as `v1.0-suite` using `git tag`, and practice safely undoing a bad commit with `git revert` (not `reset --hard`).

## Submission Instructions

- Save your files inside `Sessions/Optional-G-Git-Workflow-Test-Automation-Projects/<YourName>/` (your own participant folder).
- Use plain, descriptive filenames as instructed above.
- Do not commit `node_modules/` or other generated folders.
