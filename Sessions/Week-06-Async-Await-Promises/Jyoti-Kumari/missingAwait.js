function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User data received");
        }, 2000);
    });
}

async function getUserData() {
    return await fetchUserData();
}

const result = getUserData();

console.log(result);

// Because getUserData() is an async function, it always returns a Promise.
// Without await, the Promise is still pending because the data takes 2 seconds to arrive.
// Therefore, console.log(result) prints: Promise { <pending> }