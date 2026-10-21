function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Unable to fetch user data");
        }, 2000);
    });
}

async function getUserData() {
    try {
        const result = await fetchUserData();

        console.log(result);
    } catch (error) {
        console.log("Sorry, we could not fetch the user data.");
    }
}

getUserData();

// Without try/catch, the rejected Promise would cause an unhandled error
// instead of showing a friendly message.