# Optional K — AI-Assisted Test Scripting: A Review Discipline

Companion to `Session-Guide.md`. The graded skill in this session is
**judgement**, not generation. Anyone can produce a test with a prompt; the
question is whether you can tell a correct one from a plausible one.

Do this session **last**. You need Weeks 7-15 to evaluate the output — without
them you can't tell the difference, and that's precisely the dangerous position.

## Where AI genuinely helps

| Task | Why it works well |
|---|---|
| Boilerplate | A `describe` block with five test stubs is pure typing |
| Explaining an error | It's read more stack traces than you have |
| Mechanical refactors | "Convert these locators to `getByRole`" |
| Test case ideation | "What edge cases am I missing for a password field?" — genuinely good |
| Converting JS to TS | Adding annotations is rule-following |
| Reading unfamiliar code | "What does this fixture do?" |

## Where it fails, specifically

1. **Hallucinated selectors.** It will confidently produce
   `page.getByTestId('login-submit-button')` for an element that has no test id
   at all. This is the single most common failure.
2. **Outdated APIs.** Much of its training data predates Playwright's locator
   API, so you'll get `page.click('#btn')`, `page.waitForSelector`, and
   `page.$eval` — all working but all the old way.
3. **`waitForTimeout`.** The most common bad advice in this entire space. It
   "fixes" a flaky test by making it slow and still flaky.
4. **Tests that assert nothing.** A test that navigates and finishes. It passes
   forever and protects nothing.
5. **Plausible-but-wrong logic.** Off-by-one on a boundary, `>` where you needed
   `>=`. It reads fine, which is what makes it dangerous.

## Prompting that actually works

A weak prompt gets invented details. Give it the facts it can't guess:

**Weak:**
> Write a Playwright test for the login page.

**Strong:**
> Write a Playwright test in JavaScript using @playwright/test v1.48.
> Site: https://www.saucedemo.com. Here is the relevant HTML:
> `<input id="user-name" data-test="username" placeholder="Username">`
> `<input id="password" data-test="password" placeholder="Password">`
> `<input type="submit" id="login-button" data-test="login-button" value="Login">`
> Our conventions: user-facing locators only (getByRole/getByPlaceholder),
> web-first assertions (`await expect(locator)`), never `waitForTimeout`,
> page objects live in `pages/`. Test that a blank username is rejected and
> assert the error banner text.

The difference is the DOM, the version, and the conventions. Give it those and
the hallucination rate drops sharply.

## The review checklist — run this on every generated test

- [ ] Does every locator exist? **Verify each one in DevTools**, don't assume.
- [ ] Any pre-locator API (`page.click`, `waitForSelector`, `$`, `$$`, `$eval`)?
- [ ] Any `waitForTimeout`? Delete it and use a web-first assertion.
- [ ] Does the test actually assert something meaningful?
- [ ] Is every `expect` on a locator awaited?
- [ ] Does it pass? Then: does it **fail when it should**? Break the expectation
      on purpose and confirm it goes red. A test that can't fail is worthless.
- [ ] Run it 5 times (`--repeat-each=5`). Still green?
- [ ] Can you explain every line? If not, you can't commit it.

That last item is the whole discipline. "The AI wrote it" is not a review
response — you are accountable for what you commit.

## Never paste these into an assistant

- Real credentials, tokens, or API keys
- Customer or production data
- Proprietary application source you don't have permission to share

Check your organisation's policy on which tools are approved before using one
with anything work-related.

## Self-healing locators

Some commercial tools claim to repair broken locators automatically. Worth
understanding the trade-off:

- **The appeal:** a renamed id doesn't turn the suite red overnight.
- **The cost:** a test that adapts to a changed UI may no longer be testing what
  you think. If a button's label changes from "Submit" to "Delete" and the tool
  helpfully finds it anyway, your test now passes while clicking the wrong
  thing. Sometimes a red test is the correct outcome — it's information.

A stable `data-testid` contract with your developers solves the same problem
without the ambiguity.

## Assignment checklist

- [ ] `tests/ai-generated.spec.js` — generated, then manually corrected, with the original AI version kept in a comment for comparison
- [ ] It passes, and you verified it also FAILS when the expectation is broken
- [ ] `ai-debug-notes.md` — a real failing test given to an AI, and specifically what it got right and wrong
- [ ] `ai-reflection.md` — 5-6 sentences on one concrete risk and the specific way you verified the suggestion
- [ ] `prompts.md` — your prompts, and how you improved a weak one
- [ ] No credential or proprietary code was pasted into an assistant
