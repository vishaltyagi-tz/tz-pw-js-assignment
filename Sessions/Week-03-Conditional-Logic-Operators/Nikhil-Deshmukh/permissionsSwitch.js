let userRole = "Tester";

switch(userRole){
    case("Admin"):
    console.log("All access granted");
    break;
    case("Tester"):
    console.log("Limited access granted");
    break;
    case("Guest"):
    console.log("Only view access granted");
    default:
    console.log("No access");
}