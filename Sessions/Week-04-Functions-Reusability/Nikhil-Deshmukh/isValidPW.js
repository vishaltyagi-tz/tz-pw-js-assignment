const password_length = 6;

function isValidPW(password){
    return password.length >= password_length;
}
console.log("test@123 ->", isValidPW("test@1234"));
console.log("nd@123 ->", isValidPW ("nd@123"));
console.log("pd@sm ->", isValidPW ("pd@sm"));
console.log("TZ01 ->", isValidPW ("tz01"));