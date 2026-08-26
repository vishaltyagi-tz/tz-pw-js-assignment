function calculateTotalPrice(price, taxRate) {
  return price + price * taxRate;
}
 
function generateUserEmail(firstName, domain) {
  return `${firstName.toLowerCase()}@${domain}`;
}
 
console.log(calculateTotalPrice(100, 0.18));
console.log(calculateTotalPrice(250, 0.05)); 
console.log(generateUserEmail("Deepali", "taazaa.com")); 
console.log(generateUserEmail("John", "example.com"));