/* ==============================================================
   WEEK 17 — INTERFACES & TYPED PAGE OBJECTS — WORKED EXAMPLE
   Companion to: Session-Guide.md

   Check with:  npx tsc --noEmit
   ============================================================== */

// ---------- types/TestData.ts ----------

// A union type for a fixed set — the compiler now rejects every typo.
export type Role = "Admin" | "Tester" | "Guest";

export interface UserCredentials {
  username: string;
  password: string;
  role?: Role;              // optional: not every fixture cares
  readonly id?: number;     // set by the API, never reassigned by a test
}

export interface ProductDetails {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface OrderSummary {
  itemCount: number;
  totalPrice: number;
  shippingAddress: string;
}

// A data-driven login case. `expected` is a union, so an invented outcome
// like "workd" is a compile error rather than a test that silently never matches.
export interface LoginCase {
  description: string;
  credentials: UserCredentials;
  expected: "success" | "invalid credentials" | "locked out" | "username required";
}

// ---------- fixtures/users.ts ----------

export const standardUser: UserCredentials = {
  username: "standard_user",
  password: "secret_sauce",
  role: "Tester",
};

export const lockedOutUser: UserCredentials = {
  username: "locked_out_user",
  password: "secret_sauce",
};

export const loginCases: LoginCase[] = [
  {
    description: "a valid user reaches the inventory page",
    credentials: standardUser,
    expected: "success",
  },
  {
    description: "a wrong password is rejected",
    credentials: { username: "standard_user", password: "wrong" },
    expected: "invalid credentials",
  },
  {
    description: "a locked out user is told so",
    credentials: lockedOutUser,
    expected: "locked out",
  },
  {
    description: "a blank username is rejected",
    credentials: { username: "", password: "secret_sauce" },
    expected: "username required",
  },
];

/* ==============================================================
   THE DATA-DRIVEN TEST — note where the loop goes

   import { test, expect } from "@playwright/test";
   import { loginCases } from "../fixtures/users";
   import { LoginPage } from "../pages/LoginPage";

   for (const testCase of loginCases) {          // <-- loop OUTSIDE test()
     test(`login: ${testCase.description}`, async ({ page }) => {
       const loginPage = new LoginPage(page);
       await loginPage.goto();
       await loginPage.login(testCase.credentials);

       if (testCase.expected === "success") {
         await expect(page).toHaveURL(/inventory/);
       } else {
         await expect(loginPage.errorBanner).toContainText(testCase.expected);
       }
     });
   }

   THE COMMON MISTAKE — do not do this:

   test("all login cases", async ({ page }) => {
     for (const testCase of loginCases) { ... }   // <-- loop INSIDE test()
   });

   With the loop inside, you get ONE test in the report, it stops at the first
   failing case, and you can't rerun a single case with -g. With the loop
   outside you get four named tests, four independent results, and each one
   retries on its own.

   ==============================================================
   TYPED PAGE OBJECT — the IntelliSense payoff

   import { Page, Locator } from "@playwright/test";
   import { UserCredentials, OrderSummary } from "../types/TestData";

   export class LoginPage {
     readonly page: Page;
     readonly usernameInput: Locator;
     readonly passwordInput: Locator;
     readonly loginButton: Locator;
     readonly errorBanner: Locator;

     constructor(page: Page) {
       this.page = page;
       this.usernameInput = page.getByPlaceholder("Username");
       this.passwordInput = page.getByPlaceholder("Password");
       this.loginButton = page.getByRole("button", { name: "Login" });
       this.errorBanner = page.getByTestId("error");
     }

     // Taking the whole typed object beats two loose strings: you cannot
     // accidentally swap username and password, and a typo'd property name
     // is a compile error.
     async login(credentials: UserCredentials): Promise<void> {
       await this.usernameInput.fill(credentials.username);
       await this.passwordInput.fill(credentials.password);
       await this.loginButton.click();
     }
   }

   // And a declared return type documents the contract:
   async function completeCheckout(page: Page): Promise<OrderSummary> {
     // ... drive the UI ...
     return { itemCount: 1, totalPrice: 29.99, shippingAddress: "110001" };
   }
   // Forget a field and the compiler tells you now, not in review.

   ==============================================================
   interface OR type — a rule of thumb

   interface  — object shapes you might extend (page objects, test data, API
                responses). Extendable, and produces clearer error messages.
   type       — unions ("Admin" | "Tester"), aliases, function signatures,
                anything that isn't purely an object shape.

   Don't agonise over it. Both work for object shapes; pick one and be
   consistent across the project.
   ============================================================== */
