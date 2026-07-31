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
const dotenv = require("dotenv");
dotenv.config();


const userMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("Please Login!!");
        }

        const decodedHash = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const { _id } = decodedHash;
        console.log("Cookies:", req.cookies);
        console.log("Token:", req.cookies?.token);
        const user = await User.findById(_id);

        if (!user) {
            return res.status(401).send("Invalid User");
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).send("Invalid Token");
        console.error("Error in userMiddleware:", err);
    }
};

// const userMiddleware= async(req,res,next)=>{
//     // Read the Token From the req cookies
//     // console.log("Error matlam import cookies");
//     const {token} = req.cookies;
//     // Validate the Token
//     if(!token){
//         res.status(401).send("Please Login!!");
//     }
//     // Find the username
//     const decodedHash =  await jwt.verify(token,process.env.JWT_SECRET);
//     const {_id} = decodedHash;
//     const user =await User.findById(_id);
//     console.log("Reaxch",user)
//     if(!user){
//         return ("Invalid user")
//     }
//     req.user = user;
//     next();
// };

module.exports = {userMiddleware};

// module.exports={ 
//     authMiddleware,userMiddleware};
    
