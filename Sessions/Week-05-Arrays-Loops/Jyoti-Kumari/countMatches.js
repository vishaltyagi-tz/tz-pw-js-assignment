const products = [
  "Red Shirt",
  "Blue Jeans",
  "Black Bag",
  "White Shoes",
  "Green Shirt",
  "Laptop Bag"
];

let shirtCount = 0;
let bagCount = 0;

for (const product of products) {

  if (product.includes("Shirt")) {
    shirtCount++;
  } 
  else if (product.includes("Bag")) {
    bagCount++;
  }
}

console.log("Shirt count:", shirtCount);
console.log("Bag count:", bagCount);
