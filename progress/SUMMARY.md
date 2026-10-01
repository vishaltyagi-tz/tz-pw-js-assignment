# Assignment Tracking Summary — Weeks 1–5

_Audited: 2026-09-09 (previous audit 2026-08-26). Weeks 1–5 are due. Week 6
(Async/Await), originally Wed Sep 02, was postponed one week to today — so W6
onward is not yet due, and W6–W18 have slid by seven days (programme now ends
Wed Dec 02 2026)._

## Read this first: Week 5 did not happen

**Only 2 of 21 participants submitted the Aug 26 Arrays & Loops assignment**, two
weeks on — Vikas Shukla (all five deliverables, correct) and Sumit Dhage (two
files, from the practice file). Every otherwise-reliable submitter has an empty
Week-05 folder: Shubham, Abhishek, Debasish, Deepali, Jyoti, Om, Nikhil, Viraj.

A drop from 12 submitters in W4 to 2 in W5 is not a difficulty curve — ten of
those twelve had never missed a week before. The most likely explanation is that the
assignment was never communicated: the W5 handout sets ten free-form exercises
and names no files, the guide requires five specific filenames, and the guide's
own resources list did not point at the practice file the deliverables were
derived from. **Reissue Week 5 with an explicit due date before treating any of
this as non-submission.**

## How the three layers fit together

| File | Nature | Answers |
|---|---|---|
| `../PROGRESS.md` | Generated | Did they submit anything? (any file = ✓) |
| `CHECK-REPORT.md` | **Generated** | Does what they submitted match the Session Guide? |
| `index.html` | **Generated** | Both of the above, as a shareable board |
| `assignment-status-w1-w5.csv` | Hand-written | Per-participant, per-week verdict |
| `assignment-gaps-w1-w5.csv` | Hand-written | One row per concrete gap, with a Status that keeps history |
| this file | Hand-written | The narrative: what needs a decision |

Regenerate the first three with `npm run refresh`. The source of truth for all of
them is the filesystem under `Sessions/`.

The two CSVs are now largely superseded by `CHECK-REPORT.md`, which finds the
same mechanical problems automatically. They are kept because they carry the
`Status` history — including which findings turned out to be invalid.

## The correction that matters most

**Weeks 1 and 2 were being graded against an assignment the cohort was never
given.** The generated `Session-Guide.md` and the `.docx` handed out in the
session specified different exercises. The handouts were what participants
actually received, so the guides were wrong, not the submissions.

That accounts for three of the four "cohort-wide gaps" recorded in the previous
audit, all now withdrawn:

1. **"No screenshots anywhere."** The Week 1 handout never asked for one. The
   requirement existed only in the generated guide.
2. **"Template literals were skipped."** The Week 2 handout has a whole section
   teaching concatenation with `+`, and never mentions backticks. The cohort did
   exactly what the material taught. Template literals are now a stretch goal.
3. **"Week 2 used off-spec variables."** The handout names `studentName`,
   `birthYear`, `marks`, `totalPrice`. The guide named `appUrl` and `maxTimeout`.
   Everyone except Amrendra followed the handout — correctly.

Similarly, **the Week 1 nesting findings are withdrawn**: the handout's final
instruction is *"Create a folder named `assignment`, place all assignment files
inside it."* Jyoti, Vikas, Nikhil and Deepali were following the material. Five
other participants had that nesting "corrected" in an earlier round of
housekeeping — which was, in hindsight, correcting them for compliance.

`scripts/session-data.json` has been reconciled to the handouts, so the guide is
now the single source of truth and this class of false gap can't recur.

One cohort-wide gap **survives** the correction: the `const` reassignment demo
(Week 2, question 2) is genuinely in the handout and is missing for 10 of 18
submitters.

**The same drift recurred in Weeks 3–5**, which the reconciliation did not
reach:

- **Week 5** — handout sets ten free-form exercises (cities, prices, colours,
  mobile brands) and names no files; the guide requires `products.js`,
  `arrayMutation.js`, `countMatches.js`, `loopComparison.js`, `testDataLoop.js`.
  Those five do map 1:1 onto `arrays-loops-practice.js` exercises 2/4/5/3/7, but
  the guide never referenced that file. **Fixed 2026-09-09** — the practice file
  and handout are now in the guide's resources, matching the W4 precedent, and
  the handout (mistitled *"Week 2"*) has been renamed.
- **Week 3** — the handout is a concepts document with **no assignment section
  at all**, so its six required filenames were never handed out. This produces
  24 of the report's "missing 6 of 6 required file(s)" findings. Needs a
  decision: reconcile the guide down to what was taught, or reissue.
- **Week 4** — content is aligned (the practice file matches the deliverables)
  but the six filenames were never handed out either; most participants
  delivered the same logic in three files.

Do not mark participants down against Weeks 3–5 filenames.

## Where the cohort actually stands

| | |
|---|---|
| Participants | 21 |
| All five due weeks submitted | 1 — Vikas Shukla |
| Zero submissions in five weeks | 2 — **Purnima Gautam, Shilpa Mattoo** |
| Two or more weeks behind | 4 — Aishwarya (W2–W5), Awanti (W3–W5), Utkarsh (W3–W5), Sumit (W1/W2 backlog) |
| Submissions by week | W1: 18, W2: 17, W3: 16, W4: 12, **W5: 2** |

Week 4 recovered since the last audit — Avinash, Debasish and Sumit have filed,
taking it from 10 to 12. The nine still outstanding for W4 are Aishwarya,
Akshay, Amruta, Anas, Awanti, Purnima, Shilpa, Utkarsh and Vaishnavi.

Week 5 is the anomaly, and for the reasons above it should be read as a
communication failure rather than a participation one.

## Needs a human decision

- **Reissue Week 5** with an explicit due date. See the top of this document.
- **Purnima Gautam, Shilpa Mattoo** — nothing at all in five weeks. Escalate.
- **Possible copied work — four clusters.** These are prompts to look, not
  verdicts; a trainer live-coding on screen legitimately produces identical
  files. But two of these were checked against the handed-out material and did
  not come from it, and both share a *bug* as well as the code, which
  coincidence does not explain:

  | Cluster | Weeks | Why it stands out |
  |---|---|---|
  | **Abhishek Kumbhar ↔ Om Menkudale** | W3 (+W4) | All three W3 files byte-identical, including the requirement pasted as a comment and `let usertype="tester"` — lowercase, so both print `No permission granted`. W3 has no practice file to copy from. W4 `arrowfunctions.js` shares 5 comment lines. |
  | **Abhishek Kumbhar ↔ Shubham Saraswat** | W4 | `isValidPassword.js` byte-identical including the bespoke strings `"Taazaa@2026"` / `"pass1234"`. The practice file uses different strings and requires an 8–20 range; both omit the `<=20` bound identically. |
  | **Anas Javed ↔ Avinash Singh** | W1–W3 | Five flags across three consecutive weeks. Any one arithmetic exercise could converge; the run is the concern. |
  | **Utkarsh Neb ↔ Vaishnavi Kurhade** | W2 | Identical arithmetic, same `console.log(num1,"+",...)` style. Vaishnavi's second cluster — she is already flagged W1 against Aishwarya Thakur. |

  Suggested handling: ask each pair to walk through the shared file live. For
  Abhishek/Om, ask why `useraccess.js` prints `No permission granted`; for
  Abhishek/Shubham, ask where the upper length bound went. Neither can be
  answered by someone who did not write the code.
- **Deliberate-error exercises are not being run.** 28 findings across W1–W5 of
  "no runtime or compiler message appears anywhere in the submission". The
  syntax-error, `const`-reassignment and off-by-one exercises exist to be *run*
  and the output pasted. Worth restating in session rather than marking down.
- **Generic filenames persist** — `assignment.js`, `practice.js`, `final.js`,
  `misc.js`, `info.js`. Now that every guide has an explicit Deliverables table
  with exact filenames, this should resolve itself from Week 5 on.
- **Remaining nesting** — Jyoti (W2–W4) is the only participant still adding an
  `Assignment/` subfolder where the handout didn't ask for one.
- **Vaishnavi Kurhade W2** — `Assignment2.js` and `assignmentarithmatic.js` are
  the same content under two names; one should be removed.

## Housekeeping completed 2026-09-09

- **Week 6 postponement applied.** W6–W18 shifted by seven days in
  `scripts/session-data.json`; all 29 guides regenerated; the date range in
  `CLAUDE.md` updated to end Wed Dec 02 2026.
- **Week 5 guide reconciled** to its handed-out material (practice file and
  handout added to resources).
- **Week 5 handout renamed** — it was titled *"PW Training Week 2 JavaScript
  Arrays and Loops.docx"* while sitting in the Week 5 folder.
- **Both CSVs renamed** `…-w1-w4.csv` → `…-w1-w5.csv` and given a Week 5 column.

## Housekeeping completed 2026-08-26

- **Three folder-name collisions resolved.** `Anas-javed`, `deepali-bhatnagar`
  and `Amrendra Raj` (with a space) were separate people as far as git was
  concerned, though macOS's case-insensitive filesystem hid two of them. They
  would have produced phantom rows in `PROGRESS.md` on any Linux machine.
- **Amruta Zargad unblocked.** She had folders in only 3 of 29 sessions and
  literally could not submit for the other 26. All 21 participants now have all
  29 folders, provisioned by `scripts/ensure-participant-folders.js`.
- **`Day1test` deleted** — the roster is 21 again.
- **Five empty committed files removed**, two extensionless files given `.js`,
  a committed Word lock file removed, and a leaked `placeholder.md` that was
  falsely counting as a Week 1 submission.

## What changes from Week 6 onward

Every session guide carries an explicit **Deliverables** table (exact filenames)
and a **Definition of Done** checklist that doubles as the grading rubric, and
`npm run check` audits against it automatically.

Week 5 shows that is not sufficient on its own. The guide was correct and still
almost nobody submitted, because **the guide is not what gets handed out in the
room.** Before each session from Week 6 on, confirm one thing: that the material
actually given to participants names the files the guide will grade. The check
script cannot detect this — it only ever sees the guide.
