//--------------Create an array of 5 city names and print each city using a for loop.-------------------
const cities = ["Noida", "Delhi", "Mumbai", "Bangalore", "Chennai"];
for (let i = 0; i < cities.length; i++) {
    console.log(cities[i]);
}



//------------Create an array of 6 product prices and print only prices greater than 500-------------

const productPrices = [250, 600, 450, 800, 300, 1000];
for (let i = 0; i < productPrices.length; i++) {
    if (productPrices[i] > 500) {
        console.log(productPrices[i]);
    }
}




//-----------------Create an array of 5 student names and print the first and last name using indexing--------------

const studentNames = ["Vikas ", "Rohit", "Anjali", "Priya", "Amit"];
console.log("First student name: " + " " + studentNames[0]);
console.log("Last student name: " + " " + studentNames[studentNames.length - 2]);




