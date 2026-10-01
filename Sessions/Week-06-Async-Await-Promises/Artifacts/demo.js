


// ---------------------------------------------------------------------------
// Demo 1: SYNCHRONOUS behaviour
// JS runs one statement at a time, top to bottom, and nothing else can run
// until the current statement finishes. A slow synchronous step blocks
// everything after it.
// ---------------------------------------------------------------------------
function syncBehaviour() {
	console.log('1. start');

	// A deliberately slow, blocking step. Nothing else runs while this spins.
	const blockUntil = Date.now() + 1000;
	while (Date.now() < blockUntil) {
		// busy-wait for ~1 second
	}
	console.log('2. finished the slow step (1s of blocking)');

	console.log('3. end');

	// Output is always, in order:
	//   1. start
	//   2. finished the slow step (1s of blocking)
	//   3. end
}

// ---------------------------------------------------------------------------
// Demo 2: ASYNCHRONOUS behaviour
// setTimeout and Promises hand the work to the browser/Node and let the rest
// of the function keep running. `await` pauses only this function, not the
// whole program.
// ---------------------------------------------------------------------------
const wait = (ms, label) =>
	new Promise((resolve) => setTimeout(() => resolve(label), ms));

async function asyncBehaviour() {
	console.log('1. start');

	// Scheduled, not run now: it goes to the callback queue and fires after
	// the currently running code (and the awaits below) are done.
	setTimeout(() => console.log('4. setTimeout callback (0ms, but last)'), 0);

	console.log('2. end of the synchronous part');

	// `await` pauses asyncBehaviour here and lets other code run.
	const result = await wait(1000, 'slow value');
	console.log('3. after await, got:', result);

	// Output order:
	//   1. start
	//   2. end of the synchronous part
	//   4. setTimeout callback (0ms, but last)   <-- fires while we await
	//   3. after await, got: slow value
	//
	// Note the numbers are out of order on purpose: that is the whole point.
	// Async code does not run in the order it is written.
}

syncBehaviour();
asyncBehaviour();
