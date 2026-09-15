// EXERCISE 7 — retry(), the pattern behind flaky-test retries
//    Write `retry(fn, attempts)` that awaits fn(), and on rejection
//    tries again up to `attempts` times before giving up.


async function retry(fn, attempts) {
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === attempts - 1) throw err;
        }
    }   
}
