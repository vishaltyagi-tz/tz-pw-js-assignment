// ===== Variables, case sensitivity & equality =====
let age = 30, Age = 25, NAME = "John", newAge = 30;
console.log("age:", age);
console.log("Age:", Age);
console.log("NAME:", NAME);
console.log("newAge:", newAge);
console.log("age === Age:", age === Age); // false: JS identifiers are case-sensitive, so `age` and `Age` are different variables
console.log("age == Age:", age == Age); // false: == still compares values, but 30 !== 25
console.log("age === newAge:", age === newAge); // true: same type (number) and same value

// ===== == vs === (type coercion) =====
console.log('1 == "1":', 1 == "1"); // true: == coerces the string "1" to a number before comparing
console.log('1 === "1":', 1 === "1"); // false: === compares type and value, no coercion
console.log("0 == false:", 0 == false); // true: false is coerced to 0
console.log("null == undefined:", null == undefined); // true: special case, they're considered equal to each other...
console.log("null === undefined:", null === undefined); // ...but false: different types
console.log("NaN == NaN:", NaN == NaN); // false: NaN is never equal to anything, including itself
console.log("Number.isNaN(NaN):", Number.isNaN(NaN)); // true: the correct way to check for NaN

// ===== var vs let vs const =====
function varScopeDemo() {
  if (true) {
    var fn = "I leak out of the block"; // var is function-scoped, ignores block braces
    let ln = "I stay inside the block"; // let/const are block-scoped
  }
  console.log("fn (var, accessed outside block):", fn); // works: "I leak out of the block"
  try {
    console.log("ln (let, accessed outside block):", ln); // ReferenceError: ln is not defined
  } catch (e) {
    console.log("ln error:", e.message);
  }
}
varScopeDemo();

console.log("typeof hoistedVar (before declaration line):", typeof hoistedVar); // "undefined": var declarations are hoisted, but not their assignment
var hoistedVar = "assigned later";
try {
  console.log("hoistedLet (before declaration line):", hoistedLet); // ReferenceError: let/const are hoisted too, but land in the "temporal dead zone"
} catch (e) {
  console.log("hoistedLet error:", e.message);
}
let hoistedLet = "also assigned later";

const obj = { key: "value" };
obj.key = "updated"; // allowed: const only prevents reassigning the binding, not mutating the object
console.log("obj after mutating a const object:", obj);
try {
  obj = {}; // TypeError: assignment to constant variable
} catch (e) {
  console.log("obj reassignment error:", e.message);
}

// ===== Closures =====
function makeCounter() {
  let count = 0; // captured by the inner function's closure, private to each counter
  return function () {
    count += 1;
    return count;
  };
}
const counterA = makeCounter();
const counterB = makeCounter();
console.log("counterA() call 1:", counterA()); // 1
console.log("counterA() call 2:", counterA()); // 2
console.log("counterB() call 1:", counterB()); // 1: independent closure, its own `count`

// Classic loop + closure gotcha
var varFns = [];
for (var i = 0; i < 3; i++) {
  varFns.push(() => i); // all three closures share the same `i` (var is function-scoped)
}
console.log("varFns results (var in loop):", varFns.map((fn) => fn())); // [3, 3, 3]

let letFns = [];
for (let j = 0; j < 3; j++) {
  letFns.push(() => j); // each iteration gets its own `j` (let is block-scoped)
}
console.log("letFns results (let in loop):", letFns.map((fn) => fn())); // [0, 1, 2]

// ===== `this` binding =====
const person = {
  name: "Alice",
  regularGreet: function () {
    return `Hi, I'm ${this.name}`; // regular function: `this` is the object that called it
  },
  arrowGreet: () => {
    return `Hi, I'm ${this.name}`; // arrow function: `this` is inherited from the surrounding scope, not `person`
  },
};
console.log("person.regularGreet():", person.regularGreet()); // "Hi, I'm Alice"
console.log("person.arrowGreet():", person.arrowGreet()); // "Hi, I'm undefined"

const detachedGreet = person.regularGreet;
try {
  console.log("detachedGreet() (this lost):", detachedGreet()); // TypeError in strict mode, or "Hi, I'm undefined" otherwise: `this` is lost once detached
} catch (e) {
  console.log("detachedGreet() error:", e.message);
}

// ===== Objects & arrays are reference types =====
const original = { value: 1 };
const copy = original; // copies the reference, not the object
copy.value = 99;
console.log("original.value after mutating copy:", original.value); // 99: both variables point to the same object

const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // spread creates a new (shallow) array
arr2.push(4);
console.log("arr1 after arr2.push (spread copy):", arr1); // [1, 2, 3]: untouched
console.log("arr2 after push:", arr2); // [1, 2, 3, 4]

// ===== Falsy values & truthy surprises =====
const falsyValues = [false, 0, "", null, undefined, NaN];
console.log("falsyValues as booleans:", falsyValues.map(Boolean)); // [false, false, false, false, false, false]
console.log('Boolean("0") (non-empty string):', Boolean("0")); // true: non-empty string, even "0", is truthy
console.log("Boolean([]) (empty array):", Boolean([])); // true: empty array is truthy
console.log("Boolean({}) (empty object):", Boolean({})); // true: empty object is truthy
console.log("[] == false (coercion chain):", [] == false); // true: [] coerces to "" then to 0

// ===== Floating point precision =====
console.log("0.1 + 0.2:", 0.1 + 0.2); // 0.30000000000000004: binary floating point can't represent 0.1 exactly
console.log("0.1 + 0.2 === 0.3:", 0.1 + 0.2 === 0.3); // false
console.log("safe float comparison via Number.EPSILON:", Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true: the safe way to compare floats

// ===== Async & the event loop =====
console.log("1: sync start");
setTimeout(() => console.log("4: setTimeout (macrotask)"), 0);
Promise.resolve().then(() => console.log("3: promise.then (microtask)"));
console.log("2: sync end");
// Output order: 1, 2, 3, 4 — microtasks (promises) always run before the next macrotask (setTimeout), even with a 0ms delay
