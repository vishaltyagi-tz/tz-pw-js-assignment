function calculateTotalPrice(price, taxRate) {
  return price + price * taxRate;
}

function generateUserEmail(firstName, domain) {
  return firstName.toLowerCase() + "@" + domain;
}

console.log("Total price:", calculateTotalPrice(100, 0.18));
console.log("Total price:", calculateTotalPrice(250, 0.05));

console.log("User email:", generateUserEmail("Avinsh.singh", "taazaa.com"));
console.log("User email:", generateUserEmail("Tester", "yopmail.org"));
