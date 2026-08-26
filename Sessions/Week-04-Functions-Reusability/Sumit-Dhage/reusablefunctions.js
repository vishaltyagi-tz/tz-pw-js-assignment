function calculateTotalPrice (price ,taxRate)
{
    const taxAmount = price*(taxRate/100);

    return price + taxAmount;
}

function generateUserEmail(firstName, lastName, domain)
{

    //'${firstName.toLowerCase()}@${domain}';
    return firstName.toLowerCase()+"."+ lastName.toLowerCase()+"@"+domain; 
}

console.log(calculateTotalPrice(1000 ,18));
console.log(generateUserEmail("Sumit", "Dhage", "taazaa.com"));