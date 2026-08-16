
//------------using if else statement-----------//

let userRole = 'SuperAdmin';
if (userRole === 'Admin') {
    console.log("Read, Write, Delete");
} else if (userRole === 'Tester') {
    console.log('Read, Write');
} else if (userRole === 'Guest') {
    console.log('Read');
} else {
    console.log('Unrecognized role value');
}

//-----------using switch statement-----------//

let userRole = 'SuperAdmin';
switch (userRole) {
    case "Admin":
        console.log("Admin Access");
        break;
        case "Tester":
            console.log("Tester Access");
            break;
            case "Guest":
                console.log("View Access");
                break;
                default:
                    console.log("Unrecognized role value");
}
    