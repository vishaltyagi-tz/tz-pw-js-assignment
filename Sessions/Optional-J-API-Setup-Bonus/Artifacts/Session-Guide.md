# API Testing & Seeding (Bonus)

**Optional Session J** · Self-paced, anytime after Week 15 · Optional · Module 3: Test Architecture
**Session Owner:** Self-study
**Practice site:** https://reqres.in/api or https://jsonplaceholder.typicode.com

> This guide is the single source of truth for this session's assignment.
> Generated from `scripts/session-data.json` — do not edit by hand.

## Learning Objectives

Playwright's `request` context, GET/POST, status and body assertions, seeding test data via API before UI tests, auth tokens, `request` fixture vs `apiRequest.newContext()`.

## Prerequisites

- Week 15 complete
- Optional I recommended (env vars for tokens)

## Session Agenda

| Time | Topic |
|---|---|
| 20 min | Why API setup beats UI setup: 200ms vs 30s, and far less flake |
| 20 min | The `request` fixture: GET, POST, asserting status and body |
| 20 min | Seeding data via API, then verifying it in the UI |
| 20 min | Authenticating via API and reusing the token |

## Key Points to Land

- Never test through the UI what you can set up through the API. Reserve the UI for what you're actually testing.
- `await expect(response).toBeOK()` is the quick health check; assert the body for real verification.
- A token fetched once and reused across tests is the single biggest suite speed-up available.
- API responses are JSON - `await response.json()` and assert on the parsed object.

## Deliverables

Submit these to `Sessions/Optional-J-API-Setup-Bonus/<YourName>/`. Use exactly these filenames — an automated check looks for them.

| File | What it must contain |
|---|---|
| `tests/api-get.spec.js` | A GET request to a public API using the `request` context; log and assert the response. |
| `tests/api-seed.spec.js` | Seed test data via an API call, then verify the result with a UI step. |
| `helpers/auth.js` | A helper that authenticates via API and returns a token for reuse by later requests. |
| `api-notes.md` | What you seeded, why doing it through the UI would have been slower/flakier, and where the token is stored. |

## Definition of Done (grading rubric)

Your submission is complete when every box below is true:

- [ ] All spec files pass
- [ ] Status codes AND response bodies are both asserted
- [ ] No token or credential is hardcoded - they come from environment variables

## Common Mistakes

- Asserting only the status code, so a 200 with an error body passes.
- Forgetting `await response.json()` and asserting on a Promise.
- Hardcoding a bearer token into the spec.
- Seeding data and never cleaning it up, so the suite degrades over time.

## Stretch Goals (optional)

- Use `request.storageState()` to carry an API-authenticated session into the browser and skip UI login entirely.

## Resources

- [Playwright: API testing](https://playwright.dev/docs/api-testing)
- [Playwright: APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext)
- [Free practice API](https://jsonplaceholder.typicode.com)

## Submission Instructions

1. Branch first: `git switch -c <yourname>-optional-session-j`
2. Put your files in `Sessions/Optional-J-API-Setup-Bonus/<YourName>/` — flat, no extra subfolder.
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
