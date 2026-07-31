# Assertions & Verification

**Week 10** · Wed, Sep 30, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Hritik

## Learning Objectives

Expect assertions (`toHaveTitle`, `toBeVisible`, `toHaveText`, `toContainText`, `toBeEnabled`).

## For Session Owners

- Prepare talking points and any live-demo code around the objectives above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts` folder.
- Review participant submissions in the sibling `../<ParticipantName>/` folders after the session.

## Weekly Assignment (Homework)

1) Write a login test suite covering 3 scenarios (Success, Invalid Password, Blank Username) with explicit `expect()` assertions for each.

2) Add a 4th scenario for a locked-out/disabled user and assert the error banner text using `toContainText`.

3) Add assertions that check the submit button's enabled/disabled state (`toBeEnabled`/`toBeDisabled`) before and after filling the form.

## Submission Instructions

- Save your files inside `Sessions/Week-10-Assertions-Verification/<YourName>/` (your own participant folder).
- Use plain, descriptive filenames as instructed above.
- Do not commit `node_modules/` or other generated folders.
