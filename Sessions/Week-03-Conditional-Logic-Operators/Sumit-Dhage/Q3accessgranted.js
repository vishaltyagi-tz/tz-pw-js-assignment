let isLoggedin = true;
let hasValidsession = false;

if (isLoggedin && hasValidsession){
    console.log("Access Granted");
} else if (isLoggedin || hasValidsession){
console.log("Access denied");

}