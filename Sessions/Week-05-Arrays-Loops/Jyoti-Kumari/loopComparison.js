const products = ["Shirt", "Jeans", "Bag", "Shoes"];

// Using for loop with index
for (let i = 0; i < products.length; i++) {
    console.log(products[i]);
}

// Using for...of loop
for (const product of products) {
    console.log(product);
}

// Comparison:
// for loop uses the index to access each item.
// for...of directly gives us each item.
// for...of is simpler when we only need the values.