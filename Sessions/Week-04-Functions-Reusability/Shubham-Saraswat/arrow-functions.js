const calculateTotalPrice = (price, taxRate) => price + price * taxRate;

const generateUserEmail = (firstName, domain) => firstName.toLowerCase() + "@" + domain;

console.log("Total price:", calculateTotalPrice(100, 0.18));
console.log("User email:", generateUserEmail("Shubham", "taazaa.com"));

// Syntax comparison with the declarations in reusable-functions.js:
// - Declaration form: "function calculateTotalPrice(price, taxRate) { return ...; }"
//   Arrow form: "const calculateTotalPrice = (price, taxRate) => ...;"
// - The arrow version drops the "function" keyword and is stored in a const,
//   so the name is a variable holding the function instead of a declared function.
// - With a single expression body the braces and the "return" keyword can be
//   omitted, because the expression is returned implicitly.
// - Function declarations are hoisted and can be called before their definition;
//   these const arrow functions must be defined before they are called.
// - Arrow functions do not have their own "this" or "arguments"; they inherit
//   "this" from the surrounding scope, which matters inside objects and classes.
