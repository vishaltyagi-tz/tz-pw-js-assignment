/* ==============================================================
   WEEK 6 — ASYNC/AWAIT & PROMISES — PRACTICE EXERCISES
   Companion to: Session-Guide.md

   Run with:  node async-await-practice.js
   Solutions are at the bottom — try first.

   This is the most important week before Playwright. EVERY
   Playwright call is async, so every habit you build here you
   will use for the rest of the course.
   ============================================================== */

// A helper that "waits" — this is the only legitimate use of a
// timer you'll see in this course. In tests, waiting on a clock
// is a bug; here we're simulating a slow network on purpose.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ------------------------------------------------------------
   EXERCISE 1 — Prove that async doesn't block
   Predict the order of the three logs BEFORE running, write your
   prediction in the comment, then run it.
   ------------------------------------------------------------ */

console.log("--- Exercise 1: execution order ---");
console.log("A: first");
setTimeout(() => console.log("B: inside setTimeout(0)"), 0);
console.log("C: last line of the file");
// PREDICTION: ...
// ACTUAL:     ...
// WHY:        ...

/* ------------------------------------------------------------
   EXERCISE 2 — Your first async function
   Write `fetchUserData()` that waits 2 seconds and then RETURNS
   { id: 1, name: "Aisha", role: "QA Engineer" }.
   Then call it with await and log the result.
   ------------------------------------------------------------ */

async function fetchUserData() {
  // TODO: await delay(2000), then return the user object
}

/* ------------------------------------------------------------
   EXERCISE 3 — Sequential awaits
   Add `fetchOrderData()` (waits 2s, returns { orderId: 99 }).
   Await both IN SEQUENCE and log the total elapsed time using
   Date.now(). Expect roughly 4000ms.
   ------------------------------------------------------------ */

async function fetchOrderData() {
  // TODO
}

/* ------------------------------------------------------------
   EXERCISE 4 — Parallel with Promise.all
   Run the same two fetches with Promise.all and log the elapsed
   time. Expect roughly 2000ms. Explain the difference.
   ------------------------------------------------------------ */

/* ------------------------------------------------------------
   EXERCISE 5 — Handling rejection
   Write `fetchBrokenData()` that waits 500ms then THROWS.
   Call it inside try/catch and log a friendly message.
   Then comment out the try/catch, run it, and paste the
   unhandled-rejection warning you get.
   ------------------------------------------------------------ */

async function fetchBrokenData() {
  // TODO: await delay(500); throw new Error("Service unavailable");
}

/* ------------------------------------------------------------
   EXERCISE 6 — The missing await bug
   Call fetchUserData() WITHOUT await and log the result.
   Paste the output and explain it. This exact mistake will cost
   you an hour in Playwright one day — learn it now.
   ------------------------------------------------------------ */

// OUTPUT: ...
// WHY:    ...

/* ------------------------------------------------------------
   EXERCISE 7 — retry(), the pattern behind flaky-test retries
   Write `retry(fn, attempts)` that awaits fn(), and on rejection
   tries again up to `attempts` times before giving up.
   ------------------------------------------------------------ */

async function retry(fn, attempts) {
  // TODO
}

/* ------------------------------------------------------------
   RUNNER — everything must live inside an async function, because
   top-level await isn't available in a plain CommonJS script.
   This is why you'll see `async ({ page }) => { ... }` in every
   Playwright test.
   ------------------------------------------------------------ */

async function main() {
  // TODO: call your exercises here, e.g.
  // console.log(await fetchUserData());
}

main();

/* ==============================================================
   SOLUTIONS
   ==============================================================

// 1: A, C, B. setTimeout defers the callback until the current
//    script finishes, even with a 0ms delay.

// 2
async function fetchUserData() {
  await delay(2000);
  return { id: 1, name: "Aisha", role: "QA Engineer" };
}

// 3
async function sequential() {
  const start = Date.now();
  const user = await fetchUserData();
  const order = await fetchOrderData();
  console.log(user, order, `took ${Date.now() - start}ms`);   // ~4000ms
}

// 4
async function parallel() {
  const start = Date.now();
  const [user, order] = await Promise.all([fetchUserData(), fetchOrderData()]);
  console.log(user, order, `took ${Date.now() - start}ms`);   // ~2000ms
}
// Sequential waits for the first to finish before starting the second.
// Promise.all starts both immediately, so total time is the SLOWEST one.

// 5
async function fetchBrokenData() {
  await delay(500);
  throw new Error("Service unavailable");
}
try {
  await fetchBrokenData();
} catch (error) {
  console.log("Could not load data:", error.message);
}
// Without try/catch, Node prints an UnhandledPromiseRejection warning
// and (in modern Node) exits with a non-zero code.

// 6
console.log(fetchUserData());   // Promise { <pending> }
// You logged the PROMISE, not the value. `await` is what unwraps it.

// 7
async function retry(fn, attempts) {
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`attempt ${i} failed: ${error.message}`);
      if (i === attempts) throw error;
    }
  }
}
   ============================================================== */
