# Optional A — Git Basics: Command Walkthrough

Companion to `Session-Guide.md`. Work through this in a scratch folder, then do
the assignment in your real training folder.

## The mental model

Git has three places your work can be:

```
working tree  --git add-->  staging area  --git commit-->  repository
(your edits)                (what's next)                  (history)
```

`git status` tells you what's in each. Run it constantly — it's the answer to
almost every "what's going on?" moment.

## Setup, once per machine

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@taazaa.com"
git config --global init.defaultBranch main
git config --list | grep user     # verify
```

## The core loop

```bash
git init                    # start tracking this folder
git status                  # what's changed?
git add hello.js            # stage one file
git add .                   # stage everything (write .gitignore FIRST)
git commit -m "Add hello.js printing a welcome message"
git log --oneline           # compact history
git log --oneline --graph   # with branch structure
```

## Seeing what changed

```bash
git diff                    # unstaged changes (working tree vs staging)
git diff --staged           # staged changes (staging vs last commit)
git show HEAD               # what the last commit actually changed
```

The difference between the first two is the exercise most people skip. Stage one
file, edit another, then run both — the output makes staging click.

## Commit messages

The message is for the person reading `git log` in six months. That person is
usually you.

| Bad | Better | Why |
|---|---|---|
| `update` | `Add password validator with 8-char minimum` | Says what and why |
| `fix` | `Fix off-by-one in the product loop` | Findable later |
| `week 2` | `Add Week 2 variable and data type exercises` | Describes content, not admin |
| `asdf` | anything | — |

Format: a short imperative summary under ~60 characters. "Add", "Fix", "Remove",
"Refactor" — as if completing "This commit will ___".

## .gitignore — write it before your first `git add .`

```gitignore
node_modules/
test-results/
playwright-report/
.env
.DS_Store
~$*
```

Already committed something you shouldn't have? `.gitignore` won't help — it only
affects untracked files. You need:

```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from version control"
```

## Fixing the last commit

```bash
git commit --amend -m "A better message"   # rewrite the last message
git commit --amend --no-edit                # add staged files to the last commit
```

Only amend commits you haven't pushed. Amending rewrites history, which is fine
alone and a problem once shared.

## Assignment checklist

- [ ] `git config user.name` and `user.email` return your values
- [ ] A repo initialised in your training folder
- [ ] `hello.js` and `about-me.js` committed with a meaningful message
- [ ] Three more commits, each a single logical change
- [ ] `git log --oneline` output saved to `git-log.txt`
- [ ] `.gitignore` excluding `node_modules/`, committed
- [ ] `notes.md` explaining staging in your own words, and one message you rewrote
- [ ] `git status` clean at the end
