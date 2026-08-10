const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // POST METHOD

    if (req.url === "/users" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const user = JSON.parse(body);

            fs.readFile("user.json", "utf8", (err, data) => {

                let users = [];

                if (!err && data.trim() !== "") {

                    users = JSON.parse(data);

                    if (!Array.isArray(users)) {
                        users = [users];
                    }
                }

                users.push(user);

                const JSONdata = JSON.stringify(users, null, 2);

                fs.writeFile("user.json", JSONdata, (err) => {

                    if (err) {
                        console.log(err);
                        res.end("Error storing data");
                        return;
                    }

                    console.log("User:", user);
                    console.log("Name:", user.name);
                    console.log("Age:", user.age);

                    console.log("Data stored successfully");

                    res.end("User data stored successfully");
                });

            });

        });

        return;
    }


    // PUT METHOD

    if (req.method === "PUT" && req.url.startsWith("/users/")) {

        const parts = req.url.split("/");
        const id = Number(parts[2]);

        console.log("User ID:", id);

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const updatedUser = JSON.parse(body);

            fs.readFile("user.json", "utf8", (err, data) => {

                if (err) {
                    console.log(err);
                    res.end("Error reading data");
                    return;
                }

                let users = JSON.parse(data);

                if (!Array.isArray(users)) {
                    users = [users];
                }

                let userFound = false;

                for (let i = 0; i < users.length; i++) {

                    if (Number(users[i].id) === id) {

                        users[i].name = updatedUser.name;
                        users[i].age = updatedUser.age;

                        userFound = true;

                        break;
                    }
                }

                if (!userFound) {
                    res.end("User not found");
                    return;
                }

                fs.writeFile(
                    "user.json",
                    JSON.stringify(users, null, 2),
                    (err) => {

                        if (err) {
                            console.log(err);
                            res.end("Error updating data");
                            return;
                        }

                        console.log("Data is updated successfully");

                        res.end("User updated successfully");
                    }
                );

            });

        });

        return;
    }


    // ROUTE NOT FOUND

    res.end("Route not found");

});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});