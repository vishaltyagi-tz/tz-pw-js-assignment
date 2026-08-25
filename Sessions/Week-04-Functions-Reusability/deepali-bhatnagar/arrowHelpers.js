const calculateTotalPrice = (price, taxRate) => price + price * taxRate;
 
const generateUserEmail = (firstName, domain) => `${firstName.toLowerCase()}@${domain}`;
 
console.log(calculateTotalPrice(100, 0.19)); 
console.log(calculateTotalPrice(250, 0.06)); 
console.log(generateUserEmail("Deepali", "taazaa.com"));
console.log(generateUserEmail("John", "example.com")); 