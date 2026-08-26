//Write a script that takes a user role variable ('Admin', 'Tester', 'Guest') and prints appropriate permission levels using switch
let usertype="Tester";

switch(usertype){
    case "Admin":
        console.log("All permissions granted");
        break;
    
    case "Tester":
        console.log("Read and Publish access");
        break;

    case "Guest":
        console.log("Read only permission");
        break;

        default:
            console.log("No permission granted");
}