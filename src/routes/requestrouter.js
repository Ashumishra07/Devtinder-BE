const { userMiddleware } = require("../middlewares/auth.middleware");
const express = require('express')
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionrequest.model");
const User = require("../models/user");


requestRouter.post('/request/send/:status/:toUserId', userMiddleware,async(req,res)=>{
     
    try{
         const fromUserId =req.user._id;
         const toUserId = req.params.toUserId;
         const Status = req.params.status;
         // console.log("??",fromUserId,toUserId,status);

         const allowedStatuses = ['Interested', 'Ignored'];
         if(!allowedStatuses.includes(Status)){
            return res.status(400).json({message:"Invalid status"});
         }

         const toUser = await User.findById(toUserId);
         if(!toUser){
            return res.status(404).json({message:"Recipient user not found"});
         }

         if(fromUserId == toUserId){
            return res.status(400).json({message:"You cannot send request to yourself"});
         }

         const existingConnectionRequest = await ConnectionRequest.findOne({
           $or:[{
            fromUserId,
            toUserId
           },
           {
            fromUserId:toUserId,
            toUserId:fromUserId
           }] 
            
         });

         if(existingConnectionRequest){
            return res.status(400).json({message:"Request already sent"});
         }
      
         const newConnectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            Status
         });

        const data = await newConnectionRequest.save();

         res.json({message:"Request sent successfully"},
         data
         );       
         
     }catch(err){
        
        throw new Error("Something went wrong!!!"+err.message);
    }
});

requestRouter.post('/request/review/:status/:requestId', userMiddleware, async(req,res) =>{
      try{
         const loggedInUser = req.user;
         const {status,requestId} = req.params;

         const allowedStatus = ['Accepted', 'Rejected'];
         if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status"});
         }

         const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"Interested",

         });
         if(!connectionRequest){
            return res.status(404).json({message:"Connection request not found"});
         };
         connectionRequest.status = status;
         const data = await connectionRequest.save();
         res.status(200).json({message : "Request reviewed "+status,data});
      }
      catch(err){
         throw new Error("Something went wrong!!!"+err.message);
      }

});

module.exports = requestRouter ;