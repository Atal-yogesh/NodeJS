const express = require("express");
const  dotenv =  require("dotenv")

dotenv.config();

const  sequlize = require("./config/database");
const  user = require("./model/model");


const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRouter");

app.use("/users", userRoutes);

app.listen(4000, async () => {
    console.log("server is running on port 4000");

     try{
         await  sequlize.authenticate();
         console.log(" connected  to database  is succesfully ");
         
         await sequlize.sync();
         console.log("user table created successfully....");



     }
       catch(error){
         console.log(" connection to  database  is  failed");
         console.log(error.message);

       }
});