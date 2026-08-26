# Assignment Tracking Summary — Weeks 1–4

_Audited: 2026-08-26 (Week 5 runs today, so Week 5 is not yet due)_

Source of truth is the filesystem under `Sessions/`. `../PROGRESS.md` is the
generated ✓/- grid (any file counts as submitted); the two CSVs here add the
qualitative layer — whether what was submitted actually matches the guide.

- `assignment-status-w1-w4.csv` — one row per participant, per-week verdict.
- `assignment-gaps-w1-w4.csv` — one row per concrete gap, with a Status column
  so fixed items stay on the record instead of being deleted.

## Headline numbers

| | |
|---|---|
| Real participants | 21 (+ 1 stale `Day1test` folder) |
| All four weeks submitted | 9 — Abhishek, Amrendra, Deepali, Jyoti, Nikhil, Om, Shubham, Vikas, Viraj |
| Zero submissions in four weeks | 2 — **Purnima Gautam, Shilpa Mattoo** |
| Two or more weeks behind | 4 — Aishwarya (3), Awanti (2), Utkarsh (2), Sumit (W1/W2 backlog) |
| Week 4 submissions | 9 of 21 — the steepest drop-off so far (W1: 18, W2: 18, W3: 16) |

## Cohort-wide gaps (worth one announcement, not 21 nudges)

1. **No screenshots anywhere.** Week 1 requirement 3 asks for a screenshot of
   the `node` output. Not one participant submitted an image file.
2. **Template literals were skipped.** Week 2 requirement 3 asks for backticks
   instead of `+`. Only 10 files across all four weeks use a backtick at all.
3. **The `const` reassignment demo is missing for 10 of 18** Week 2 submitters.
   Present only for Anas, Avinash, Amrendra, Debasish, Deepali, Jyoti, Shubham,
   Vikas.
4. **Week 2 was answered from a different exercise set.** The guide names
   `appUrl` / `username` / `maxTimeout` / `isLoggedIn`; only Amrendra used them.
   Everyone else did the marks/totalPrice/vote set from the Artifacts practice
   file — worth reconciling the guide and the practice file so they agree.
5. **Generic filenames persist** despite the instruction to use descriptive
   ones: `assignment.js`, `practice.js`, `final.js`, `misc.js`, `info.js`,
   `variable.js`, `excercise.js`.

## Needs a direct follow-up

- **Purnima Gautam, Shilpa Mattoo** — nothing submitted in four weeks. Escalate.
- **Amruta Zargad** — has no participant folder in Week-04 or Week-05, so she
  literally cannot submit. Create both folders.
- **Amrendra Raj** — Week 2 work sits in `Amrendra Raj` (with a space) while the
  canonical `Amrendra-Raj` folder is empty. Move the files, delete the duplicate.
- **Vaishnavi Kurhade** — Week 1 file is extensionless *and* its content is
  near-identical to Aishwarya Thakur's (same typos, same comment banner, only
  the name changed). Worth a conversation before it becomes a habit.
- **Jyoti Kumari** — the only participant still nesting inside `Assignment/` in
  all four weeks. Deepali (W1) and Vikas (W1) are the other remaining nesters.
- **Empty committed files** — Anas `W3/userroleandaccess.js`, Anas
  `W1/assignment.js`, Nikhil `W1/courseName.js` (both copies), Utkarsh
  `W1/Assignment 2.js`.
- **Off-spec Week 3 submissions** — Viraj (calculator/positive-check) and
  Vaishnavi (one ternary line) did not attempt the role/access exercise.
- **`Day1test`** — stale test folder in Week 1; delete it so PROGRESS.md stops
  counting a 22nd participant.

## Housekeeping already done

Since the 2026-08-19 audit: W1 nesting was flattened for Abhishek, Akshay,
Debasish, Om and Shubham; folder-name drift was resolved for Amruta and Nikhil;
and the misfiled Week 3 work for Sumit and Vaishnavi was moved out of
`Week-03/Artifacts/` into the participants' own folders. These stay in the gaps
CSV with a `Fixed` status.
