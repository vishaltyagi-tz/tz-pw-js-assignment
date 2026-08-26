# DOM Basics & Chrome DevTools

**Optional Session E** · Self-paced, anytime after Week 7 · Optional · Module 2: Playwright Core
**Session Owner:** Self-study

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

DevTools Elements & Console panels, HTML attributes (id, class, data-*), DOM hierarchy, `document.querySelector()`, how this maps to Playwright locators.

## Prerequisites

- Week 7 complete - you've seen locators in CodeGen output

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | The Elements panel: inspecting, the DOM tree, parent/child/sibling |
| 20 min | Attributes that matter for testing: `id`, `class`, `name`, `data-testid`, ARIA roles |
| 20 min | Live-editing HTML/CSS in DevTools to understand rendering |
| 25 min | The Console: `document.querySelector()` / `querySelectorAll()` and CSS selector syntax |
| 15 min | Mapping a CSS selector to the equivalent Playwright locator |

## Key Points to Land

- If you can't select it in the Console, Playwright won't find it either - debug there first.
- `querySelector` returns the FIRST match. A selector matching 12 things is a future flaky test.
- Auto-generated classes like `css-1x2y3z` change on every build. Never target them.
- The accessibility tree is what `getByRole` reads - inspect it, not just the HTML.

## Deliverables

Submit these to `Sessions/Optional-E-DOM-Basics/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `dom-inspection.md` | 5 elements you inspected: tag, key attributes, and position in the DOM hierarchy for each. |
| `selectors.md` | 10 `document.querySelector()` commands you ran, the result of each, and the equivalent Playwright locator beside it. |
| `live-edit-notes.md` | What you changed live in DevTools, what happened, and why it disappeared on reload. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All 5 inspected elements are documented with real attribute values, not placeholders
- [ ] Each of your 10 selectors has a Playwright equivalent written next to it
- [ ] You can explain why a DevTools edit doesn't persist

## Common Mistakes

- Using DevTools 'Copy selector', which produces long brittle paths like `body > div:nth-child(3) > ...`.
- Confusing the Elements panel (live DOM) with View Source (original HTML).
- Assuming an element is missing when it's inside an iframe or a shadow root.

## Stretch Goals (optional)

- Find an element inside an iframe and work out why `document.querySelector` from the top frame can't reach it.

## Resources

- [Chrome DevTools: Elements](https://developer.chrome.com/docs/devtools/dom)
- [MDN: CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [Playwright: Other locators](https://playwright.dev/docs/other-locators)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-e`
2. Put your files in `Sessions/Optional-E-DOM-Basics/<YourName>/` — flat, no extra subfolder.
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
