// EXERCISE 6 — The missing await bug
//    Call fetchUserData() WITHOUT await and log the result.
//    Paste the output and explain it. This exact mistake will cost
//    you an hour in Playwright one day — learn it now.



async function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Vikas", role: "SDET 2" });
        }, 2000);
    });
}

const userData = fetchUserData(); // Missing await here
console.log(userData); // Logs a Promise object instead of the resolved value

// OUTPUT: Promise { <pending> }
// WHY:    The function fetchUserData() returns a Promise, and without using await, 
//         the code logs the Promise object itself instead of waiting for it to resolve. 
//         This is a common mistake when working with async functions, as it can lead to 
//         unexpected behavior if the resolved value is needed immediately.

