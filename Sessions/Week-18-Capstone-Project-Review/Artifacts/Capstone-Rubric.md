# Week 18 — Capstone Rubric & Submission Checklist

Companion to `Session-Guide.md`. This is how your capstone is assessed. Read it
in **Week 15**, not Week 17 — several items can't be retrofitted in a weekend.

## The one-command test

Your submission is judged first on this, from a clean clone of your repo:

```bash
npm ci
npx playwright install
npm test
```

If that doesn't go green with no manual steps, nothing else in this rubric gets
looked at yet. The most common failures are an absolute path, a `.env` that only
exists on your laptop (commit a `.env.example`), and a missing fixture file.

## Scoring

| Area | Weight | What earns full marks |
|---|---|---|
| **Runs from a clean clone** | 20% | The three commands above pass, first try, no README archaeology |
| **Framework structure** | 20% | `pages/`, `tests/`, `types/`, `fixtures/` used consistently; no locator strings in any spec |
| **Test quality** | 20% | Every test has a meaningful assertion; negative paths covered; names describe behaviour |
| **TypeScript** | 15% | `npx tsc --noEmit` clean; no stray `any`; test data typed by interfaces |
| **Stability** | 15% | `--repeat-each=2` passes; no `waitForTimeout`; tests pass alone and in any order |
| **Documentation** | 10% | README lets a stranger install, run, filter, and view the report |

Ten clear, independent tests score better than forty copy-pasted ones. Padding
the count is visible and costs marks.

## Hard fails

Any of these caps the submission regardless of everything else:

- [ ] `node_modules/`, `test-results/`, or `playwright-report/` committed
- [ ] A real credential or token committed
- [ ] `test.only` left in the suite (it silently skips everything else)
- [ ] A test with no assertion
- [ ] The suite doesn't run without editing a file by hand

## Pre-submission checklist

Run every one of these from your project root:

```bash
npx tsc --noEmit                             # must be clean
npx playwright test                          # must be green
npx playwright test --repeat-each=2          # must be green twice
npx playwright test --workers=1              # order independence
grep -rn "waitForTimeout" tests/ pages/      # must return nothing
grep -rn "test.only" tests/                  # must return nothing
grep -rnE "getBy|locator\(" tests/           # must return nothing (locators live in pages/)
git status --short                           # nothing generated, nothing secret
```

Then, from a fresh clone in a different folder, run the one-command test above.

## What the README must answer

1. What application does this suite test, and what does it cover?
2. `npm ci && npx playwright install` — the exact install steps.
3. How to run everything, one file, one test, and a tagged subset.
4. How to view the HTML report.
5. Any environment variables needed, and where to get values (`.env.example`).
6. The folder structure, in five lines.
7. **Known limitations** — what isn't covered, and what you'd do with more time.

Point 7 is not a confession, it's a senior signal. Naming the gap you chose to
leave is a stronger answer than pretending there isn't one.

## The presentation (5-10 minutes)

1. **Structure** (2 min) — walk the folders, show one page object and one spec.
2. **One interesting bug** (3 min) — a real defect your suite caught, or a flaky
   test you diagnosed. What was the symptom, how did the trace help, what was
   the cause?
3. **One improvement** (2 min) — what you'd build with another week, and why that
   one before anything else.
4. **Questions** (2 min).

The bug story is the part people remember. Pick the one where the trace viewer
showed you something you'd have never guessed from the error message.
