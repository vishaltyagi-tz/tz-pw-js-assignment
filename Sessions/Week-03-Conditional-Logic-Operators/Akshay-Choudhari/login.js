let isLoggedIn= true;
hasValidSession= false;
console.log(" And condition");
if(isLoggedIn && hasValidSession){
    console.log("Access Granted");
}else{
    console.log("Access Denied");
}

console.log(" Or condition");
if(isLoggedIn || hasValidSession){
    console.log("Access Granted");
}else{
    console.log("Access Denied");
}