# Test Suite Organization & Hooks

**Week 13** · Wed, Oct 21, 2026 · Core · Module 3: Test Architecture
**Session Owner:** Vishal Tyagi - Jr

## Learning Objectives

`test.describe()`, `test.beforeEach()`, `test.afterEach()`, grouping tests logically.

## For Session Owners

- Prepare talking points and any live-demo code around the objectives above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts` folder.
- Review participant submissions in the sibling `../<ParticipantName>/` folders after the session.

## Weekly Assignment (Homework)

1) Refactor existing login & checkout scripts into structured `test.describe` blocks sharing common `beforeEach` navigation logic.

2) Add an `afterEach` hook that logs the test name and status (pass/fail) after every test.

3) Add a `test.beforeAll`/`test.afterAll` pair to set up and tear down any shared test data, and explain in a comment how their scope differs from `beforeEach`/`afterEach`.

## Submission Instructions

- Save your files inside `Sessions/Week-13-Test-Suite-Organization-Hooks/<YourName>/` (your own participant folder).
- Use plain, descriptive filenames as instructed above.
- Do not commit `node_modules/` or other generated folders.
