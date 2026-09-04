const productTitles = [
  "Wireless Headphones",
  "Gaming Keyboard",
  "Smart Watch",
  "Laptop Stand"
];
 
console.log("--- Exercise 1: indexing ---");
 
// Print the FIRST title
console.log(productTitles[0]);
 
// Print the LAST title
console.log(productTitles[productTitles.length - 1]);
 
// Print how many titles there are
console.log(productTitles.length);
 
 
/* --------------------------------------------------
   EXERCISE 2 - Classic for loop
   Print only titles LONGER than 10 characters
-------------------------------------------------- */
 
console.log("--- Exercise 2: for loop ---");
 
for (let i = 0; i < productTitles.length; i++) {
  if (productTitles[i].length > 10) {
    console.log(productTitles[i]);
  }
}