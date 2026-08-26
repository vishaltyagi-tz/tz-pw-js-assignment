// Here i am trying to create a function execute that and pass the value to another function.
// Also i am trying to return more than one value from function
function vehicleModel( modelName , price, rtoTax = 18)
{
    return [price + ((rtoTax/100)* price), modelName];

}

function totalEMI(price, months)
{
    let EMI = price /months;
    return EMI;

}

const [finalPrice, modelName] = vehicleModel("TATA Punch,", 900000, 18);
console.log("For Your car " + modelName + " Final EMI per Month is: " + totalEMI(finalPrice, 36));