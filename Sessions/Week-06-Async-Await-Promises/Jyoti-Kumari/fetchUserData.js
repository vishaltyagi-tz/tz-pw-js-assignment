function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User data received");
        }, 2000);
    });
}

async function getUser() {
    const result = await fetchUserData();

    console.log(result);
}

getUser();