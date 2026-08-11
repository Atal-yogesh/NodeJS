
const userService = require("../service/userService");

function createUser(req, res) {

    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {

        const user = JSON.parse(body);

        userService.createUser(user, (err, result) => {

            if (err) {
                console.log(err);
                res.end("Error storing user");
                return;
            }

            console.log("User:", result);

            res.end("User created successfully");
        });
    });
}

function getUsers(req, res) {

    const url = new URL(req.url, `http://${req.headers.host}`);

    const id = url.searchParams.get("id");

    userService.getUsers(id, (err, users) => {

        if (err) {
            console.log(err);
            res.end("Error reading users");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(users, null, 2));
    });
}
function updateUser(req, res) {

    const parts = req.url.split("/");
    const id = parts[2];

    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {

        const updateData = JSON.parse(body);

        userService.updateUser(id, updateData, (err, result) => {

            if (err) {
                console.log(err);
                res.end("Error updating user");
                return;
            }

            if (result === null) {
                res.end("User not found");
                return;
            }

            res.end("User updated successfully");
        });
    });
}

module.exports = {
    createUser: createUser,
     getUsers: getUsers,
     updateUser: updateUser
};

