/* ==============================================================
   WEEK 5 — ARRAYS & LOOPS — PRACTICE EXERCISES
   Companion to: Session-Guide.md

   How to use this file:
   - Fill in each TODO.
   - Uncomment the console.log lines under each exercise to check
     your work as you go.
   - Run it with:  node arrays-loops-practice.js
   - Solutions are at the bottom — try first before peeking!
   ============================================================== */

const productTitles = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Fleece Jacket",
  "Red Onesie",
];

/* ------------------------------------------------------------
   EXERCISE 1 — Indexing & length
   Print the FIRST title, the LAST title (without hardcoding 4),
   and how many titles there are.
   ------------------------------------------------------------ */

console.log("--- Exercise 1: indexing ---");
// TODO: print productTitles[0]
// TODO: print the last item using productTitles.length - 1
// TODO: print the count

/* ------------------------------------------------------------
   EXERCISE 2 — Classic for loop
   Loop with a `for` loop and print only titles LONGER than 10
   characters. Watch your loop condition: `<`, not `<=`.
   ------------------------------------------------------------ */

console.log("\n--- Exercise 2: titles longer than 10 chars ---");
// TODO: for (let i = 0; i < productTitles.length; i++) { ... }

/* ------------------------------------------------------------
   EXERCISE 3 — for...of
   Print the same list again, this time with `for...of`.
   Then answer in a comment: which did you find easier to read?
   ------------------------------------------------------------ */

console.log("\n--- Exercise 3: same thing with for...of ---");
// TODO: for (const title of productTitles) { ... }
// ANSWER: ...

/* ------------------------------------------------------------
   EXERCISE 4 — push and shift
   Add "Sauce Labs Onesie" with .push(), print the whole array,
   then remove the FIRST item with .shift() and print it again.
   Note what .shift() returns.
   ------------------------------------------------------------ */

console.log("\n--- Exercise 4: mutating the array ---");
// TODO: push, print, shift, print

/* ------------------------------------------------------------
   EXERCISE 5 — Counting matches
   Use `for...of` to count how many titles contain "Shirt" or
   "Bag". Hint: .includes() is a string method too.
   ------------------------------------------------------------ */

console.log("\n--- Exercise 5: counting matches ---");
// TODO: let count = 0; loop; count++ when it matches; print count

/* ------------------------------------------------------------
   EXERCISE 6 — Longest title
   Write `findLongestTitle(titles)` that RETURNS the longest
   string. Decide what it should do for an empty array, and make
   it do that deliberately.
   ------------------------------------------------------------ */

function findLongestTitle(titles) {
  // TODO: return the longest title
}

console.log("\n--- Exercise 6: findLongestTitle ---");
// console.log(findLongestTitle(productTitles));  // expected: "Sauce Labs Fleece Jacket"
// console.log(findLongestTitle([]));             // expected: your deliberate choice

/* ------------------------------------------------------------
   EXERCISE 7 — Data-driven testing shape
   This is the pattern behind every data-driven test you'll write
   in Playwright. Loop the array and print one summary line per
   login set, e.g.:
     standard_user / secret_sauce -> expected: success
   ------------------------------------------------------------ */

const loginData = [
  { username: "standard_user", password: "secret_sauce", expected: "success" },
  { username: "locked_out_user", password: "secret_sauce", expected: "locked out" },
  { username: "standard_user", password: "wrong", expected: "invalid credentials" },
  { username: "", password: "secret_sauce", expected: "username required" },
];

console.log("\n--- Exercise 7: data-driven shape ---");
// TODO: for (const data of loginData) { ... }

/* ------------------------------------------------------------
   EXERCISE 8 — Off-by-one on purpose
   Write a loop using `i <= productTitles.length` and run it.
   Paste what the last line prints in a comment, and explain why.
   ------------------------------------------------------------ */

console.log("\n--- Exercise 8: the off-by-one bug ---");
// TODO: write the buggy loop
// OUTPUT: ...
// WHY: ...

/* ==============================================================
   SOLUTIONS — try the exercises first!
   ==============================================================

// 1
console.log(productTitles[0]);
console.log(productTitles[productTitles.length - 1]);
console.log(productTitles.length);

// 2
for (let i = 0; i < productTitles.length; i++) {
  if (productTitles[i].length > 10) console.log(productTitles[i]);
}

// 3
for (const title of productTitles) {
  if (title.length > 10) console.log(title);
}
// for...of is easier to read when you don't need the index.

// 4
productTitles.push("Sauce Labs Onesie");
console.log(productTitles);
const removed = productTitles.shift();   // .shift() RETURNS the removed item
console.log("removed:", removed);
console.log(productTitles);

// 5
let count = 0;
for (const title of productTitles) {
  if (title.includes("Shirt") || title.includes("Bag")) count++;
}
console.log(count);

// 6
function findLongestTitle(titles) {
  if (titles.length === 0) return null;   // deliberate choice, documented
  let longest = titles[0];
  for (const title of titles) {
    if (title.length > longest.length) longest = title;
  }
  return longest;
}

// 7
for (const data of loginData) {
  console.log(`${data.username || "(blank)"} / ${data.password} -> expected: ${data.expected}`);
}

// 8
for (let i = 0; i <= productTitles.length; i++) console.log(productTitles[i]);
// OUTPUT: the last line prints `undefined`.
// WHY: valid indexes are 0..length-1, so index `length` doesn't exist.
   ============================================================== */
