const userService = require("../service/userService");

function createUser(req, res) {

    const user = req.body;

    userService.createUser(user, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error storing user");
        }

        console.log("User:", result);

        res.status(201).send("User created successfully");
    });
}

function getUsers(req, res) {

    const id = req.query.id;

    userService.getUsers(id, (err, users) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error reading users");
        }

        res.status(200).json(users);
    });
}

function updateUser(req, res) {

    const id = req.params.id;

    const updateData = req.body;

    userService.updateUser(id, updateData, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error updating user");
        }

        if (result === null) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("User updated successfully");
    });
}

module.exports = {
    createUser,
    getUsers,
    updateUser
};