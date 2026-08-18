/* With Array and For Loop */

// let userRole = ["Admin", "Tester", "Guest"];
// for (let i = 0; i <= userRole.length; i++) {
//   if (userRole[i] === "Admin") {
//     console.log(
//       "You have full access to the system with Read and Write permissions.",
//     );
//   } else if (userRole[i] === "Tester") {
//     console.log(
//       "You have full access to the system with Read and limited Write permissions.",
//     );
//   } else if (userRole[i] === "Guest") {
//     console.log("You have access to the system with Read-only permissions.");
//   } else {
//     console.log("You do not have access to the system.");
//   }
// }

/* With elseif condition */

// let userRole = "Admin";

// if (userRole === "Admin") {
//   console.log(
//     "You have full access to the system with Read and Write permissions.",
//   );
// } else if (userRole === "Tester") {
//   console.log(
//     "You have full access to the system with Read and limited Write permissions.",
//   );
// } else if (userRole === "Guest") {
//   console.log("You have access to the system with Read-only permissions.");
// } else {
//   console.log("You do not have access to the system.");
// }

/* With Switch Case */

let userRole = "Admin";

switch (userRole) {
  case "Admin":
    console.log(
      "You have full access to the system with Read and Write permissions.",
    );
    break;
  case "Tester":
    console.log(
      "You have full access to the system with Read and limited Write permissions.",
    );
    break;
  case "Guest":
    console.log("You have access to the system with Read-only permissions.");
    break;
  default:
    console.log("You do not have access to the system.");
}
