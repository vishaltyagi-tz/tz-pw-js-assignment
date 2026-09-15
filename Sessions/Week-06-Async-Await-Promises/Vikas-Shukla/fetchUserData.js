//  EXERCISE 2 — Your first async function
//    Write `fetchUserData()` that waits 2 seconds and then RETURNS
//    { id: 1, name: "Aisha", role: "QA Engineer" }.
//    Then call it with await and log the result.


   async function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Vikas", role: "SDET 2" });
        }, 2000);
    });
   }

   (async () => {
    const userData = await fetchUserData();
    console.log(userData);
   })();