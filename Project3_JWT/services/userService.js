const userModel = require("../models/userModel");

function registerUser(userData) {

    const user = userModel.createUser(userData);

    return {
        message: "User registered successfully",
        user: user
    };
}

function loginUser(loginData) {

    const user = userModel.findUserByEmail(loginData.email);

    if (!user) {
        return {
            message: "User not found"
        };
    }

    if (user.password !== loginData.password) {
        return {
            message: "Invalid password"
        };
    }

    return {
        message: "Login successful"
    };
}

module.exports = {
    registerUser,
    loginUser
};











