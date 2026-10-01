# Week 6 — Async/Await & Promises: Snippets & Exercises

Companion to `Session-Guide.md` and `async-await-practice.js`.
**Session owner:** Prachi · Wed, Sep 09, 2026

> **Read the last section (“What to submit”) before you start.** It maps each
> exercise below to the exact filename the automated check looks for.

## Why this week matters more than the other five

Every single Playwright call you write for the rest of this course is
asynchronous:

```js
await page.goto("https://example.com");
await page.getByRole("button", { name: "Login" }).click();
await expect(page.getByText("Welcome")).toBeVisible();
```

Three `await`s in three lines. If `await` is fuzzy to you now, every Playwright
failure for the next twelve weeks will look like a mystery. Get it solid here
and the rest of the course is mostly learning an API.

---

## 1. Synchronous vs asynchronous

**Synchronous** code runs top to bottom, one line finishing before the next
starts. That is everything you have written so far in Weeks 1–5.

```js
console.log("first");
console.log("second");
console.log("third");
// first, second, third — always, every time
```

**Asynchronous** code can start something now and deal with the result later,
without blocking the lines beneath it.

```js
console.log("A: first");
setTimeout(() => console.log("B: inside setTimeout"), 0);
console.log("C: last line of the file");
```

Output:

```
A: first
C: last line of the file
B: inside setTimeout
```

`B` prints last **even though the delay is 0 milliseconds.** `setTimeout` hands
the callback to the environment and says "run this once the current script is
finished". The current script has to finish first. Always.

> **The mental model:** JavaScript runs one thing at a time. Anything slow — a
> timer, a network request, a browser click — gets handed off, and its
> follow-up code is queued until the main script is done.

---

## 2. The callback problem

Before Promises, "call me back when you're done" was the only tool:

```js
function fetchUser(callback) {
  setTimeout(() => callback({ id: 1, name: "Aisha" }), 1000);
}

fetchUser((user) => {
  console.log(user.name);
});
```

That reads fine for one step. Now chain three, where each needs the previous
result:

```js
fetchUser((user) => {
  fetchOrders(user.id, (orders) => {
    fetchOrderDetail(orders[0].id, (detail) => {
      console.log(detail);          // four levels deep already
      // ...and where exactly do you put the error handling?
    });
  });
});
```

This is "callback hell". It nests sideways, errors have to be handled
separately at every level, and it is genuinely hard to read. Promises exist to
fix precisely this.

---

## 3. A Promise is a receipt

A Promise is an object representing a value **you don't have yet**. Think of the
receipt you get at a takeaway counter: it isn't the food, but it is a guarantee
you'll get either the food or an apology.

A Promise is in exactly one of three states:

| State | Meaning |
|---|---|
| **pending** | Still working. No value yet. |
| **fulfilled** | Finished successfully — has a value. |
| **rejected** | Failed — has an error. |

Once it leaves `pending` it never changes again.

Creating one by hand (you'll rarely do this outside this exercise — Playwright
returns Promises to you already made):

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done!"), 1000);   // fulfil after 1s
  // reject(new Error("failed")) would reject it instead
});
```

The `delay` helper at the top of `async-await-practice.js` is exactly this
pattern, and it is worth understanding line by line:

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await delay(2000);   // pauses for 2 seconds
```

> **In tests, waiting on a clock is a bug.** We use `delay` this week only to
> simulate a slow network. From Week 11 you'll use Playwright's auto-waiting
> instead, and `waitForTimeout` will be something you actively avoid.

### Consuming a Promise the old way: `.then()`

```js
fetchUserData()
  .then((user) => console.log(user))
  .catch((error) => console.log("failed:", error.message));
```

This works and you will see it in older code. It is flatter than callbacks but
still awkward once you need several results in the same scope.

---

## 4. `async` / `await` — the readable way

`await` pauses inside a function until a Promise settles, then gives you the
plain value. Same behaviour as `.then()`, but it reads like synchronous code:

```js
async function showUser() {
  const user = await fetchUserData();   // pause here until it resolves
  console.log(user.name);               // then carry on with the real value
}
```

Two rules that cause most of the errors in this week's assignment:

**Rule 1 — `await` only works inside a function marked `async`.**

```js
// ✗ SyntaxError: await is only valid in async functions
const user = await fetchUserData();

// ✓ wrap it
async function main() {
  const user = await fetchUserData();
  console.log(user);
}
main();
```

This is why `async-await-practice.js` has a `main()` at the bottom, and why
every Playwright test you'll write looks like this:

```js
test("login works", async ({ page }) => {   //  <-- async, so you can await
  await page.goto("/login");
});
```

**Rule 2 — an `async` function ALWAYS returns a Promise**, even when you return
a plain value.

```js
async function getNumber() {
  return 42;                    // not a number to the caller — a Promise
}

console.log(getNumber());        // Promise { 42 }
console.log(await getNumber());  // 42
```

---

## 5. Errors: `try/catch` around the `await`

A rejected Promise behaves like a thrown error, so you catch it the same way —
but the `try` must wrap **the `await` call**, not the function definition.

```js
async function loadData() {
  try {
    const data = await fetchBrokenData();
    console.log(data);
  } catch (error) {
    console.log("Could not load data:", error.message);
  }
}
```

What it looks like when you forget:

```js
async function loadData() {
  const data = await fetchBrokenData();   // rejects, nothing catches it
}
loadData();
```

On Node 24 that prints:

```
errorHandling.js:2
async function fetchBrokenData(){ await delay(500); throw new Error("Service unavailable"); }
                                                          ^

Error: Service unavailable
    at fetchBrokenData (errorHandling.js:2:59)
    at async loadData (errorHandling.js:3:41)

Node.js v24.14.0
```

The process **crashes** and exits with code `1`. You can confirm that yourself:

```bash
node errorHandling.js; echo "exit code: $?"
```

> Older Node versions (roughly 15–19) printed a
> `[UnhandledPromiseRejection: ...]` warning block here instead. If you find
> that wording in a blog post, it's the same underlying problem — just an older
> message. **Paste whatever your own machine prints**, not what this guide or a
> tutorial shows; the exact text and line numbers will be yours.

Common wrong placements:

```js
// ✗ wraps the definition, catches nothing
try {
  async function loadData() { await fetchBrokenData(); }
} catch (error) { }

// ✗ a plain if can't catch a rejection
if (fetchBrokenData()) { }
```

---

## 6. Sequential vs parallel

This is the part that matters for test suite speed.

**Sequential** — each `await` waits for the previous one to finish:

```js
async function sequential() {
  const start = Date.now();

  const user = await fetchUserData();     // 2 seconds
  const order = await fetchOrderData();   // then another 2 seconds

  console.log(user, order);
  console.log(`took ${Date.now() - start}ms`);   // ~4000ms
}
```

**Parallel** — `Promise.all` starts both immediately and waits for both:

```js
async function parallel() {
  const start = Date.now();

  const [user, order] = await Promise.all([
    fetchUserData(),      // both start right now
    fetchOrderData(),
  ]);

  console.log(user, order);
  console.log(`took ${Date.now() - start}ms`);   // ~2000ms
}
```

Note the destructuring: `Promise.all` resolves to an **array** of results, in
the same order you passed the promises in — not the order they finished.

| | Sequential | `Promise.all` |
|---|---|---|
| Total time | sum of all of them | the **slowest** one |
| Use when | step 2 needs step 1's result | the calls are independent |
| If one rejects | later ones never start | rejects immediately, others keep running |

Measuring elapsed time — the pattern the assignment asks for:

```js
const start = Date.now();
// ... the work ...
console.log(`took ${Date.now() - start}ms`);
```

---

## 7. The missing-`await` bug

Learn this one properly now; it will save you an hour later.

```js
async function fetchUserData() {
  await delay(2000);
  return { id: 1, name: "Aisha" };
}

const user = fetchUserData();     // no await
console.log(user);                // Promise { <pending> }
console.log(user.name);           // undefined
```

You logged **the receipt, not the food.** `await` is what unwraps it. The
symptoms to recognise:

| You see | You forgot `await` on |
|---|---|
| `Promise { <pending> }` | the call itself |
| `undefined` reading a property | the call, then read `.name` off the Promise |
| `[object Promise]` in a string | the call inside a template literal |

In Playwright this shows up as assertions that pass when they shouldn't:

```js
// ✗ never actually waits — the test passes whatever the page says
expect(page.getByText("Welcome")).toBeVisible();

// ✓
await expect(page.getByText("Welcome")).toBeVisible();
```

Don't mix the two styles on one call, either:

```js
// ✗ pick one
const user = await fetchUserData().then((u) => u);
```

---

## 8. Cheat sheet

```js
// A promise that resolves after ms
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Declare async
async function getUser() { await delay(100); return { id: 1 }; }
const getUser = async () => { await delay(100); return { id: 1 }; };

// Consume
const user = await getUser();                    // inside an async function
getUser().then((u) => console.log(u));           // older style

// Errors
try { await getUser(); } catch (error) { console.log(error.message); }

// Parallel — resolves to an array, in argument order
const [a, b] = await Promise.all([getUser(), getOrder()]);

// Parallel, but don't fail fast — one rejection doesn't lose the rest
const results = await Promise.allSettled([getUser(), getOrder()]);
// [{ status: "fulfilled", value: ... }, { status: "rejected", reason: ... }]

// Timing
const start = Date.now();
console.log(`took ${Date.now() - start}ms`);

// Top-level await isn't available in a plain .js script — wrap it
async function main() { /* ... */ }
main();
```

---

## Exercises

Work these in `async-await-practice.js` — it has the stubs and a `main()`
runner ready, plus worked solutions at the bottom. **Try each one before
looking.** Run the file with:

```bash
node async-await-practice.js
```

### Exercise 1 — Prove async doesn't block
Write down your prediction for the order of the three logs **before** running,
then run it and record the actual order and why they differ.

### Exercise 2 — Your first async function
Write `fetchUserData()` that waits 2 seconds and returns
`{ id: 1, name: "Aisha", role: "QA Engineer" }`. Call it with `await` and log
the result.

### Exercise 3 — Sequential awaits
Add `fetchOrderData()` (waits 2s, returns `{ orderId: 99 }`). Await both in
sequence and log the total elapsed time with `Date.now()`. Expect ~4000ms.

### Exercise 4 — Parallel with `Promise.all`
Run the same two fetches with `Promise.all` and log the elapsed time. Expect
~2000ms. Explain in a comment why it halved.

### Exercise 5 — Handling rejection
Write `fetchBrokenData()` that waits 500ms then throws. Call it inside
`try/catch` and log a friendly message. Then comment out the `try/catch`, run
it, and **paste the real unhandled-rejection warning** you get.

### Exercise 6 — The missing-await bug
Call `fetchUserData()` **without** `await`, log the result, paste the output and
explain it.

### Exercise 7 — `retry()` *(stretch)*
Write `retry(fn, attempts)` that awaits `fn()` and retries on rejection up to
`attempts` times before giving up. This is the pattern behind flaky-test
retries — you'll meet it again in Week 12.

### Exercise 8 — `allSettled` *(stretch)*
Redo Exercise 4 with `Promise.allSettled` where one of the two fetches rejects.
Compare what you get back with what `Promise.all` would have given you.

---

## What to submit

Five files, flat in `Sessions/Week-06-Async-Await-Promises/<YourName>/`. **Use
exactly these filenames** — `npm run check` looks for them by name.

| Exercise | Submit as | Must contain |
|---|---|---|
| 2 | `fetchUserData.js` | Mock `fetchUserData()` resolving after 2s via `setTimeout`; called with `async/await`, result logged |
| 3 | `sequential.js` | Both fetches awaited in sequence, total elapsed time logged with `Date.now()` |
| 5 | `errorHandling.js` | Deliberate rejection handled with `try/catch` + a friendly message, **and** the no-try/catch output in a comment |
| 4 | `parallel.js` | Both fetches via `Promise.all`, elapsed time logged, difference from `sequential.js` explained in a comment |
| 6 | `missingAwait.js` | An async call **without** `await`, the output logged, and your explanation of `Promise { <pending> }` in a comment |

Exercises 1, 7 and 8 are for your own practice — nothing to submit.

**Before you open your PR**, check yourself against the Definition of Done in
`Session-Guide.md`:

- [ ] All five files run cleanly, no unhandled-rejection warnings
- [ ] `sequential.js` and `parallel.js` print real elapsed times, and parallel is measurably faster
- [ ] `errorHandling.js` never crashes the process
- [ ] `missingAwait.js` contains your own explanation of the pending-Promise output

Then:

```bash
git switch -c <yourname>-week-6
node scripts/check-submissions.js      # from the repo root
```

Three of these five deliverables ask for **real output from your own machine** —
the elapsed times, the rejection warning, the pending-Promise log. Those can
only be completed by actually running the code.

---

## Common mistakes to watch for

| Mistake | Symptom | Fix |
|---|---|---|
| `await` outside an `async` function | `SyntaxError: await is only valid in async functions` | Wrap it in `async function main()` and call `main()` |
| Forgot `await` | `Promise { <pending> }`, or `undefined` off a property | Add `await` |
| `try` around the definition, not the call | Error escapes anyway | Move `try` to wrap the `await` |
| Mixing `.then()` and `await` on one call | Confusing, sometimes wrong | Pick one — prefer `await` |
| Expecting `Promise.all` results in finish order | Wrong values in wrong variables | Results come back in **argument** order |
| Sequential `await`s in a loop | Suite crawls | `Promise.all` when the iterations are independent |
| `if (mightReject())` to catch failure | Never catches | Only `try/catch` around `await` catches a rejection |

---

## Using an AI assistant

Allowed, with two conditions (full policy in `Session-Guide.md`):

1. **Disclose it** at the top of any file it helped with:
   `// AI-assisted: <tool> helped with <what>. I have verified and can explain every line.`
2. **Be able to explain every line** — you may be asked in a spot check to
   explain a line and change it live.

This week especially: an assistant will happily write you a correct
`Promise.all` you don't understand. That gets you through the assignment and
leaves you unable to debug your own Playwright suite in five weeks' time.

---

## Resources

- [MDN: `async function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [MDN: `Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [javascript.info: Promises, async/await](https://javascript.info/async) — the clearest walkthrough of this topic anywhere
