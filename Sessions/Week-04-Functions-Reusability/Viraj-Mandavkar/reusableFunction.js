function generateUserEmail (firstName , lastName, domain)
{
    return firstName + lastName + "@" + domain +  ".com"
}

function generateUserID (city , number)
{
return city + " " + number
}

const userID= generateUserID("Pune", 111);
const userEmail= generateUserEmail("viraj","mandavkar","taazaa");


console.log(userEmail);
console.log(userID);

