let isLoggedIn = true;
let hasValidSession = false;

if (isLoggedIn && hasValidSession){
    console.log("Your access is Granted");
} else if (isLoggedIn || hasValidSession){
    console.log("Your access is Denied");
}