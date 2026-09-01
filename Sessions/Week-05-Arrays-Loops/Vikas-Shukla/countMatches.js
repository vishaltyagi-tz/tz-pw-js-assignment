//------------Create an array of 6 product titles and count how many titles have more than 8 characters------------

const productTitles = ["Smartphone", "Laptop", "Headphones", "Television", "Refrigerator", "Washing Machine"];
let count = 0;

for (let i = 0; i < productTitles.length; i++) {
    if (productTitles[i].length > 8) {
        count++;
    }
}
console.log("Numbers of product titles with more than 8 characters: " + count);



//---Create an array of 5 item names and use a for...of loop to print each item in uppercase.----

const itemNames = ["Table", "Chair", "Lamp", "Sofa", "Bookshelf"];
for (const item of itemNames) {
    console.log(item.toUpperCase());
}


//---Create an array of 7 numbers and calculate the total sum using a for loop-----

const numbers = [5, 10, 15, 20, 25, 30, 35];
let totalSum = 0;

for (let i = 0; i < numbers.length; i++) {
    totalSum += numbers[i];
}

console.log("Total sum of numbers: " + totalSum);



//-----Create an array of 6 product names and print only names that contain the word "Phone"-------

const productNames = ["Smartphone", "Laptop", "Headphones", "Television", "Refrigerator", "Washing Machine"];
for (let i = 0; i < productNames.length; i++) {
    if (productNames[i].includes("phone")) {
        console.log(productNames[i]);
    }
}

console.log("Product names containing 'phone': " + productNames.filter(name => name.includes("phone")).join(", "));




//-----Create an array of 5 bag product titles, add one new title, remove the first title, and then count how many remaining titles contain the word "Bag".----

const bagProductTitles = ["Backpack", "Handbag", "Messenger Bag", "Tote Bag", "Duffel Bag"];

bagProductTitles.push("Laptop Bag");
console.log("Updated Bag Product Titles: " + bagProductTitles);

bagProductTitles.shift();
console.log("After removing the first title: " + bagProductTitles);

let bagCount = 0;
for (const title of bagProductTitles) {
    if (title.includes("Bag")) {
        bagCount++;
    }
}

console.log("Number of remaining titles containing 'Bag': " + bagCount);

