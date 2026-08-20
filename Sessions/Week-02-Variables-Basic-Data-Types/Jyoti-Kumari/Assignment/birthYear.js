const birthYear = 1998;
console.log(birthYear);

// Reassigning a const throws a TypeError at runtime
try {
  birthYear = 2000;
} catch (error) {
  console.log("Error: Cannot reassign a const variable ->", error.message);
}
