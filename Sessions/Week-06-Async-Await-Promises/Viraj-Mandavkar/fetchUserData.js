async function fetchUserData() {
    let id = 2
let name = "viraj"
let role = "QA Engineer"

return { id, name, role };
}

console.log(await fetchUserData()); 