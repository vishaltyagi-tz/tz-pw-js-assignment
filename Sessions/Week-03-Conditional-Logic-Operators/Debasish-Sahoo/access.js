// let userRole = "Admin";

// switch (userRole) {
//   case "Admin":
//     console.log(
//       "Full access of Read and Write permissions granted.",
//     );
//     break;
//   case "Tester":
//     console.log(
//       "Full access of Read and limited Write permissions granted.",
//     );
//     break;
//   case "Guest":
//     console.log("Access of Read-only permissions granted.");
//     break;
//   default:
//     console.log("Access Denied.");
// }


let userRole = "guest";
if (userRole === "admin"){
    console.log ("Read, Write, Delete, Manage: Permissions granted")
} else if ( userRole === "tester"){
    console.log ("Read, Write: Permissions granted")
} else if ( userRole === "guest"){
    console.log ("Read: Permission granted")
} else {
    console.log ("No Permission granted")
}