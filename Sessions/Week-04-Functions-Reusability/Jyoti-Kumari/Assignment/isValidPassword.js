function isValidPassword(password) {
  const minLength = 8;
  return password.length >= minLength;
}

console.log(isValidPassword("abc123"));
console.log(isValidPassword("password123"));
console.log(isValidPassword("Jyoti@2026"));
