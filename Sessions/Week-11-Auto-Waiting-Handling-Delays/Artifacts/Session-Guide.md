# Auto-Waiting & Handling Delays

**Week 11** · Wed, Oct 07, 2026 · Core · Module 2: Playwright Core
**Session Owner:** Vishal Tyagi - Jr

## Learning Objectives

Playwright auto-waiting mechanism, explicit waiting (`waitForSelector`, `waitForURL`), timeout configurations.

## For Session Owners

- Prepare talking points and any live-demo code around the objectives above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts` folder.
- Review participant submissions in the sibling `../<ParticipantName>/` folders after the session.

## Weekly Assignment (Homework)

1) Automate testing a dynamic loading web page where elements appear after a 3-second delay without using hardcoded timeouts.

2) Add a scenario that waits for a URL change after a navigation action using `waitForURL`, and assert the new page's content.

3) Deliberately set a very short custom timeout on one assertion to force a timeout error, then fix it and document the difference in behavior.

## Submission Instructions

- Save your files inside `Sessions/Week-11-Auto-Waiting-Handling-Delays/<YourName>/` (your own participant folder).
- Use plain, descriptive filenames as instructed above.
- Do not commit `node_modules/` or other generated folders.
