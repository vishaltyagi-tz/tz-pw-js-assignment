const MIN_LENGTH = 8; 
function isValidPassword(password) {
  return password.length >= MIN_LENGTH;
}

console.log(isValidPassword("abc123"));         
console.log(isValidPassword("password1"));      
console.log(isValidPassword("Taazaa@2026"));