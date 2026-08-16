//--------use && Operator----------------------------

{
    let userLoggedIn = true;
    let userHasValidSession = true;
    if (userLoggedIn && userHasValidSession) {
        console.log(`Access Granted`);
    } else {
        console.log(`Access Denied`);
    }
}


//--------use || Operator----------------------------

{
    let userLoggedIn = true;
    let userHasValidSession = false;
    if (userLoggedIn || userHasValidSession) {
        console.log("Access Granted");
    } else {
        console.log("Access Denied");
    }
}