// Regular function declarations
function calculateTotalPrice(price, taxRate) {
  return price + price * taxRate;
}

function generateUserEmail(firstName, domain) {
  return firstName.toLowerCase() + "@" + domain + ".com";
}

console.log(calculateTotalPrice(500, 0.1));
console.log(generateUserEmail("Jyoti", "taazaa"));

// Arrow function versions
const calculateTotalPriceArrow = (price, taxRate) => price + price * taxRate;

const generateUserEmailArrow = (firstName, domain) =>
  firstName.toLowerCase() + "@" + domain + ".com";

console.log(calculateTotalPriceArrow(500, 0.1));
console.log(generateUserEmailArrow("Jyoti", "taazaa"));

// Comparison:
// Regular functions use the "function" keyword and their own body braces/return statement.
// Arrow functions are shorter, use "=>", and can skip braces/return for a single expression.
// Arrow functions also don't have their own "this", unlike regular functions.
