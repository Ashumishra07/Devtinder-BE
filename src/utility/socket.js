
const socket = require("socket.io")
const Chat = require('../models/chatMessage.model')
const crypto = require('crypto')

const getSecretRoomId = (userId,touserId) =>{
  return crypto
   .createHash("sha256")
   .update([userId,touserId].sort().join("_"))
   .digest("hex")
}

const intializeSocket = (server) => {
     const io = socket(server,{
  cors:{
    origin:[
      "http://localhost:5173", // Vite dev
      "http://localhost:3000", // React dev
      "https://devtinder-fe-gamma.vercel.app" // Production
    ]
  }
});

io.on("connection",(socket) =>{
  socket.on("joinchat",({firstName,userId,touserId}) => {
      const roomId = getSecretRoomId(userId,touserId);
      console.log(firstName + " joined Room : " + roomId);
      socket.join(roomId);
      
  })

  socket.on("sendMessage",async({firstName,lastName,userId,touserId,text}) => {
    
    // Save chat in database
    try{
        const roomId = getSecretRoomId(userId,touserId);
        console.log(firstName + " " + text);
        let chat = await Chat.findOne({
          participants:{$all:[userId,touserId]}
        });

        if(!chat){
          chat = new Chat({
            participants:[userId,touserId],
            messages:[],
          });
        }

         chat.messages.push({
            senderId: userId,
            text,
          });

        await chat.save();
        io.to(roomId).emit("messageRecieved", { firstName, lastName, text });
    }
    catch(err){
      console.log(err.message);
    }
    
  })

  socket.on("disconnect",() => {
    
  })

 });

}

module.exports = intializeSocket;