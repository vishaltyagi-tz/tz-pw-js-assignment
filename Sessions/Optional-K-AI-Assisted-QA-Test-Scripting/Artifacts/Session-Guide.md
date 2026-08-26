# AI Tools for Test Automation - Awareness & Judgement

**Optional Session K** · Self-paced, anytime after Week 15 · Optional · AI-Assisted QA & Test Scripting
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

AI assistants for generating/refactoring tests, prompting for test cases and locators, AI-assisted debugging, self-healing locators, limitations & risks, reviewing AI output before committing.

## Prerequisites

- Weeks 7-15 complete - you must know enough to judge the output

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | What AI is genuinely good at here: boilerplate, refactors, explaining an error |
| 20 min | Prompting well: give it the DOM, the framework version, and the convention you follow |
| 20 min | Where it fails: hallucinated selectors, outdated APIs, plausible-but-wrong waits |
| 15 min | Self-healing locators - the idea and the trade-off |
| 20 min | A review discipline: never commit what you can't explain |

## Key Points to Land

- AI writes plausible code, not correct code. Plausible-and-wrong is harder to catch than obviously broken.
- The classic failure is a confidently invented selector that doesn't exist on the page.
- It's often trained on older Playwright - watch for `page.click()` and other pre-locator APIs.
- You are accountable for what you commit. 'The AI wrote it' is not a review response.
- Never paste production credentials, customer data, or proprietary source into a public assistant.

## Deliverables

Submit these to `Sessions/Optional-K-AI-Assisted-QA-Test-Scripting/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/ai-generated.spec.js` | A scenario generated from a plain-English prompt, then manually corrected. Keep the original AI version in a comment block for comparison. |
| `ai-debug-notes.md` | A failing test and its error given to an AI: the suggested fix, whether you applied it, and specifically what it got right and wrong. |
| `ai-reflection.md` | 5-6 sentences on one real risk of trusting AI-generated test code, and the concrete way you verified the suggestion before using it. |
| `prompts.md` | The prompts you used, and how you improved a weak prompt into a good one. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] `ai-generated.spec.js` passes and every line is one you can explain
- [ ] At least one AI error is documented concretely (the invented locator, the outdated API)
- [ ] No credential or proprietary code was pasted into an assistant
- [ ] The reflection names a specific verification step, not 'I checked it'

## Common Mistakes

- Committing AI output that passes for the wrong reason (e.g. a test asserting nothing).
- Accepting a `waitForTimeout` the AI suggested - it's the most common bad advice in this space.
- Trusting an invented `data-testid` that isn't in the DOM.
- Using AI to skip learning the fundamentals, then being unable to debug the result.

## Stretch Goals (optional)

- Ask an assistant to review one of YOUR tests, then judge its findings - which were real and which were noise?

## Resources

- [Playwright MCP server (drive a real browser from an assistant)](https://github.com/microsoft/playwright-mcp)
- [Playwright best practices - your checklist for reviewing AI output](https://playwright.dev/docs/best-practices)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-k`
2. Put your files in `Sessions/Optional-K-AI-Assisted-QA-Test-Scripting/<YourName>/` — flat, no extra subfolder.
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
