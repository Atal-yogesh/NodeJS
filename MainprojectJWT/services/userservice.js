 const  User = require("../model/model");
 const bcrypt = require("bcrypt");
 const jwt =  require("jsonwebtoken");


 
 
  async function  registerusser(userdata){

    const userexist =  await User.findOne({
        where:  {
            email : userdata.email

        }
    });
     if(userexist){
        throw   new Error("email already exist");

     }


         const  hashpassword =   await bcrypt.hash(userdata.password, 12);

        const   user = await User.create({
            name : userdata.name,
            email : userdata.email,
            password : hashpassword
        });
        return  user;

 }
  async function loginuser(email,password){
    
 


    const   user =  await User.findOne({
        where:{
            email :email
        }
    })
    if(!user){
         throw new Error("user Not  found");

    }

     const ispasswordcorrect = await bcrypt.compare(password,user.password);

     if(!ispasswordcorrect){
        throw new  Error ("password  Not  valid ");

     }


     const  token = jwt.sign(
        {
            id:user.id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn :"15m"
        }
     )
     return {user,
        token
     };

  }

 module.exports={
    registerusser,
    loginuser
 }