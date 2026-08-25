function tax (price, taxRate = 55)
{
    let deduction = 12;
 return price + (taxRate/100) - deduction
}

console.log(tax(1234));
