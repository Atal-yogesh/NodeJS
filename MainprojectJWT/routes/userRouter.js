const express = require("express");

const router = express.Router();

const usercontroller = require("../controller/userController");
const middleware = require("../middleware/authmiddleware");



router.post("/register",usercontroller.register);
router.post("/login",usercontroller.login);
router.get("/profile",middleware,usercontroller.profile);



module.exports = router;