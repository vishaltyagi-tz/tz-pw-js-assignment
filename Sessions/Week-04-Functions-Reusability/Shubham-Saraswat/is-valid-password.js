const MIN_PASSWORD_LENGTH = 8;

function isValidPassword(password) {
  return password.length >= MIN_PASSWORD_LENGTH;
}

console.log("abc123 ->", isValidPassword("abc123"));
console.log("Taazaa@2026 ->", isValidPassword("Taazaa@2026"));
console.log("pass1234 ->", isValidPassword("pass1234"));
