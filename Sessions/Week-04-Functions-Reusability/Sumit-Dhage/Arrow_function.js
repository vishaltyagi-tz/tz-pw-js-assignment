const calculateTotalPriceArrow = (price, taxRate) =>{

    const taxAmount = price*(taxRate/100);

    return price+taxAmount;

};
const generateUserEmailArrow =(firstName ,lastName, domain) =>{

    //return '${firstName.toLowerCase()}@${domain}';
    return firstName.toLowerCase()+"."+ lastName.toLowerCase()+"@"+domain; 

};
 console.log(calculateTotalPriceArrow(2000,18));
 console.log(generateUserEmailArrow("sumit","Dhage","taazaa.com"));