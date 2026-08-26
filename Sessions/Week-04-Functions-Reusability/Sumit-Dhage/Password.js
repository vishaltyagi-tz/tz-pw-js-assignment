function isValidPassword(password){
    return password.length >= 8;

}
console.log(isValidPassword("hello"));
console.log(isValidPassword("password"))
console.log(isValidPassword("Javascript@learning"))