//  EXERCISE 4 — Parallel with Promise.all
//    Run the same two fetches with Promise.all and log the elapsed
//    time. Expect roughly 2000ms. Explain the difference.




async function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Vikas", role: "SDET 2" });
        }, 2000);
    });
   }

async function fetchOrderData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ orderId: 99 });
        }, 2000);
    });
}   

(async () => {
    const startTime = Date.now();
    const [userData, orderData] = await Promise.all([fetchUserData(), fetchOrderData()]);
    console.log(userData);
    console.log(orderData);
    const endTime = Date.now();
    console.log(`Total elapsed time: ${endTime - startTime}ms`);
})();


// The difference between sequential and parallel execution is that in sequential execution, 
// each asynchronous operation waits for the previous one to complete before starting, 
// resulting in a longer total elapsed time. In contrast, parallel execution allows 
// multiple asynchronous operations to run concurrently, reducing the total elapsed time 
// since they can complete independently of each other.