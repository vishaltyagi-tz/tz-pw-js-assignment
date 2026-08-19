let userrole= "Tester";
if(userrole== "Admin"){
    console.log("Permision Granted= Read, write, Edit, Delete");
}else if(userrole= "Tester"){
    console.log("Permision Granted= Read, write, Edit");
}else if(userrole= "Guest"){
    console.log("Permision Granted= Read only");
}else{
    console.log("Unauthorised Person");
}

//console.log("Using switch")
console.log("Switch");
let role= "Guest";
switch(role){
    case "Admin":
        console.log("Permision Granted= Read, write, Edit, Delete");
    break;
    case "Tester":
        console.log("Permision Granted= Read, write, Edit");
    break;
    case "Guest":
        console.log("Permision Granted= Read only");
    break;
    default:
        console.log("Unauthorised Person");
}