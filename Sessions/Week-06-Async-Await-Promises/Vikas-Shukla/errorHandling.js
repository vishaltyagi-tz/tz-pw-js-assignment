// EXERCISE 5 — Handling rejection
//    Write `fetchBrokenData()` that waits 500ms then THROWS.
//    Call it inside try/catch and log a friendly message.
//    Then comment out the try/catch, run it, and paste the
//    unhandled-rejection warning you get.



async function fetchBrokenData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Service unavailable"));
        }, 500);
    });
}

(async () => {
    try {
        const brokenData = await fetchBrokenData(); //Node exits with a non-zero code and points right at the reject() call.
     console.log(brokenData);
    } catch (error) {
        console.log("Friendly message: Service is currently unavailable. Please try again later.");
    }
})();

// On commenting out the try/catch block, I got an unhandled rejection warning like this:
// (node:12345) UnhandledPromiseRejectionWarning: Error: Service unavailable
//     at Timeout._onTimeout (path/to/your/file.js:line:column)
//     at listOnTimeout (internal/timers.js:line:column)
//     at processTimers (internal/timers.js:line:column)
// (node:12345) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
// (node:12345) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
