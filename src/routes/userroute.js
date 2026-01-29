const express = require('express');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionrequest.model");
const {userMiddleware} = require("../middlewares/auth.middleware");


const USER_PRIVATE_FIELDS = "firstName  lastName  skills age"

userRouter.get('/user/received/requests', userMiddleware , async(req,res) =>{

    try{
        const loggedInUser = req.user;

        const receivedrequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: 'Interested'
        }).populate('fromUserId', USER_PRIVATE_FIELDS);
       
        res.json({message:"Received requests",data:receivedrequests});
    }
    catch(err){
        throw new Error("Something went wrong!!!"+err.message);
    }
});

userRouter.get('/user/connections', userMiddleware , async(req,res) =>{

    try{
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id , status:'Accepted'},
                {toUserId:loggedInUser._id , status:'Accepted'}
            ]
        }).populate('fromUserId', USER_PRIVATE_FIELDS ).populate('toUserId', USER_PRIVATE_FIELDS);

        const data = connections.map(row => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({message:"Your connections",data:data});

    }
    catch(err){
        throw new Error("Something went wrong!!!"+err.message);
    }
})

module.exports = userRouter;