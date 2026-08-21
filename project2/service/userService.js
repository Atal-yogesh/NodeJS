const fs = require("fs");

function createUser(user, callback) {

    fs.readFile("user.json", "utf8", (err, data) => {

        let users = [];

        if (!err && data.trim() !== "") {
            users = JSON.parse(data);

            if (!Array.isArray(users)) {
                users = [users];
            }
        }

        users.push(user);

        fs.writeFile(
            "user.json",
            JSON.stringify(users, null, 2),
            (err) => {

                if (err) {
                    callback(err);
                    return;
                }

                callback(null, user);
            }
        );
    });
}

function getUsers(id, callback) {

    fs.readFile("user.json", "utf8", (err, data) => {

        if (err) {
            callback(err);
            return;
        }

        let users = JSON.parse(data);

        if (!Array.isArray(users)) {
            users = [users];
        }

        if (id) {

            let result = [];

            for (let i = 0; i < users.length; i++) {

                if (Number(users[i].id) === Number(id)) {
                    result.push(users[i]);
                }
            }

            callback(null, result);
            return;
        }

        callback(null, users);
    });
}

function updateUser(id, updateData, callback) {

    fs.readFile("user.json", "utf8", (err, data) => {

        if (err) {
            callback(err);
            return;
        }

        let users = JSON.parse(data);

        if (!Array.isArray(users)) {
            users = [users];
        }

        let userFound = false;

        for (let i = 0; i < users.length; i++) {

            if (Number(users[i].id) === Number(id)) {

                users[i].name = updateData.name;
                users[i].age = updateData.age;

                userFound = true;
                break;
            }
        }

        if (!userFound) {
            callback(null, null);
            return;
        }

        fs.writeFile(
            "user.json",
            JSON.stringify(users, null, 2),
            (err) => {

                if (err) {
                    callback(err);
                    return;
                }

                callback(null, users);
            }
        );
    });
}

module.exports = {
    createUser,
    getUsers,
    updateUser
};