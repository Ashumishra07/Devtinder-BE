const { userMiddleware } = require("../middlewares/auth.middleware");
const express = require('express')
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionrequest.model");
const User = require("../models/user");
const mongoose = require("mongoose");
// const { validateSignupData } = require("../utility/helper");


requestRouter.post('/request/send/:Status/:toUserId', userMiddleware, async (req, res) => {

   try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const Status = req.params.Status;
      // console.log("??",fromUserId,toUserId,status);

      const allowedStatuses = ['Interested', 'Ignored'];
      if (!allowedStatuses.includes(Status)) {
         return res.status(400).json({ message: "Invalid status" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
         return res.status(404).json({ message: "Recipient user not found" });
      }

      if (fromUserId == toUserId) {
         return res.status(400).json({ message: "You cannot send request to yourself" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
         $or: [{
            fromUserId,
            toUserId
         },
         {
            fromUserId: toUserId,
            toUserId: fromUserId
         }]

      });

      if (existingConnectionRequest) {
         return res.status(400).json({ message: "Request already sent" });
      }

      const newConnectionRequest = new ConnectionRequest({
         fromUserId,
         toUserId,
         Status
      });

      const data = await newConnectionRequest.save();

      res.json({ message: "Request sent successfully" },
         data
      );

   } catch (err) {

      throw new Error("Something went wrong!!!" + err.message);
   }
});

requestRouter.post('/request/review/:Status/:requestId', userMiddleware, async (req, res) => {
   try {
      const loggedInUser = req.user;
      console.log("loggedinuser", loggedInUser);
      const { Status, requestId } = req.params;

      const allowedStatus = ['Accepted', 'Rejected'];
      if (!allowedStatus.includes(Status)) {
         return res.status(400).json({ message: "Invalid status" });
      }

      // const connectionRequest = await ConnectionRequest.findOne({
      //    _id: new mongoose.Types.ObjectId(requestId),
      //    toUserId:loggedInUser._id,
      //    status:"Interested",

      // });

      const connectionRequest = await ConnectionRequest.findById(requestId);

      if (!connectionRequest) {
         return res.status(404).json({ message: "Connection request not found" });
      }

      if (!connectionRequest.toUserId.equals(loggedInUser._id)) {
         return res.status(403).json({ message: "Not authorized" });
      }

      if (connectionRequest.Status !== "Interested") {
         return res.status(400).json({ message: "Request already reviewed" });
      }

      if(!connectionRequest){
         return res.status(404).json({message:"Connection request not found"});
      };
      connectionRequest.Status = Status;
      const data = await connectionRequest.save();
      res.status(200).json({message : "Request reviewed "+Status,data});
   }
   catch (err) {
      throw new Error("Something went wrong!!!" + err.message);
   }

});

module.exports = requestRouter;