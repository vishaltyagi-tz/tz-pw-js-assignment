console.log("--- Exercise 1: execution order ---");
console.log("A: first");
setTimeout(() => console.log("B: inside setTimeout(10)"), 10);
console.log("C: last line of the file");