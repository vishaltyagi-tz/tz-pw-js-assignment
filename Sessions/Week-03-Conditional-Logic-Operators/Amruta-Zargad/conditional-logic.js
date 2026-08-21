let usertype="ops";

switch(usertype){
    case "Admin":
        console.log("All permissions granted");
        break;
    
    case "Tester":
        console.log("Read and Publish access");
        break;

    case "Guest":
        console.log("Read only permission");
        break;

        default:
            console.log("No permission granted");
}

// Extend the script with an else if chain to also handle an unrecognized role value.
let user="Tester";

if(user==="Admin")
    {
    console.log("All permissions granted")
}
else if(user==="Tester")
    {
    console.log("Read and Publish access")
}
else if (user==="Guest")
{
    console.log("Read only permission")
}
else {
    console.log("No permission granted")
}

// Write a second script using && and || to check if a user isLoggedIn AND hasValidSession, printing 'Access Granted' or 'Access Denied'

let isLoggedIn= true;
let hasValidSession=false;

// AND Logic

if ( isLoggedIn && hasValidSession)
{
    console.log("Access Granted")
}
else {
    console.log("Access Denied")
}

// OR Logic

if ( isLoggedIn || hasValidSession)
{
    console.log("Access Granted")
}
else {
    console.log("Access Denied")
}