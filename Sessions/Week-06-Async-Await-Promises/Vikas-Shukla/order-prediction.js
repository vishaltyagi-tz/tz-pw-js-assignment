console.log("--- Exercise 1: execution order ---");
console.log("A: first");
setTimeout(() => console.log("B: inside setTimeout(0)"), 0);
console.log("C: last line of the file");
// PREDICTION: A, C, B
// ACTUAL:     A, C, B
// WHY:        setTimeout is asynchronous and will be executed after the Console.log("C: last line of the file") is executed, 
//             even though it has a delay of 0 milliseconds.