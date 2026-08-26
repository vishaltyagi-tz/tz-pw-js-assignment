//Write a isValidPassword(password) function that returns true/false based on a minimum length rule, and call it with 3 different test values.
function isValidPassword(password) {
    const minLength = 8;
    return password.length >= minLength;
}
console.log(isValidPassword("P@ssword"));
console.log(isValidPassword("test@12"));
