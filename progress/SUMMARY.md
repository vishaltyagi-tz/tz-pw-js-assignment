# Assignment Tracking Summary — Weeks 1–4

_Audited: 2026-08-26. Week 5 runs today, so Week 5 is not yet due._

## How the three layers fit together

| File | Nature | Answers |
|---|---|---|
| `../PROGRESS.md` | Generated | Did they submit anything? (any file = ✓) |
| `CHECK-REPORT.md` | **Generated** | Does what they submitted match the Session Guide? |
| `index.html` | **Generated** | Both of the above, as a shareable board |
| `assignment-status-w1-w4.csv` | Hand-written | Per-participant, per-week verdict |
| `assignment-gaps-w1-w4.csv` | Hand-written | One row per concrete gap, with a Status that keeps history |
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

## Where the cohort actually stands

| | |
|---|---|
| Participants | 21 (the stale `Day1test` folder has been deleted) |
| All four due weeks submitted | 10 |
| Zero submissions in four weeks | 2 — **Purnima Gautam, Shilpa Mattoo** |
| Two or more weeks behind | 4 — Aishwarya (3), Awanti (2), Utkarsh (2), Sumit (W1/W2 backlog) |
| Week 4 submissions | 10 of 21 — still the steepest drop-off (W1: 18, W2: 17, W3: 16) |

The Week 4 drop-off is the real signal in this data. It is not a compliance
problem; it's the week the material got harder.

## Needs a human decision

- **Purnima Gautam, Shilpa Mattoo** — nothing at all in four weeks. Escalate.
- **Possible copied work.** `check-submissions.js` flags nine pairs of
  byte-identical files (ignoring comments and whitespace). Several are probably
  innocent — a trainer typing code on screen during a live session produces
  identical files legitimately. **These are prompts to look, not verdicts.** The
  pairs are in `CHECK-REPORT.md`; the Week 1 Vaishnavi/Aishwarya case from the
  previous audit is the one worth a conversation, since the content matches
  including typos with only the name changed.
- **Generic filenames persist** — `assignment.js`, `practice.js`, `final.js`,
  `misc.js`, `info.js`. Now that every guide has an explicit Deliverables table
  with exact filenames, this should resolve itself from Week 5 on.
- **Remaining nesting** — Jyoti (W2–W4) is the only participant still adding an
  `Assignment/` subfolder where the handout didn't ask for one.

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

## What changes from Week 5 onward

Every session guide now carries an explicit **Deliverables** table (exact
filenames) and a **Definition of Done** checklist that doubles as the grading
rubric. `npm run check` audits submissions against it automatically, so this
document should shrink to genuine judgement calls — escalations, possible
copying, and pastoral follow-up — rather than filename bookkeeping.
