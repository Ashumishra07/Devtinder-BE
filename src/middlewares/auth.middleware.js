// const authMiddleware=(req,res,next)=>{
//     const token= "xyz";
//     const isAdminAuthorized = token === "xyz";
   
//     if(isAdminAuthorized){
//         console.log("Admin is authorized");
//         next();
//     }
//     else{
//         err.message =undefined
//         res.status(401).send("Unauthorized access"+err.message); 
//     }
// };

// const userMiddleware=(req,res,next)=>{
//     const token= "xyz";
//     const isAdminAuthorized = token === "xyz";
   
//     if(isAdminAuthorized){
//         console.log("User is authorized");
//         next();
//     }
//     else{
//         err.message =undefined
//         res.status(401).send("Unauthorized access"+err.message); 
//     }
// };
const jwt = require('jsonwebtoken');
const User = require("../models/user");


const userMiddleware= async(req,res,next)=>{
    // Read the Token From the req cookies
    console.log("Error matlam import cookies");
    const {token} = req.cookies;
    // Validate the Token
    if(!token){
        throw new Error("Invalid TOken!!!!!")
    }
    // Find the username
    const decodedHash =  await jwt.verify(token,"Ashutosh@2004mishra");
    const {_id} = decodedHash;
    const user =await User.findById(_id);
    console.log("Reaxch",user)
    if(!user){
        return ("Invalid user")
    }
    req.user = user;
    next();
};

module.exports = {userMiddleware};

// module.exports={ 
//     authMiddleware,userMiddleware};
    
