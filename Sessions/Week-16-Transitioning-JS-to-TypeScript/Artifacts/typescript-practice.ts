/* ==============================================================
   WEEK 16 — JS TO TYPESCRIPT — PRACTICE EXERCISES
   Companion to: Session-Guide.md

   Check your work with:  npx tsc --noEmit
   That command is the whole point — it finds errors before a
   browser ever opens. Solutions at the bottom.
   ============================================================== */

/* ------------------------------------------------------------
   EXERCISE 1 — Annotate parameters and return types
   Add types. Note how you don't need to annotate the local
   variable — inference already knows it's a number.
   ------------------------------------------------------------ */

// TODO: annotate price, taxRate, and the return type
function applyTax(price, taxRate = 5) {
  const tax = price * (taxRate / 100);
  return price + tax;
}

/* ------------------------------------------------------------
   EXERCISE 2 — Let inference do its job
   Which of these annotations are noise? Delete the unnecessary
   ones and explain in a comment.
   ------------------------------------------------------------ */

const appName: string = "Swag Labs";
const maxRetries: number = 3;
const isHeadless: boolean = true;

// WHICH ARE NOISE AND WHY: ...

/* ------------------------------------------------------------
   EXERCISE 3 — A wrong-typed argument, on purpose
   Call applyTax with a string where a number belongs. Run
   `npx tsc --noEmit` and paste the compiler error.
   ------------------------------------------------------------ */

// TODO: applyTax("100");
// COMPILER ERROR: ...

/* ------------------------------------------------------------
   EXERCISE 4 — Arrays and unions
   Type an array of usernames, and a role that can only ever be
   one of three values.
   ------------------------------------------------------------ */

// TODO: const usernames: ??? = ["standard_user", "locked_out_user"];
// TODO: type Role = ...
// TODO: const role: Role = "Admin";
//       then try role = "Superuser" and read the error

/* ------------------------------------------------------------
   EXERCISE 5 — Replacing `any`
   Each of these uses `any`. Replace it with a real type, or
   justify keeping it in a comment.
   ------------------------------------------------------------ */

function logResult(result: any) {
  console.log(result);
}

function parseResponse(body: any) {
  return body.data.items.length;
}

// TODO: retype both. Which one is genuinely hard, and why?

/* ------------------------------------------------------------
   EXERCISE 6 — Compile-time vs run-time
   Write one error TypeScript catches before running, and one it
   cannot. Explain the difference.
   ------------------------------------------------------------ */

// CAUGHT AT COMPILE TIME: ...
// ONLY AT RUN TIME:       ...

/* ------------------------------------------------------------
   EXERCISE 7 — Optional and readonly
   Type a config object where `baseURL` is required, `timeout` is
   optional, and `projectName` can never be reassigned.
   ------------------------------------------------------------ */

// TODO

export { applyTax, logResult, parseResponse };

/* ==============================================================
   SOLUTIONS

// 1
function applyTax(price: number, taxRate: number = 5): number {
  const tax = price * (taxRate / 100);   // inferred as number — leave it alone
  return price + tax;
}

// 2  All three are noise. TypeScript already infers string, number and boolean
//    from the literal values. Annotate function SIGNATURES (the boundaries),
//    not obvious locals — over-annotating just adds text to maintain.

// 3
applyTax("100");
// error TS2345: Argument of type 'string' is not assignable to parameter of
// type 'number'.
// This is the payoff: caught instantly, not after a 40-second test run.

// 4
const usernames: string[] = ["standard_user", "locked_out_user"];
type Role = "Admin" | "Tester" | "Guest";
const role: Role = "Admin";
// role = "Superuser";
// error TS2322: Type '"Superuser"' is not assignable to type 'Role'.
// A union type documents the valid set AND enforces it. Far better than a
// bare `string` that accepts any typo.

// 5
function logResult(result: unknown) { console.log(result); }
// `unknown` is the safe replacement when you truly accept anything: it's
// assignable FROM everything but you must narrow before using it. Logging
// needs no narrowing, so it's a perfect fit.

interface ApiResponse { data: { items: unknown[] } }
function parseResponse(body: ApiResponse): number { return body.data.items.length; }
// This one is the hard one: you have to know the response shape. That's a
// feature — writing the interface forces you to check the actual API contract
// instead of guessing at `body.data.items` and finding out at run time.

// 6
// CAUGHT AT COMPILE TIME: a typo'd property (`user.usrename`), a wrong argument
//   type, a missing return, calling a method that doesn't exist on the type.
// ONLY AT RUN TIME: the element genuinely isn't on the page; the API returned
//   500; the network timed out. TypeScript checks the SHAPE of your code, not
//   the state of the world.

// 7
interface TestConfig {
  baseURL: string;              // required
  timeout?: number;             // optional
  readonly projectName: string; // set once, never reassigned
}
   ============================================================== */
