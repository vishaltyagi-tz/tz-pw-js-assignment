# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this repo is

`tz-pw-js-assignment` is the **workspace and progress tracker for Taazaa's QA
JavaScript & Playwright test automation training program** — not an application
and not a test suite. There is no `package.json`, no dependencies, and nothing
to build. Everything here is either curriculum content, participant homework
submissions, or Node scripts that generate reports from the folder structure.

The curriculum is 18 core weekly sessions (Wed, Jul 29 2026 → Wed, Nov 25 2026)
plus 11 self-paced optional sessions (A–K), organized into four modules:

1. Module 1: JS Fundamentals (W1–W6)
2. Module 2: Playwright Core (W7–W12)
3. Module 3: Test Architecture (W13–W15)
4. Module 4: TypeScript Intro (W16–W18)

Optional sessions cover Git & version control (A, B, C, G), Playwright extras
(D, E, F), coding standards (H), env vars (I), API setup (J), and AI-assisted
QA (K). Roughly 21 participants submit weekly; the program owner is Vishal Tyagi.

## Layout

| Path | Purpose |
|---|---|
| `QA-Playwright-JS-Training-Plan.xlsx` | Master training plan — the human source of the agenda, owners, objectives, and homework |
| `scripts/session-data.json` | **The machine source of truth for the curriculum.** One object per session: `folder`, `label`, `date`, `type`, `module`, `topic`, `owner`, `concepts`, `assignment` |
| `scripts/generate-session-artifacts.js` | Regenerates every `Sessions/*/Artifacts/Session-Guide.md` from `session-data.json` |
| `scripts/track-progress.js` | Scans `Sessions/` and rewrites `PROGRESS.md` — a participant × session ✓/- grid |
| `Sessions/<Week-NN-Topic>/` or `<Optional-X-Topic>/` | One folder per session |
| `Sessions/<session>/Artifacts/` | Session-owner material: generated `Session-Guide.md` plus any slides/docs/sample code |
| `Sessions/<session>/<Participant-Name>/` | Where that participant commits their homework for that session |
| `PROGRESS.md` | **Generated** — do not hand-edit; rerun `track-progress.js` |
| `progress/SUMMARY.md`, `progress/*.csv` | **Hand-written audit** of submission *quality* (see below) |
| `Sample-Session/` | Template, not a real session. Exists so participants see their own named folder right after cloning (Git can't track empty dirs) |
| `learningScripts/` | Trainer's annotated demo scripts (e.g. `js-intro.js`) |

## The two tracking layers — keep them distinct

- `PROGRESS.md` is **quantitative and generated**: any file in a participant's
  folder counts as a ✓. It says nothing about whether the work is correct.
- `progress/` is **qualitative and hand-authored**: it audits whether what was
  submitted actually matches the assignment in the Session Guide.
  - `assignment-status-w1-wN.csv` — one row per participant, per-week verdict.
  - `assignment-gaps-w1-wN.csv` — one row per concrete gap, with a `Status`
    column (`Open` / `Fixed`). Fixed items **stay on the record** — flip the
    status, never delete the row.
  - `SUMMARY.md` — headline numbers, cohort-wide gaps worth one announcement,
    and per-person follow-ups.

The filesystem under `Sessions/` is the source of truth for both. When the audit
range extends (e.g. Weeks 1–5), create new `*-w1-w5.csv` files rather than
silently rewriting history, and carry forward the `Fixed` rows.

## Common tasks

```bash
# After editing scripts/session-data.json (agenda, owner, homework changes):
node scripts/generate-session-artifacts.js

# After participants push submissions, or after folder housekeeping:
node scripts/track-progress.js
```

Both scripts are dependency-free Node CommonJS and safe to rerun — they
overwrite their outputs wholesale.

## Conventions and gotchas

- **Participant folder names use hyphens**: `Amrendra-Raj`, not `Amrendra Raj`.
  Drift (a space, a typo, a differing capitalization) creates a *second*
  phantom participant in `PROGRESS.md`. When you see a duplicate row in the
  grid, suspect folder-name drift first.
- **`Artifacts` is a reserved folder name.** `track-progress.js` skips it when
  collecting participants and when checking for submissions, so misfiled
  homework inside `Artifacts/` counts as *not submitted*. Move it into the
  participant's folder.
- **Submissions should be flat** in the participant folder — no `Assignment/`
  subfolder — with descriptive filenames matching the assignment (`hello.js`,
  `about-me.js`), not `assignment.js` / `practice.js` / `final.js`.
- **Empty committed files still count as ✓** in `PROGRESS.md`. The `progress/`
  audit is what catches them.
- Stale test folders (e.g. `Day1test`) inflate the participant count — delete
  them, then regenerate.
- Never commit `node_modules/`, `test-results/`, `playwright-report/`, or `.env`
  (already covered by `.gitignore`).

## Working in this repo

- Prefer editing `scripts/session-data.json` and regenerating over editing a
  `Session-Guide.md` by hand — hand edits are lost on the next generation.
- **Do not edit participants' submitted files.** Their work under
  `Sessions/<session>/<Name>/` is the assessment record. Report gaps in
  `progress/`; only do structural housekeeping (moving misfiled files into the
  right folder, renaming a drifted folder, deleting a stale one), and note that
  housekeeping in the gaps CSV.
- When a curriculum inconsistency shows up (e.g. a Session Guide's named
  variables not matching the practice file in `Artifacts/`), fix
  `session-data.json` so guide and material agree, rather than patching one side.
- `README.md` is participant-facing (SSH setup, clone, everyday Git workflow).
  Keep instructions there beginner-level — most of the cohort is learning Git
  for the first time in this program.
