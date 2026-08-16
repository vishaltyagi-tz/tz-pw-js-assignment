//Write a script that takes a user role variable ('Admin', 'Tester', 'Guest') and prints appropriate permission levels using conditional logic.

let usertype="tester";

if(usertype==="Admin")
    {
    console.log("All permissions granted")
}
else if(usertype==="Tester")
    {
    console.log("Read and Publish access")
}
else if (usertype==="Guest")
{
    console.log("Read only permission")
}
else {
    console.log("No permission granted")
}