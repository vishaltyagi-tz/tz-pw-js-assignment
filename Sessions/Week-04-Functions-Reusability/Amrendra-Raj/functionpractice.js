function greetUser(name) {
  return "Welcome, " + name + "!";
}
 
a= greetUser("Aisha"); 

console.log(a);
const calculate = (price, discountPercent) => {
  const discount = price * (discountPercent / 100);
  const finalPrice = price - discount;
  return finalPrice;
};
 
const result= calculate(1000, 20); 
console.log(result);



const isEven = (num) => num % 2 === 0;
console.log(isEven(9001))


const square = (n) => n * n;
 
function sumOfSquares(a, b) {
  return square(a) + square(b);
}
 
const b=sumOfSquares(3, 4); 
console.log(b);


