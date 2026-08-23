function isValidPassword(password) {
    return password.length >= 8 && password.length <= 20;
}

 console.log(isValidPassword('mypassword123'));
 console.log(isValidPassword('keshav'));
 console.log(isValidPassword('thisisaverylongpasswordthatexceedstwentycharacters'));
 console.log(isValidPassword("a".repeat(8)));
