let userRole = "Tester";

if (userRole === "Admin") {
  console.log("Permission level: Full access - create, read, update, and delete.");
} else if (userRole === "Tester") {
  console.log("Permission level: Read and execute tests - cannot delete records.");
} else if (userRole === "Guest") {
  console.log("Permission level: Read only.");
} else {
  console.log("Unrecognized role: " + userRole + ". No permissions assigned.");
}
