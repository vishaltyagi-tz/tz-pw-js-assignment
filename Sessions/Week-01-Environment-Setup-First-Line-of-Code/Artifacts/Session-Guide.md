# Environment Setup & First Line of Code

**Week 1** · Wed, Jul 29, 2026 · Core · Module 1: JS Fundamentals
**Session Owner:** Vishal Tyagi

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Node.js, VS Code setup, terminal usage, console.log(), execution flow.

## Prerequisites

- Windows 10/11 or macOS, admin rights to install software, ~5 GB free disk
- A stable internet connection

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | Install & verify Node.js LTS (`node -v`, `npm -v`) and VS Code |
| 15 min | VS Code tour: integrated terminal, extensions, useful shortcuts |
| 20 min | Terminal navigation: `cd`, `ls`/`dir`, creating a project folder |
| 25 min | First script: `console.log()`, running `node hello.js` |
| 20 min | Top-to-bottom execution flow; reading an error message on purpose |

## Key Points to Land

- Node runs a file top to bottom, one statement at a time - nothing is 'called' for you.
- `console.log()` prints and then execution continues; it does not stop the script.
- Always run scripts from the folder the file lives in, or pass the right relative path.
- Read errors from the LAST line up: the message tells you what, the trace tells you where.

## Deliverables

Submit these to `Sessions/Week-01-Environment-Setup-First-Line-of-Code/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `hello.js` | A welcome message, your name, and your role - three `console.log()` calls. |
| `intro.js` | Prints: `Hello Everyone!` / `My Name is ___` / `I am learning Node.js` / `Today's date is ___` / `Thank You` |
| `profile.js` | Your name, role, city, and one learning goal - separate `console.log()` calls. |
| `numbers.js` | Print any five numbers. Write your predicted output as a comment BEFORE running. |
| `favorite.js` | Your favourite programming language, tool, and learning resource. |
| `courseName.js` | A variable `courseName = "Node.js Training"`, printed with `console.log()`. |
| `fullName.js` | Variables `firstName`, `lastName`, `city` printed in one readable line. |
| `sequence.js` | Print `Step 1`, `Step 2`, `Step 3`, `Done` - then note the execution order in a comment. |
| `types.js` | One string, one number, and one boolean value. |
| `message.js` | A welcome message built from at least three separate `console.log()` calls. |
| `syntaxError.js` | Introduce one deliberate syntax error, run it, paste the error text in a comment, then fix it. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `node -v` and `npm -v` both print a version
- [ ] Every file above runs with `node <file>.js` and produces output with no crash
- [ ] `numbers.js` and `sequence.js` each contain your prediction/observation comment
- [ ] `syntaxError.js` contains the original error message AND the working fix

## Common Mistakes

- `node is not recognized` - Node isn't on PATH. Restart the terminal, then the machine, then reinstall.
- `Cannot find module` - you're in the wrong folder. `cd` into the folder holding the file.
- Running `node hello` instead of `node hello.js`.
- Using a word processor instead of VS Code, which inserts smart quotes that JS can't parse.

## Stretch Goals (optional)

- Run a file from a different directory using a relative path (`node ../week01/hello.js`).
- Try `node` with no arguments to open the REPL, evaluate `2 + 2`, then exit with `.exit`.

## Resources

- [Node.js downloads (take LTS, not Current)](https://nodejs.org)
- [VS Code downloads](https://code.visualstudio.com)
- [MDN: console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static)
- Participant handout in this folder — `Basic-Setup.docx`

## Submission Instructions

1. Branch first: `git switch -c <yourname>-week-1`
2. Put your files in `Sessions/Week-01-Environment-Setup-First-Line-of-Code/<YourName>/` — flat, no extra subfolder.
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
