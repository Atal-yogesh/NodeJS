const userService = require("../services/userService");

function register(req, res) {

    const result = userService.registerUser(req.body);

    res.status(201).json(result);
}

function login(req, res) {

    const result = userService.loginUser(req.body);

    res.json(result);
}

module.exports = {
    register,
    login
};