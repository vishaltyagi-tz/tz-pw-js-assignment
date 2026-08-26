/* ==============================================================
   OPTIONAL J — API TESTING & SEEDING — PRACTICE
   Companion to: Session-Guide.md
   Run:  npx playwright test api-practice

   THE IDEA: never test through the UI what you can set up through
   the API. UI login takes ~30 seconds across a suite; an API call
   takes 200ms and can't be flaky in the same ways.
   ============================================================== */

const { test, expect, request } = require("@playwright/test");

const API = "https://jsonplaceholder.typicode.com";

/* ------------------------------------------------------------
   EXERCISE 1 — A GET request
   Use the `request` fixture. Assert BOTH the status and the body.
   ------------------------------------------------------------ */
test("fetches a user from the API", async ({ request }) => {
  // TODO: GET /users/1, assert ok, parse json, assert a field
});

/* ------------------------------------------------------------
   EXERCISE 2 — Status alone is not enough
   Assert only the status, then also assert the body. Explain in a
   comment what a status-only assertion would miss.
   ------------------------------------------------------------ */
test("shows why the body matters", async ({ request }) => {
  // TODO
  // WHAT A STATUS-ONLY CHECK MISSES: ...
});

/* ------------------------------------------------------------
   EXERCISE 3 — POST and create
   Create a resource, assert the response echoes what you sent.
   ------------------------------------------------------------ */
test("creates a post", async ({ request }) => {
  // TODO
});

/* ------------------------------------------------------------
   EXERCISE 4 — Seed via API, verify in the UI
   Do the setup with an API call, then check the result through
   the browser. This is the pattern you'll use most in real work.
   ------------------------------------------------------------ */
test("seeds data via API then verifies in the UI", async ({ request, page }) => {
  // TODO
  // WHY NOT SET THIS UP THROUGH THE UI: ...
});

/* ------------------------------------------------------------
   EXERCISE 5 — An auth helper
   Authenticate once, reuse the token. Read credentials from the
   environment — never hardcode them.
   ------------------------------------------------------------ */
async function getAuthToken(apiContext) {
  // TODO
}

test("uses a token for an authenticated request", async ({ request }) => {
  // TODO
});

/* ------------------------------------------------------------
   EXERCISE 6 — Standalone context
   Sometimes you need a request context outside a test's fixture
   (e.g. in global setup). Build one with request.newContext().
   ------------------------------------------------------------ */
test("uses a standalone request context", async () => {
  // TODO
});

/* ==============================================================
   SOLUTIONS

// 1
const response = await request.get(`${API}/users/1`);
await expect(response).toBeOK();
const user = await response.json();
expect(user.username).toBe("Bret");
expect(user.email).toContain("@");

// 2
// Status only:
expect(response.status()).toBe(200);
// WHAT IT MISSES: plenty of APIs return 200 with an error payload
// ({ "error": "not found" }), or 200 with an empty list where you expected
// data, or 200 with the right shape and wrong values. A status assertion
// proves the server answered, not that it answered correctly.
const body = await response.json();
expect(body).toHaveProperty("id", 1);

// 3
const created = await request.post(`${API}/posts`, {
  data: { title: "Test run", body: "Created from Playwright", userId: 1 },
});
expect(created.status()).toBe(201);
const post = await created.json();
expect(post.title).toBe("Test run");
expect(post.id).toBeTruthy();

// 4
const seeded = await request.post(`${API}/posts`, {
  data: { title: "Seeded item", body: "...", userId: 1 },
});
const { id } = await seeded.json();
await page.goto(`/items/${id}`);
await expect(page.getByRole("heading", { name: "Seeded item" })).toBeVisible();
// WHY NOT THROUGH THE UI: creating this through the interface would mean
// logging in, navigating three screens and filling a form — ~30 seconds of
// steps that aren't what this test is checking, and every one of them another
// chance to fail for an unrelated reason. If the create form breaks, THAT
// test should fail, not this one.

// 5
async function getAuthToken(apiContext) {
  const response = await apiContext.post(`${API}/login`, {
    data: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
    },
  });
  await expect(response).toBeOK();
  const { token } = await response.json();
  return token;
}

const token = await getAuthToken(request);
const secure = await request.get(`${API}/protected`, {
  headers: { Authorization: `Bearer ${token}` },
});
await expect(secure).toBeOK();

// 6
const apiContext = await request.newContext({ baseURL: API });
const response = await apiContext.get("/users/1");
await expect(response).toBeOK();
await apiContext.dispose();      // always dispose what you create

// CLEAN UP WHAT YOU SEED — otherwise the environment degrades over time and
// tomorrow's run is slower and less predictable than today's:
// test.afterEach(async ({ request }) => {
//   if (createdId) await request.delete(`${API}/posts/${createdId}`);
// });
   ============================================================== */
