# QA Playwright/JS Training

Training program tracker and assignment workspace for the JavaScript & Playwright
Test Automation curriculum (18 core weeks + 11 optional sessions).

## Contents

- **`QA-Playwright-JS-Training-Plan.xlsx`** — the master training plan: weekly
  agenda, session owners, learning objectives, and homework.
- **`Sessions/`** — one folder per session (`Week-01-...` through `Week-18-...`,
  plus `Optional-A` through `Optional-K`), each containing:
  - `Artifacts/` — the generated `Session-Guide.md` plus the session owner's
    material: handouts, practice files, worked examples, walkthroughs.
  - `<ParticipantName>/` — your folder, where you submit your work.
- **`PROGRESS.md`** — generated ✓/- grid of who has submitted what.
- **`progress/`**
  - `index.html` — the **cohort progress board**: open it in any browser for the
    submission matrix, individual standing, and outstanding findings.
  - `CHECK-REPORT.md` — generated report of submissions that don't match their
    Session Guide.
  - `SUMMARY.md` and the CSVs — the human audit narrative and its history.
- **`scripts/`** — see [Scripts](#scripts) below.
- **`Sample-Session/`** — a template showing the folder structure, not a real
  session.

## Scripts

Everything is plain Node with no dependencies — nothing to install.

| Command | What it does |
|---|---|
| `npm run check` | Audits your submission against the Session Guide's deliverables. **Run this before you push.** |
| `npm run progress` | Regenerates `PROGRESS.md` |
| `npm run report` | Regenerates the HTML progress board at `progress/index.html` |
| `npm run guides` | Regenerates every `Session-Guide.md` from `scripts/session-data.json` |
| `npm run folders` | Creates any missing participant folders |
| `npm run refresh` | All of the above, in the right order |

To check only your own work:

```bash
node scripts/check-submissions.js --participant Your-Name
node scripts/check-submissions.js Week-05
```

## Getting Started (Git & SSH Setup)

Follow this once per machine before you clone the repo.

### 1. Generate an SSH key (skip if you already have one)

```bash
ls -al ~/.ssh/id_ed25519.pub   # check if a key already exists
```

If nothing is found, generate one:

```bash
ssh-keygen -t ed25519 -C "your.email@taazaa.com"
```

Press Enter to accept the default file location. A passphrase is optional but
recommended.

### 2. Add the key to the ssh-agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3. Add the public key to your GitHub account

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the output, then in GitHub go to **Settings → SSH and GPG keys → New SSH
key**, paste it, and save. Verify the connection:

```bash
ssh -T git@github.com
```

You should see a message confirming you're authenticated.

### 4. Clone this repo

```bash
git clone git@github.com:vishaltyagi-tz/tz-pw-js-assignment.git
cd tz-pw-js-assignment
```

### 5. Everyday workflow — one branch and one PR per assignment

This repo runs on pull requests, not direct pushes to `main`. It's the same
workflow you'll use on a real automation project, and it means your work gets
reviewed.

Start each assignment from an up-to-date `main`:

```bash
git switch main
git pull
git switch -c yourname-week-05        # one branch per assignment
```

Do the work in your own participant folder, then:

```bash
npm run check                          # fix anything it flags first
git add Sessions/<session-name>/<YourName>/
git commit -m "Week 5: arrays and loops assignment"
git push -u origin yourname-week-05
```

Then open a Pull Request on GitHub (**Compare & pull request**), title it
`Week 5: arrays and loops`, and create it. Once it's merged:

```bash
git switch main
git pull
git branch -d yourname-week-05
```

If a push is ever rejected because someone pushed first:

```bash
git pull --rebase
git push
```

Never commit `node_modules/`, `test-results/`, `playwright-report/`, or `.env`.

## For Participants

1. Find your session in `Sessions/<session-name>/`.
2. Read `Artifacts/Session-Guide.md`. It is the **single source of truth** for
   that week: the agenda, the exact files you must submit (the Deliverables
   table), and the Definition of Done you'll be graded against.
3. Work through the practice file in the same `Artifacts/` folder if there is one.
4. Put your files in `Sessions/<session-name>/<YourName>/` — flat, no extra
   subfolder — using exactly the filenames in the Deliverables table.
5. Run `npm run check` and fix what it flags.
6. Branch, commit, push, and open a PR (see the workflow above).

**Your folder name matters.** It's `Firstname-Lastname` with a hyphen. A space,
an underscore, or different capitalisation makes git treat you as a second person
and you'll appear twice in the progress board.

## For Session Owners

- The guide is generated. To change a session's agenda, deliverables or homework,
  edit `scripts/session-data.json` and run `npm run guides` — **never** edit a
  `Session-Guide.md` directly, since the next generation overwrites it.
- If what you hand out in the session differs from the guide, update
  `session-data.json` so they agree. Submissions are graded against the guide, so
  drift means grading people against an assignment they never received.
- Add slides, sample code, practice files and cheat sheets to
  `Sessions/<session-name>/Artifacts/`.
- A `Sample-Submission/` folder in `Artifacts/` showing the expected shape of the
  answer is the single most useful thing you can add.
- After the session, run `npm run refresh` and review `progress/index.html`.
