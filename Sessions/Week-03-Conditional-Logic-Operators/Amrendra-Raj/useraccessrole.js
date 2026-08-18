const isLoggedIn = true;
const hasValidSession = false;
const isGuestAllowed = true

if (isLoggedIn && hasValidSession) {
    console.log("Access Granted: Authentication successful.");
} else {
    console.log("Access Denied: You must log in and have a valid session.");
}
if ((isLoggedIn && hasValidSession) || isGuestAllowed) {
    console.log("Access Granted: Proceeding via Account or Guest Access.");
} else {
    console.log("Access Denied: Critical authentication missing.");
}