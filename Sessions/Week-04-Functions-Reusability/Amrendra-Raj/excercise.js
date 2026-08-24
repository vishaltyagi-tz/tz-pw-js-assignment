

// Excercise 1 

function calculateTotal(price, quantity) {
  // TODO: return the total cost

  return price*quantity;

}

const a= calculateTotal(169,8);
console.log("--- Exercise 1: calculateTotal ---",a )


//Excercise 2 

const calculateTotalArrow = (price, quantity) => {
  // TODO: write the shorthand version here

  return price *quantity;

};

const b=calculateTotalArrow(100,5);
console.log("---Excercise 2: calculateTotalArrow---",b)

//excercise 3

function applyTax(price ,taxrate=5){
    return price+(price*taxrate/100);

}

console.log("--excercise 3:applytax--",applyTax(100,18));

//Excercise 4 


function formatProductLabel(name, category) {
  const capitalize = (word) => {
    if (!word) return ""; // Safety check for empty strings
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  // Capitalize both values and format them into the requested string template
  return `${capitalize(name)} (${capitalize(category)})`;
}

console.log("\n--- Exercise 4: formatProductLabel ---");
console.log(formatProductLabel("shoes", "footwear")); // Expected: "Shoes (Footwear)"
console.log(formatProductLabel("iPHoNe", "ELECTRONICS"))


//Excercise 5

function isValidPassword(password) {
  // Use >= and <= to include the boundaries 8 and 20
  return password.length >= 8 && password.length <= 20;
}

console.log("\n--- Exercise 5: isValidPassword ---");
console.log(isValidPassword("short"));                // expected: false
console.log(isValidPassword("goodPassword123"));      // expected: true
console.log(isValidPassword("12345678"));              // expected: true  (boundary: exactly 8)
console.log(isValidPassword("1234567")); 

//Excercise 6 

function average(...numbers) {
  // Edge case: if no numbers are passed, return 0 to avoid dividing by zero
  if (numbers.length === 0) return 0; 
  
  // Sum up all elements in the array
  const total = numbers.reduce((sum, num) => sum + num, 0);
  
  // Return the total divided by the count
  return total / numbers.length;
}

console.log("\n--- Exercise 6: average ---");
console.log(average(4, 8, 12));       // expected: 8
console.log(average(10));             // expected: 10


// Excercise 7 :

function runTest(description, actual, expected) {
  const pass = actual === expected;
  console.log(`${pass ? "PASS" : "FAIL"} - ${description} | got: ${actual}, expected: ${expected}`);
}

console.log("\n--- Exercise 7: Mini Test Suite ---");

// Test 1 (PASS): Checking Exercise 3 with default parameters
runTest("applyTax with default rate", applyTax(100), 105);

// Test 2 (PASS): Checking Exercise 5 boundary behavior
runTest("isValidPassword accepts exactly 8 characters", isValidPassword("12345678"), true);

// Test 3 (FAIL ON PURPOSE): Checking Exercise 6 with an incorrect expectation
runTest("average calculates values correctly", average(4, 8, 12), 999); 


//bonus excercise 


function checkout(items) {
  return items
    .map(item => calculateTotal(item.price, item.quantity))
    .reduce((total, itemTotal) => total + itemTotal, 0);
}

console.log("\n--- Bonus: checkout ---");
const cart = [
  { price: 50, quantity: 2 },
  { price: 20, quantity: 3 },
];
console.log(checkout(cart)); 