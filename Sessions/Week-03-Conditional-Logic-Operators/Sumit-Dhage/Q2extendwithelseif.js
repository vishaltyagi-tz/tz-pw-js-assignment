let userRole = "" ; 
if (userRole === "Admin") {
  console.log(" Full Access");
} else if (userRole === "Tester") {
  console.log("Moderate Access");
} else if (userRole === "Guest") {
  console.log("Low Access (Read-Only)");
} else {
  console.log("None (Unrecognized Role)");
}