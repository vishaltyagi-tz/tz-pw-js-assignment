let isLoggedIn = true;
let hasValidSession = true;

//And Operator
if (isLoggedIn && hasValidSession){
    console.log("Access Granted");
}else{
    console.log("Access Denied");
}

//OR Opertaor
if (isLoggedIn || hasValidSession){
    console.log("Access Granted");
}else{
    console.log("Access Denied");
}

