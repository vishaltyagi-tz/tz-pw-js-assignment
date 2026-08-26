function printUserPermissions(userRole) {
  if (userRole === "Admin") {
    console.log(`Role: ${userRole} -> Permission Level: Full access [create, edit, delete]`);
  } else if (userRole === "Tester") {
    console.log(`Role: ${userRole} -> Permission Level: Read & Write access [create, edit]`);
  } else if (userRole === "Guest") {
    console.log(`Role: ${userRole} -> Permission Level: Read-only access`);
  } else {
    // Task 2: handle any role value that isn't Admin/Tester/Guest
    console.log(`Role: ${userRole} -> Permission Level: Unrecognized role, no permissions granted`);
  }
}

printUserPermissions("Admin");
printUserPermissions("Tester");
printUserPermissions("Guest");
printUserPermissions("Manager");

