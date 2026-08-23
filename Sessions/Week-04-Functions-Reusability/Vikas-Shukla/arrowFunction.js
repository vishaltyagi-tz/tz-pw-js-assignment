//-----------arrow functions and compare the syntax in a comment.-----------

// Comparison:
// - `function name(...) {}` is hoisted (usable before its definition) and can be called with `new`.
// - `const name = (...) => {}` is not hoisted (must be defined before use) and has no `this` of its own,
//   so it's shorter for simple one-line logic but not a drop-in replacement in every case.

const calculateTotalPriceArrow = (price, taxRate) => price + price * taxRate;

console.log(calculateTotalPriceArrow(100, 0.0988));

const generateUserEmailArrow = (firstName, domain) => {
    const cleanedFirstName = firstName.trim().toLowerCase();
    return `${cleanedFirstName}@${domain}`;
};

console.log(generateUserEmailArrow("vikas", "taazaa.com"));