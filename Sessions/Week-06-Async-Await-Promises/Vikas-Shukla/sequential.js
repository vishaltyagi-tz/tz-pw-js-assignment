// EXERCISE 3 — Sequential awaits
//    Add `fetchOrderData()` (waits 2s, returns { orderId: 99 }).
//    Await both IN SEQUENCE and log the total elapsed time using
//    Date.now(). Expect roughly 4000ms.



async function fetchOrderData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ orderId: 99 });
        }, 2000);
    });
}


  async function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Vikas", role: "SDET 2" });
        }, 2000);
    });
   }


(async () => {
    const startTime = Date.now();
    const userData = await fetchUserData();
    console.log(userData);
    const orderData = await fetchOrderData();
    console.log(orderData);
    const endTime = Date.now();
    console.log(`Total elapsed time: ${endTime - startTime}ms`);
})();