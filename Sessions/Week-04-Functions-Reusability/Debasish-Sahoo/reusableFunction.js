function calculateTotalPrice (price, taxRate) {
   return price + (price * taxRate/100)
}
console.log (calculateTotalPrice (1000, 20));

function userEmail (firstName, domain){
    return firstName + domain 
}
console.log (userEmail ("debasish", "@gmail.com"))