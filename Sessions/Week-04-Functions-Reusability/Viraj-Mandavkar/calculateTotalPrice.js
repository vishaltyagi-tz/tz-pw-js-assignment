let bricks=2650;
let cement=6500;

function calculateTotalPrice(priceOfBricks, priceOfCement) {
    return priceOfBricks + priceOfCement;
}

console.log(calculateTotalPrice(bricks, cement));
// I changes the values here and call function
bricks=3500;
cement=7500;

console.log(calculateTotalPrice(bricks , cement));

//What if i pass string in function

console.log(calculateTotalPrice("String1", "String2"));