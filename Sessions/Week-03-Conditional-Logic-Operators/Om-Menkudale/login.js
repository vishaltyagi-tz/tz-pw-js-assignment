let isLoggedIn= true;
let hasValidSession=true;

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