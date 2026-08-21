const express = require('express');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionrequest.model");
const {userMiddleware} = require("../middlewares/auth.middleware");
const User = require('../models/user.js');


const USER_PRIVATE_FIELDS = "firstName  lastName  about  gender age photoUrl"

userRouter.get('/user/received/requests', userMiddleware , async(req,res) =>{

    try{
        const loggedInUser = req.user;

        const receivedrequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            Status: 'Interested'
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
                {fromUserId:loggedInUser._id , Status:'Accepted'},
                {toUserId:loggedInUser._id , Status:'Accepted'}
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
});

userRouter.get('/feed', userMiddleware , async(req,res) => {
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id },
                {toUserId:loggedInUser._id }
            ]
        }).select('fromUserId toUserId');

        const hideConnection = new Set();

        connections.forEach(connection =>{
            hideConnection.add(connection.fromUserId.toString());
            hideConnection.add(connection.toUserId.toString());
        });

        const feedUsers = await User.find({
          $and: [
            { _id: { $nin: Array.from(hideConnection) } },
            { _id: { $ne: loggedInUser._id } }
          ]
        }).select(USER_PRIVATE_FIELDS)
        .skip(skip).
        limit(limit);

        res.json({message:"Feed users",data:feedUsers});
    }
    catch(err){
        throw new Error("Something went wrong!!!"+err.message);
    }
})

module.exports = userRouter;