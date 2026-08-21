const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes.js");

app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});