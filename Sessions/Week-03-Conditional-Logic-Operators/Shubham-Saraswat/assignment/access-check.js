let isLoggedIn = true;
let hasValidSession = true;

let accessGranted = isLoggedIn && hasValidSession;
let needsLogin = !isLoggedIn || !hasValidSession;

if (accessGranted) {
  console.log("Access Granted");
} else {
  console.log("Access Denied");
}

console.log("Needs to log in again:", needsLogin);
