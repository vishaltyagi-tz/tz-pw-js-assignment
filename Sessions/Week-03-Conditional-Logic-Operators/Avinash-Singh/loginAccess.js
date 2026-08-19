let isLoggedIn = true;
let hasValidSession = false;

/*AND Logic*/

if (isLoggedIn && hasValidSession) {
  console.log("Access granted.");
} else {
  console.log("Access denied.");
}

/*OR Logic*/

if (isLoggedIn || hasValidSession) {
  console.log("Access granted.");
} else {
  console.log("Access denied.");
}
