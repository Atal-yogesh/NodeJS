
const  usercontroller =  require("../services/userservice");

 async  function  register(req,res){
    try{

        const { name , email , password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message :"Name , email and Password is required"
            });

        }

        const  user = await usercontroller.registerusser(req.body);
        res.status(201).json({
            message : "user registerd succesfully",
            user : {
                id : user.id,
                name : user.name,
                email : user.email
            }
        })

    }
    catch(error){

        res.status(500).json({
            message :"something went wrong",
            error : error.message
        })
    }
 }

  async function login(req,res){
     try{

        if(!email || !password){
                return res.status(400).json({
                    message : "email and password  are required  "
              })
          }
        const {email,password} = req.body;

        const  result =   await usercontroller.loginuser(email,password);

        res.status(200).json({
            message :" successfully Login",
            user : {
                id : result.user.id,
                name : result.user.name,
                email : result.user.email
            },
            token: result.token
            
        });

        


     }

      catch(error){
        res.status(401).json({
            message : error.message
        })

      }
  }

  function profile(req,res){

    res.status(200).json({
        message : "profile created succesfully",
        user: req.user
    })
  }

 module.exports={
    register,
    login,
    profile

 };
