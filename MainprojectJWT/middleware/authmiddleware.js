const jwt = require("jsonwebtoken");

function authmiddleware(req,res,next){
    const authheader = req.headers.authorization;
    

    if(!authheader){
        return res.status(401).json({
            message :"Authorzation header is missing"
        })
    }

    const token =  authheader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"token  missing"
        })
    }

     try{
         const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
         )
          
         req.user =  decoded
         next();


     }
       catch (error){

        
        return res.status(401).json({
            message: "Invalid or expired token"
        });
       }
}
module.exports =  authmiddleware;
