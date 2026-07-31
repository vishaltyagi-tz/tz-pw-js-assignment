# QA Playwright/JS Training

Training program tracker and assignment workspace for the JavaScript & Playwright
Test Automation curriculum (18 core weeks + 11 optional sessions).

## Contents

- **`QA-Playwright-JS-Training-Plan.xlsx`** — the master training plan: weekly
  agenda, session owners, learning objectives, homework, and the participant
  attendance/progress tracker sheet.
- **`Sessions/`** — one folder per session (`Week-01-...` through `Week-18-...`,
  plus `Optional-A` through `Optional-K`), each containing:
  - `Artifacts/` — session owner materials: the auto-generated `Session-Guide.md`
    (agenda, objectives, homework) plus any supporting docs/slides owners add
    (e.g. `Basic-Setup.docx` in Week 1).
  - `<ParticipantName>/` — one folder per participant, where they submit their
    assignment files for that session.
- **`scripts/`**
  - `generate-session-artifacts.js` — (re)generates every session's
    `Session-Guide.md` from `session-data.json`. Run after editing the agenda.
  - `track-progress.js` — scans `Sessions/` and regenerates `PROGRESS.md`,
    marking a participant's session as done if their folder contains any files.
- **`PROGRESS.md`** — generated submission-tracking report (participants ×
  sessions). Regenerate with `node scripts/track-progress.js`.
- **`Sample-Session/`** — a template (not a real session) showing the folder
  structure above with your named folder already in it. Git doesn't track empty
  folders, so this is what lets you see your own folder right after cloning —
  see `Sample-Session/Artifacts/Session-Guide.md` for details.

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

### 5. Everyday workflow

Before you start work, pull the latest changes:

```bash
git pull
```

After adding/updating your assignment files in your participant folder:

```bash
git add Sessions/<session-name>/<YourName>/
git commit -m "Week X: submit assignment"
git push
```

If `git push` is rejected because others pushed first, pull and re-push:

```bash
git pull --rebase
git push
```

## For Participants

1. Find your session in `Sessions/<session-name>/`.
2. Read `Artifacts/Session-Guide.md` for that week's objectives and homework.
3. Add your assignment files to your own folder: `Sessions/<session-name>/<YourName>/`.

## For Session Owners

- Add supporting material (slides, docs, sample code) to
  `Sessions/<session-name>/Artifacts/`.
- Run `node scripts/track-progress.js` to refresh `PROGRESS.md` and see who has
  submitted.
