const userController = require("../controller/userController");

function userRoutes(req, res) {

    if (req.url === "/users" && req.method === "POST") {

        userController.createUser(req, res);

        return;
    }

       if (req.url.startsWith("/users") && req.method === "GET") {

        userController.getUsers(req, res);

        return;
    }

    if (req.method === "PUT" && req.url.startsWith("/users/")) {

    userController.updateUser(req, res);

    return;
     }

    res.end("Route not found");
}

module.exports = userRoutes;