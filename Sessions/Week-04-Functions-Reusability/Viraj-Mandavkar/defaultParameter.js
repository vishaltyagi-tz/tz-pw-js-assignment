function tax (price, taxRate = 55) 
// I define the value of the variable in fuction
{
    let deduction = 12;
 return price + (taxRate/100) - deduction
}

console.log(tax(1234));
