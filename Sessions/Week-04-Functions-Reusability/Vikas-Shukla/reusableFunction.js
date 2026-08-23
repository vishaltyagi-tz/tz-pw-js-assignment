
//-----------reusable Helper Functions------------------------

function calculateTotalPrice(price, taxRate) {
    return price + price * taxRate;
}


function generateUserEmail(firstName, domain) {
    const cleanedFirstName = firstName.trim().toLowerCase();
    return `${cleanedFirstName}@${domain}`;
}

console.log(calculateTotalPrice(100, 0.1));
console.log(generateUserEmail("Vikas", "taazaa.com"));