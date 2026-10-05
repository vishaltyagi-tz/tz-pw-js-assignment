function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User data received");
        }, 2000);
    });
}

function fetchOrderData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Order data received");
        }, 2000);
    });
}

async function getData() {
    const startTime = Date.now();

    const [userData, orderData] = await Promise.all([
        fetchUserData(),
        fetchOrderData()
    ]);

    console.log(userData);
    console.log(orderData);

    const endTime = Date.now();

    const totalTime = endTime - startTime;

    console.log(`Total time: ${totalTime} ms`);
}

getData();