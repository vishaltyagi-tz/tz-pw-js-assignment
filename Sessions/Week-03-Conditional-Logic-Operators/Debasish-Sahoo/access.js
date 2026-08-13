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