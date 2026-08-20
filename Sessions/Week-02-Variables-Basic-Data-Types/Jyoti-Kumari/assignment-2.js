// 1. Declare a variable using let named studentName and assign your name to it. Print it using console.log().
let studentName = "Jyoti Kumari";
console.log(studentName);

// 2. Declare a variable using const named birthYear and assign your birth year to it. Try to reassign it and observe what happens.
const birthYear = 1998;
console.log(birthYear);
try {
  birthYear = 2000;
} catch (error) {
  console.log("Error: Cannot reassign a const variable ->", error.message);
}

// 3. Create two number variables named num1 and num2. Calculate and print their sum, difference, product, and division result.
let num1 = 20;
let num2 = 5;
console.log("Sum:", num1 + num2);
console.log("Difference:", num1 - num2);
console.log("Product:", num1 * num2);
console.log("Division:", num1 / num2);

// 4. Create a string variable named courseName with the value JavaScript Basics. Print the sentence: I am learning JavaScript Basics.
let courseName = "JavaScript Basics";
console.log("I am learning " + courseName + ".");

// 5. Create two string variables named firstName and lastName. Combine them into a new variable named fullName and print the full name.
let firstName = "Jyoti";
let lastName = "Kumari";
let fullName = firstName + " " + lastName;
console.log(fullName);

// 6. Create a number variable named marks. Create a boolean variable named isPassed that stores whether marks are greater than or equal to 40.
let marks = 75;
let isPassed = marks >= 40;
console.log("Is Passed:", isPassed);

// 7. Create a variable named city and assign your city name. Use string concatenation to print: I live in [your city].
let city = "Noida";
console.log("I live in " + city + ".");

// 8. Create a variable named age. Use a comparison operator to check whether the age is greater than or equal to 18, and store the result in a boolean variable named canVote.
let age = 27;
let canVote = age >= 18;
console.log("Can Vote:", canVote);

// 9. Create a variable named productPrice and another named quantity. Calculate the total price and print a message like: Total price is 500.
let productPrice = 100;
let quantity = 5;
let totalPrice = productPrice * quantity;
console.log("Total price is " + totalPrice + ".");

// 10. Create a short self-introduction using variables for name, age, city, and course. Join them using string concatenation and print the final sentence.
let course = "JavaScript Basics";
console.log(
  "Hi, my name is " +
    studentName +
    ". I am " +
    age +
    " years old, I live in " +
    city +
    ", and I am currently learning " +
    course +
    "."
);
