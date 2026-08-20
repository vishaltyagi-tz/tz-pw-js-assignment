let bricks=2650;
let cement=6500;

function total(priceOfBricks , priceOfCement)
{
    return priceOfBricks+priceOfCement;

}

console.log(total(bricks, cement));
// I changes the values here and call function
bricks=3500;
cement=7500;

console.log(total(bricks , cement));

//What if i pass string in function

console.log(total("String1", "String2"));