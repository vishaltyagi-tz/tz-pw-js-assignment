# Optional G — Git Workflow for Test Automation

Companion to `Session-Guide.md`. This is the session about not losing work.

## The Playwright .gitignore

Copy this into every Playwright project, before the first `git add`:

```gitignore
node_modules/
test-results/
playwright-report/
playwright/.cache/
blob-report/
.env
.env.*
!.env.example
.DS_Store
~$*
```

Everything except `.env.example` is regenerated or secret. A committed
`playwright-report/` makes every PR diff unreviewable — thousands of lines of
generated HTML burying your three lines of real change.

Already committed one?

```bash
git rm -r --cached playwright-report test-results
git commit -m "Stop tracking generated Playwright output"
```

## Merge vs rebase

| | Merge | Rebase |
|---|---|---|
| History | Preserves the branch shape, adds a merge commit | Linear, as if you'd worked in order |
| Safe on shared branches? | **Yes** | **No** — it rewrites commits |
| Use for | Bringing a feature branch into `main` | Updating YOUR branch before opening a PR |

```bash
# your branch is behind main; tidy it up before the PR
git switch my-branch
git fetch origin
git rebase origin/main
```

**Never rebase a branch someone else has pulled.** Rebasing creates new commits
with new hashes; a colleague's copy of the old commits then conflicts with yours
in a way that's genuinely painful to unpick.

## git stash — the urgent interruption

```bash
git stash                       # shelve tracked changes
git stash -u                    # include untracked files too
git stash list                  # what's shelved
git stash pop                   # restore the most recent and remove it
git stash apply stash@{1}       # restore an older one, keep it shelved
git stash drop stash@{0}        # discard one
```

Typical use: you're mid-refactor on a spec when a test breaks in `main`.

```bash
git stash
git switch main
# fix it, commit, push
git switch my-branch
git stash pop
```

Stashes are easy to forget. `git stash list` is worth a glance before you start
anything new.

## Tagging a known-good suite

```bash
git tag v1.0-suite                              # lightweight
git tag -a v1.0-suite -m "All 40 tests green"   # annotated, preferred
git push origin v1.0-suite
git tag                                          # list
```

Useful for "the suite as it stood when we released 2.4" — you can always check
out that exact state.

## Undoing things safely

| Situation | Command | Destructive? |
|---|---|---|
| Unstage a file, keep the edit | `git restore --staged file.js` | No |
| Discard uncommitted edits to a file | `git restore file.js` | **Yes** — the edit is gone |
| Undo a pushed commit | `git revert <sha>` | No — adds an undo commit |
| Move your branch back, keep the changes staged | `git reset --soft HEAD~1` | No |
| Move back and throw the changes away | `git reset --hard HEAD~1` | **Yes** |

**`git revert` is the public undo.** It creates a new commit that reverses an old
one, so shared history stays intact. Use it for anything already pushed.

**`git reset --hard` is the local-only, last-resort undo.** It destroys
uncommitted work with no recovery path. Before running it, ask: is anything here
uncommitted that I want? If unsure, `git stash` first — it costs nothing.

Committed work is recoverable even after a bad reset:

```bash
git reflog                  # every position HEAD has held
git reset --hard HEAD@{3}   # go back to where you were
```

`git reflog` has saved more careers than any other git command. It only tracks
commits, though — never-committed work is genuinely unrecoverable.

## Commit messages for test code

| Bad | Good |
|---|---|
| `update spec` | `Add negative-path test for blank username` |
| `fix test` | `Fix flaky checkout test by waiting on the URL, not a timeout` |
| `wip` | `Extract cart locators into CartPage` |
| `changes` | `Remove hardcoded credentials in favour of env vars` |

Say what the test now covers, or what the fix actually was. In six months a
bisect will drop you on this commit and the message is all you get.

## Assignment checklist

- [ ] Complete Playwright `.gitignore`, and nothing generated is tracked
- [ ] `stash-notes.md` — the real stash / switch / fix / pop sequence you ran
- [ ] `tag-and-revert.md` — your `v1.0-suite` tag, plus a revert and why reset would have been wrong
- [ ] `git status` clean
