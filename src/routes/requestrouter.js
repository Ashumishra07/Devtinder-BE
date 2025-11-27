const { userMiddleware } = require("../middlewares/auth.middleware");
const express = require('express')
const requestRouter = express.Router();


requestRouter.post('/sendconnectionrequest', userMiddleware,async(req,res)=>{
     
    try{
         const user =req.user;
     if(!user){
        return("you are not ready")
     }
     else{
        res.send(user.firstName + " sendconnection Request ")
     }
    }
    catch(error){
        throw new error
    }
});

module.exports = requestRouter ;