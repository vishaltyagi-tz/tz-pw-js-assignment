//--- | An array of 4 login objects (`{ username, password }`); loop it and print a one-line summary per set. This is the shape of data-driven testing----

const logins = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
    { username: "user3", password: "pass3" },
    { username: "user4", password: "pass4" }
];

for (const login of logins) {
    console.log(`Username: ${login.username}, Password: ${login.password}`);
}