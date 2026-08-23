//Write reusable helper functions: calculateTotalPrice(price, taxRate) and generateUserEmail(firstName, domain).



function calculateTotalPrice(price, taxRate) {
    return price + (price*taxRate);
}

function generateUserEmail(firstName, lastName, domain) {
    return firstName.toLowerCase()+"."+ lastName.toLowerCase()+"@"+domain; 
}

console.log(calculateTotalPrice(100,0.05));
console.log(calculateTotalPrice(250,0.15));
console.log(generateUserEmail("OM", "MenKUDALe", "taazaa.com" ));
console.log(generateUserEmail("AkshaY","ChowDHAri","taazaa.com"));