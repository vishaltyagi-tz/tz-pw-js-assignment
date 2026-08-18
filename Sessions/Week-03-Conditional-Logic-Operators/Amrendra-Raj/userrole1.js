const userRole = 'Tester'; 

if (userRole === 'Admin') {
    console.log("Permission Level: Full Access (Manage users, settings, and code bases).");
} else if (userRole === 'Tester') {
    console.log("Permission Level: QA Access (Execute tests, view reports, and log defects).");
} else if (userRole === 'Guest') {
    console.log("Permission Level: Read-Only Access (View dashboards and public pages).");
} else {
    console.log("Permission Level: Access Denied. Unknown user role.");
}