# Test Execution & Debugging

**Week 12** · Wed, Oct 14, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Aruneema

## Learning Objectives

CLI test runner (`npx playwright test`), headed mode, debugging `--debug`, HTML reports, trace viewer.

## For Session Owners

- Prepare talking points and any live-demo code around the objectives above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts` folder.
- Review participant submissions in the sibling `../<ParticipantName>/` folders after the session.

## Weekly Assignment (Homework)

1) Execute a test suite in headless mode, deliberately fail one test, extract the HTML report, open trace viewer, and analyze the root cause.

2) Re-run the same failing test in headed mode with `--debug` and step through it using Playwright Inspector, documenting what caused the failure.

3) Run the full suite with the `--trace on` flag and use the trace viewer to identify the slowest test step.

## Submission Instructions

- Save your files inside `Sessions/Week-12-Test-Execution-Debugging/<YourName>/` (your own participant folder).
- Use plain, descriptive filenames as instructed above.
- Do not commit `node_modules/` or other generated folders.
