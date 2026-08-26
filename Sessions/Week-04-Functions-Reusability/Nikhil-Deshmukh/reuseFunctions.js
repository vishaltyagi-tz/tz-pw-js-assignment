function generateUserEmail (firstName , lastName, domain)
{
    return firstName + "." + lastName + "@" + domain +  ".com"
}

function generateUserID (city , number)
{
return city + " " + number
}

const userID= generateUserID("Pune", 100);
const userEmail= generateUserEmail("nikhil","deshmukh","taazaa");


console.log(userEmail);
console.log(userID);
