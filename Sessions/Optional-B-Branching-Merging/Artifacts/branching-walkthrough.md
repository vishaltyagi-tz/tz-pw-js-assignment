# Optional B — Branching & Merging: Command Walkthrough

Companion to `Session-Guide.md`.

## What a branch actually is

Not a copy of your files — just a movable pointer to a commit. That's why
creating one is instant and free, and why you should make one per assignment.

## The commands

```bash
git branch                        # list local branches (* marks current)
git branch -a                     # include remote branches
git switch -c feature/arrays      # create AND switch (modern)
git checkout -b feature/arrays    # same thing (older syntax, still everywhere)
git switch main                   # switch back
git branch -d feature/arrays      # delete (refuses if unmerged)
git branch -D feature/arrays      # force delete (loses the work)
```

**Check `git branch` before you start work.** Committing to `main` by habit is the
most common mistake here.

## Merging

```bash
git switch main
git merge feature/arrays
git log --oneline --graph --all   # see what happened
```

Two possible outcomes:

- **Fast-forward** — `main` hadn't moved, so the pointer just slides forward. No merge commit.
- **Merge commit** — both branches had new commits, so git creates one joining them.

## Creating a conflict on purpose

This is the exercise. Do it deliberately once, in a scratch repo, so the first
real one isn't a surprise.

```bash
# on main
echo "let total = 100;" > price.js
git add price.js && git commit -m "Add price with total 100"

# on a branch, change that line
git switch -c feature/discount
echo "let total = 80;" > price.js
git add price.js && git commit -m "Apply discount, total 80"

# back on main, change the SAME line differently
git switch main
echo "let total = 120;" > price.js
git add price.js && git commit -m "Raise price, total 120"

# now merge — conflict
git merge feature/discount
```

You'll see:

```
Auto-merging price.js
CONFLICT (content): Merge conflict in price.js
Automatic merge failed; fix conflicts and then commit the result.
```

Open `price.js`:

```
<<<<<<< HEAD
let total = 120;
=======
let total = 80;
>>>>>>> feature/discount
```

- Above `=======` is **your current branch** (`main`).
- Below is **the branch being merged in**.

Resolve by editing the file to what it should actually be, and **deleting all
three marker lines**. Then:

```bash
git add price.js
git commit -m "Merge discount branch, keeping the discounted total"
```

Changed your mind mid-conflict?

```bash
git merge --abort     # back to before the merge, cleanly
```

## The mistake to avoid

Committing a file that still contains `<<<<<<<`. It happens constantly. After
resolving, always re-open the file, or:

```bash
git diff --check                        # warns about conflict markers
grep -rn "<<<<<<<" .                    # belt and braces
```

## Assignment checklist

- [ ] `feature/arrays-practice` created, committed on, merged into `main`
- [ ] The merged change is visible in `main` (`git log --oneline`)
- [ ] `branch-log.txt` holds your `git log --oneline --graph --all` output
- [ ] A real conflict created and resolved
- [ ] `conflict-notes.md` shows the actual markers you saw and how you resolved them
- [ ] No conflict markers remain anywhere (`git diff --check` is silent)
