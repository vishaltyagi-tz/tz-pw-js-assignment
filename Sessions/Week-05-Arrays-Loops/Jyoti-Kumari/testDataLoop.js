const loginData = [
    { username: "user1", password: "pass123" },
    { username: "user2", password: "pass456" },
    { username: "admin", password: "admin123" },
    { username: "tester", password: "test123" }
];

for (const login of loginData) {
    console.log(`Username: ${login.username}, Password: ${login.password}`);
}