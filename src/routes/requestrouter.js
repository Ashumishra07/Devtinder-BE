const { userMiddleware } = require("../middlewares/auth.middleware");
const express = require('express')
const requestRouter = express.Router();


requestRouter.post('/request/send/:status/:toUserId', userMiddleware,async(req,res)=>{
     
    try{
         const fromUserId =req.user._id;
         const toUserId = req.params.toUserId;
         const status = req.params.status;

     }
    
    catch(error){
        throw new error
    }
});

module.exports = requestRouter ;