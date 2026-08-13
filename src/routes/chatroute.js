const express = require('express');
const chatRouter = express.Router();
const Chat = require('../models/chatMessage.model');
const { userMiddleware } = require('../middlewares/auth.middleware');

chatRouter.get('/chat/:touserId',userMiddleware, async(req,res) => {
       const {touserId} = req.params;
       const userId = req.user._id;
       
       try {
         let chat = await Chat.findOne({
           participants: { $all: [userId, touserId] },
         }).populate({
           path: "messages.senderId",
           select: "firstName lastName",
         });
         if (!chat) {
           chat = new Chat({
             participants: [userId, touserId],
             messages: [],
           });
           await chat.save();
         }
         res.json(chat);
       } catch (err) {
         console.error(err);
       }

});

module.exports ={chatRouter};