/* ==============================================================
   JAVASCRIPT FUNCTIONS — PRACTICE EXERCISES
   Companion to: javascript-functions-study-guide.md

   Instructions:
   - Fill in each TODO.
   - Uncomment the console.log lines under each exercise to test
     your work as you go.
   - Solutions are at the bottom of the file — try first before peeking!
   ============================================================== */


/* ------------------------------------------------------------
   EXERCISE 1 — Function Declaration
   Write a function `calculateTotal(price, quantity)` that returns
   price * quantity.
   ------------------------------------------------------------ */

function calculateTotal(price, quantity) {
  // TODO: return the total cost
}

console.log("--- Exercise 1: calculateTotal ---");
// console.log(calculateTotal(50, 3));   // expected: 150
// console.log(calculateTotal(20, 0));   // expected: 0


/* ------------------------------------------------------------
   EXERCISE 2 — Arrow Function Rewrite
   Rewrite calculateTotal above as an arrow function called
   `calculateTotalArrow`, using shorthand (no braces/return) since
   it's a single expression.
   ------------------------------------------------------------ */

const calculateTotalArrow = (price, quantity) => {
  // TODO: write the shorthand version here
};

console.log("\n--- Exercise 2: calculateTotalArrow ---");
// console.log(calculateTotalArrow(50, 3));  // expected: 150


/* ------------------------------------------------------------
   EXERCISE 3 — Default Parameters
   Write `applyTax(price, taxRate = 5)` that adds taxRate% to the
   price and returns the new total. If no taxRate is given, use 5%.
   ------------------------------------------------------------ */

function applyTax(price, taxRate = 5) {
  // TODO: return price plus tax
}

console.log("\n--- Exercise 3: applyTax ---");
// console.log(applyTax(100));      // expected: 105
// console.log(applyTax(100, 18));  // expected: 118


/* ------------------------------------------------------------
   EXERCISE 4 — Reusable Helper Inside Another Function
   Write `formatProductLabel(name, category)` that returns a string
   like "Shoes (Footwear)" — with name and category capitalized
   using a small helper function defined inside.
   ------------------------------------------------------------ */

function formatProductLabel(name, category) {
  const capitalize = (word) => {
    // TODO: capitalize first letter, lowercase the rest
  };
  // TODO: return the formatted label using capitalize()
}

console.log("\n--- Exercise 4: formatProductLabel ---");
// console.log(formatProductLabel("shoes", "footwear")); // "Shoes (Footwear)"
// console.log(formatProductLabel("MUG", "kitchen"));    // "Mug (Kitchen)"


/* ------------------------------------------------------------
   EXERCISE 5 — Validator Function (with boundaries!)
   Write `isValidPassword(password)` that returns true only if the
   password length is between 8 and 20 characters (inclusive).
   ------------------------------------------------------------ */

function isValidPassword(password) {
  // TODO: return true/false based on length
}

console.log("\n--- Exercise 5: isValidPassword ---");
// console.log(isValidPassword("short"));                // expected: false
// console.log(isValidPassword("goodPassword123"));      // expected: true
// console.log(isValidPassword("12345678"));              // expected: true  (boundary: exactly 8)
// console.log(isValidPassword("1234567"));               // expected: false (boundary: 7)


/* ------------------------------------------------------------
   EXERCISE 6 — Rest Parameters
   Write `average(...numbers)` that returns the average of any
   amount of numbers passed in.
   ------------------------------------------------------------ */

function average(...numbers) {
  // TODO: return the average of all numbers
}

console.log("\n--- Exercise 6: average ---");
// console.log(average(4, 8, 12));       // expected: 8
// console.log(average(10));             // expected: 10


/* ------------------------------------------------------------
   EXERCISE 7 — Higher-Order Function (Test Runner)
   Using the `runTest` pattern from the demo, write tests for
   THREE of your functions above. Try at least one passing and
   one failing test on purpose to see both outputs.
   ------------------------------------------------------------ */

function runTest(description, actual, expected) {
  const pass = actual === expected;
  console.log(`${pass ? "PASS" : "FAIL"} - ${description} | got: ${actual}, expected: ${expected}`);
}

console.log("\n--- Exercise 7: Mini Test Suite ---");
// TODO: write at least 3 runTest(...) calls here, e.g.:
// runTest("applyTax with default rate", applyTax(100), 105);
// runTest("isValidPassword rejects short password", isValidPassword("abc"), false);
// runTest("average of three numbers", average(4, 8, 12), 8);


/* ------------------------------------------------------------
   BONUS CHALLENGE — Combine what you've learned
   Write `checkout(items)` where `items` is an array of
   { price, quantity } objects. Use .map() and .reduce() (or a
   loop, if you haven't covered those yet) to return the total
   cost of the whole cart, reusing calculateTotal() for each item.
   ------------------------------------------------------------ */

function checkout(items) {
  // TODO: sum up calculateTotal(item.price, item.quantity) for every item
}

console.log("\n--- Bonus: checkout ---");
// const cart = [
//   { price: 50, quantity: 2 },
//   { price: 20, quantity: 3 },
// ];
// console.log(checkout(cart)); // expected: 160


/* ==============================================================
   SOLUTIONS (try the exercises above first!)
   ==============================================================

function calculateTotal(price, quantity) {
  return price * quantity;
}

const calculateTotalArrow = (price, quantity) => price * quantity;

function applyTax(price, taxRate = 5) {
  return price + price * (taxRate / 100);
}

function formatProductLabel(name, category) {
  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  return `${capitalize(name)} (${capitalize(category)})`;
}

function isValidPassword(password) {
  return password.length >= 8 && password.length <= 20;
}

function average(...numbers) {
  return numbers.reduce((total, n) => total + n, 0) / numbers.length;
}

function checkout(items) {
  return items.reduce((total, item) => total + calculateTotal(item.price, item.quantity), 0);
}

============================================================== */
