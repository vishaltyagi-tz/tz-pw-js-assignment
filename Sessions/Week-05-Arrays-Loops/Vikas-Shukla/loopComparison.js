//---Print the same array twice - once with a `for` loop using the index, once with `for...of` - and compare them in a comment.----

const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
console.log("Using for loop with index:");
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);

}
 console.log("using for ...of loop:");
for (const fruit of fruits) {
    console.log(fruit);
}

// Comparison: Both loops print the same elements of the array. The `for` loop with index gives more control over the iteration, while the `for...of` loop is more concise and easier to read when you don't need the index.