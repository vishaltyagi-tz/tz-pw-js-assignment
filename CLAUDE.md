# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this repo is

`tz-pw-js-assignment` is the **workspace and progress tracker for Taazaa's QA
JavaScript & Playwright test automation training programme** — not an application
and not a test suite. There is nothing to build and no dependencies: the
`package.json` exists only to give the Node scripts documented entry points.

The curriculum is 18 core weekly sessions (Wed, Jul 29 2026 → Wed, Nov 25 2026)
plus 11 self-paced optional sessions (A–K), across four modules:

1. Module 1: JS Fundamentals (W1–W6)
2. Module 2: Playwright Core (W7–W12)
3. Module 3: Test Architecture (W13–W15)
4. Module 4: TypeScript Intro (W16–W18)

Optional sessions cover Git (A, B, C, G), Playwright extras (D, E, F), coding
standards (H), env vars (I), API setup (J), and AI-assisted QA (K). 21
participants submit weekly; the programme owner is Vishal Tyagi.

## The one rule that matters most

**`Session-Guide.md` is the single source of truth for what a session's
assignment is, and it is generated.** Everything downstream — the checker, the
progress board, grading — reads from it.

So:

- To change a session, edit `scripts/session-data.json` and run `npm run guides`.
- Never hand-edit a `Session-Guide.md`; the next generation overwrites it.
- If the material handed out in a session drifts from the guide, **fix the
  guide** so they agree.

That last point is not hypothetical. Weeks 1–2 previously specified different
exercises in the guide than in the `.docx` handouts, so the cohort was graded
against an assignment it was never given — which produced most of the recorded
"gaps" in `progress/`. They have been reconciled; keep them that way.

## Layout

| Path | Purpose |
|---|---|
| `scripts/session-data.json` | **The curriculum source of truth.** Per session: `folder`, `label`, `date`, `type`, `module`, `topic`, `owner`, `concepts`, `prerequisites`, `agenda`, `keyPoints`, `deliverables`, `definitionOfDone`, `commonMistakes`, `resources`, `stretch`, optional `practiceSite` |
| `scripts/roster.json` | **The canonical 21-participant list.** Folder names must match exactly |
| `scripts/generate-session-artifacts.js` | Regenerates every `Session-Guide.md` |
| `scripts/track-progress.js` | Regenerates `PROGRESS.md` (the ✓/- grid) |
| `scripts/check-submissions.js` | Audits submission *quality* against each guide's deliverables |
| `scripts/ensure-participant-folders.js` | Provisions every session × participant folder with a `.gitkeep` |
| `scripts/generate-html-report.js` | Builds `progress/index.html`, the cohort progress board |
| `Sessions/<session>/Artifacts/` | Generated guide + owner material (handouts, practice files, worked examples) |
| `Sessions/<session>/<Participant-Name>/` | Where that participant submits |
| `PROGRESS.md`, `progress/index.html`, `progress/CHECK-REPORT.md` | **All generated** — never hand-edit |
| `progress/SUMMARY.md`, `progress/*.csv` | Hand-written audit narrative and its status history |
| `Sample-Session/` | Template, not a real session |
| `learningScripts/` | Trainer's annotated demo scripts |
| `QA-Playwright-JS-Training-Plan.xlsx` | The master plan (human-facing) |

## Commands

```bash
npm run refresh     # folders → guides → progress → check → report, in order
npm run check       # audit submissions against the guides
npm run report      # rebuild progress/index.html
npm run guides      # rebuild every Session-Guide.md from session-data.json
npm run folders     # create any missing participant folders
npm test            # check --strict; exits 1 if any ERROR-level finding exists
```

All scripts are dependency-free CommonJS and safe to rerun — they overwrite
their outputs wholesale. After any structural change (a rename, a new
participant, a merged submission), run `npm run refresh`.

## The three tracking layers — keep them distinct

1. **`PROGRESS.md`** — generated, quantitative. Any real file counts as ✓. Says
   nothing about correctness.
2. **`progress/CHECK-REPORT.md`** — generated, qualitative. Does the submission
   match the guide's deliverables? ERROR = needs a human decision (possible copy,
   empty file, roster drift). WARN = process drift (missing deliverable, generic
   filename, unexpected subfolder).
3. **`progress/SUMMARY.md` + CSVs** — hand-written judgement: escalations,
   pastoral follow-up, and the `Status` history of past findings.

In the CSVs, findings are **never deleted** — flip `Status` to `Fixed`,
`Withdrawn` (with the reason), or `Revised`. A withdrawn finding is as valuable
as a fixed one: it records that the spec was wrong, not the participant.

## Gotchas

- **Participant folder names are `Firstname-Lastname`, hyphenated**, and must
  match `roster.json`. Drift creates a phantom participant. Critically, macOS's
  case-insensitive filesystem *hides* case drift that git tracks as a separate
  path — `Anas-javed` and `Anas-Javed` looked like one folder locally and two in
  git. When you suspect drift, check with
  `git ls-files Sessions | awk -F/ '{print $3}' | sort -u`, not `ls`.
- **`Artifacts` is a reserved folder name**, skipped by both `track-progress.js`
  and `check-submissions.js`. Homework misfiled there counts as not submitted.
- **Placeholder files never count as submissions** — `.gitkeep`,
  `placeholder.md`, `.DS_Store`, `Thumbs.db`, `~$*`. This matters because 549
  `.gitkeep` files exist to keep empty folders in git; if a script forgets to
  filter them, everyone shows as having submitted everything.
- **Submissions should be flat** in the participant folder. The exception is
  Playwright weeks, where `tests/`, `pages/`, `types/`, `fixtures/` are expected
  — `check-submissions.js` derives the allowed subfolders from each session's
  deliverable paths.
- **Copy detection is a prompt, not a verdict.** `check-submissions.js` flags
  byte-identical code (comments and whitespace stripped, string literals kept).
  A trainer live-coding on screen legitimately produces identical files. Always
  frame these as "worth a look".
- Never commit `node_modules/`, `test-results/`, `playwright-report/`, `.env`,
  Office lock files (`~$*`), or `.DS_Store` — all in `.gitignore`.

## Working in this repo

- **Do not edit participants' submitted files.** Their work under
  `Sessions/<session>/<Name>/` is the assessment record. Report gaps in
  `progress/`; limit yourself to structural housekeeping (moving misfiled files,
  fixing a drifted folder name, deleting a stale folder, removing an empty file),
  and record that housekeeping in the gaps CSV.
- Before concluding a participant is at fault, **check the handout in that
  session's `Artifacts/`**. More than once the material told them to do the thing
  they were being marked down for.
- `README.md` is participant-facing and beginner-level — most of the cohort is
  learning git for the first time here. It documents the branch-and-PR workflow
  the repo actually uses (74+ merged PRs), not direct pushes to `main`.
- Adding a session means: a folder under `Sessions/`, an entry in
  `session-data.json`, then `npm run refresh`.
