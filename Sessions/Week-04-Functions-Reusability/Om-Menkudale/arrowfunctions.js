//Rewrite both functions as arrow functions and compare the syntax in a comment
//function calculateTotalPrice(price, taxRate) {
//   return price + (price*taxRate);

//function generateUserEmail(firstName, lastName, domain) {
 //   return firstName.toLowerCase()+"."+ lastName.toLowerCase()+"@"+domain; 


    const calculateTotalPrice = (price, taxrate) => price + (price * taxrate);

    const generateUserEmail = (firstName, lastName, domain) => firstName.toLowerCase()+"."+lastName.toLowerCase()+"@"+domain.toLowerCase();

    console.log(calculateTotalPrice(150,0.05));
    console.log(generateUserEmail("OM","MenkuDALE","taaZaa.COM"));
    console.log(calculateTotalPrice(500000,0.15));
    console.log(generateUserEmail("Abhishek","KumBHAr","taaZaa.COM"));