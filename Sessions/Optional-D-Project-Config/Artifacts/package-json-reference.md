# Optional D — package.json & npm Reference

Companion to `Session-Guide.md`.

## An annotated package.json

```jsonc
{
  "name": "playwright-training",       // project id; lowercase, no spaces
  "version": "1.0.0",                 // your version, semver
  "description": "Training test suite",
  "main": "index.js",                 // entry point; irrelevant for a test project
  "scripts": {                        // your documented entry points
    "test": "playwright test",
    "test:smoke": "playwright test --grep @smoke",
    "test:headed": "playwright test --headed --project=chromium",
    "report": "playwright show-report"
  },
  "devDependencies": {                // needed to DEVELOP/TEST, not to ship
    "@playwright/test": "^1.48.0",
    "@types/node": "^22.0.0"
  },
  "dependencies": {}                  // needed to RUN the product itself
}
```

For a test project, nearly everything is a **devDependency** — Playwright isn't
part of any shipped product.

## npm scripts

```bash
npm test                # `test` is special — no `run` needed
npm run test:smoke      # everything else needs `run`
npm run                 # lists all available scripts
```

Scripts are how a new joiner discovers your project. If running your suite needs
a command that isn't in `scripts`, it isn't documented.

Bonus: `pre`/`post` hooks run automatically.

```jsonc
"scripts": {
  "pretest": "tsc --noEmit",     // runs automatically BEFORE `npm test`
  "test": "playwright test"
}
```

## Semantic versioning

`^1.48.0` means "1.48.0 or newer, but below 2.0.0".

| Range | Allows | Risk |
|---|---|---|
| `1.48.0` | exactly that | none; you never get fixes |
| `~1.48.0` | 1.48.x patches | low |
| `^1.48.0` | any 1.x at or above 1.48.0 | a minor release can change behaviour |
| `*` | anything | don't |

This is why a suite that was green on Friday can be red on Monday with no code
change — and why `package-lock.json` exists.

## package-lock.json

Records the **exact** version of every package, including transitive ones. Commit
it. Always.

| Command | Behaviour | Use when |
|---|---|---|
| `npm install` | Resolves ranges, may UPDATE the lockfile | Adding or upgrading a dependency |
| `npm ci` | Installs exactly the lockfile, deletes `node_modules` first | CI, and any clean checkout |

`npm ci` is faster and reproducible. It's what your capstone will be assessed
with.

## node_modules

Disposable and derived. Never commit it, never edit inside it.

```bash
rm -rf node_modules
npm ci                   # rebuild exactly from the lockfile
```

This works because everything needed is recorded in `package.json` +
`package-lock.json`. If it *doesn't* work, something you depend on isn't declared
— which is exactly the bug this exercise is designed to surface.

## Assignment checklist

- [ ] `package-json-notes.md` explains every section of your own file
- [ ] `test:smoke`, `test:headed`, and `report` scripts added and all three run
- [ ] `node_modules` deleted and restored successfully
- [ ] `npm-notes.md` covers what happened, and `npm install` vs `npm ci`
- [ ] You can explain why the lockfile is committed but `node_modules` isn't
