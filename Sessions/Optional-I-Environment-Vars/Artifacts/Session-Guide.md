# Environment Vars

**Optional Session I** · Self-paced, anytime after Week 13 · Optional · Module 3: Test Architecture
**Session Owner:** Self-study

## Learning Objectives

Environment configuration using dotenv / .env files, managing secrets, separating config from code, loading environment-specific URLs and credentials.

## For Session Owners

- Prepare talking points and any live-demo code around the objectives above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts` folder.
- Review participant submissions in the sibling `../<ParticipantName>/` folders after the session.

## Weekly Assignment (Homework)

1) Install `dotenv` and create a `.env` file with `BASE_URL`, `USERNAME`, and `PASSWORD` variables for your test project.

2) Refactor an existing test to read credentials from environment variables instead of hardcoded values.

3) Create separate `.env.dev` and `.env.staging` files and document how to switch between environments when running tests.

## Submission Instructions

- Save your files inside `Sessions/Optional-I-Environment-Vars/<YourName>/` (your own participant folder).
- Use plain, descriptive filenames as instructed above.
- Do not commit `node_modules/` or other generated folders.
