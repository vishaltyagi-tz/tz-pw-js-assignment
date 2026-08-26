# Optional C — Remotes & Pull Requests: Walkthrough

Companion to `Session-Guide.md`. This is also the workflow **this training repo
uses** — see the main `README.md`.

## SSH setup

Covered in the repo `README.md`. Verify it works before anything else:

```bash
ssh -T git@github.com
# Hi <you>! You've successfully authenticated...
```

## Connecting a local repo to GitHub

Create an empty repo on GitHub (no README, no .gitignore — you already have
commits), then:

```bash
git remote add origin git@github.com:<you>/playwright-training.git
git remote -v                       # confirm
git push -u origin main             # -u sets the upstream, once
```

After that first push, plain `git push` works.

## fetch vs pull vs push

| Command | What it does |
|---|---|
| `git fetch` | Downloads remote commits. Changes nothing in your working tree. Safe, always. |
| `git pull` | `fetch` + `merge` into your current branch. Can conflict. |
| `git pull --rebase` | `fetch` + replay your commits on top. Cleaner history, what to use when a push is rejected. |
| `git push` | Uploads YOUR commits. Only commits — uncommitted work stays local. |

## The assignment-per-PR flow

This is what you do for every submission in the training repo:

```bash
git switch main
git pull                                    # start from current main
git switch -c yourname-week-05              # one branch per assignment
# ... do the work, commit as you go ...
git push -u origin yourname-week-05
```

Then on GitHub: **Compare & pull request** → title it `Week 5: arrays and loops`
→ Create. After review, merge, then:

```bash
git switch main
git pull                                    # bring the merge down
git branch -d yourname-week-05              # tidy up
```

## Simulating a teammate

```bash
cd ~/somewhere-else
git clone git@github.com:<you>/playwright-training.git teammate-copy
cd teammate-copy
git switch -c teammate-change
# edit something, commit, push, open a PR
```

Now you have two clones of the same repo and can see exactly what a colleague
sees — including what happens when you both change the same line.

## When a push is rejected

```
! [rejected] main -> main (fetch first)
```

Someone pushed before you. Never force-push to fix this:

```bash
git pull --rebase
git push
```

## What a reviewer looks for

Use this on your own PR before asking anyone else:

- Does the PR do **one** thing? (A 40-file PR gets rubber-stamped, not reviewed.)
- Is the title meaningful in a list of 50?
- Anything committed that shouldn't be — `node_modules/`, `.env`, a stray screenshot?
- Any commented-out code or leftover debugging?
- Would someone unfamiliar understand it from the diff alone?

## Assignment checklist

- [ ] Playwright project pushed to a GitHub repo you own
- [ ] Cloned into a second folder to simulate a teammate
- [ ] A branch pushed and a PR opened from it
- [ ] At least one review comment left on your own PR
- [ ] PR merged, then pulled back into the original clone
- [ ] `pr-link.md` has the PR URL and your review comment
- [ ] `remote-notes.md` explains fetch vs pull vs push in your own words
