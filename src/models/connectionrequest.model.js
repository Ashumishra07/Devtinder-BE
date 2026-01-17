const { timeStamp } = require('console');
const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({

   fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
   },

   toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
   },

   Status:{
    type:String,
    enum:{
        Values:["Interested","Ignored","Pending","Rejected"],
        message:"{VALUE} is not supported",
    },
    
   },

   timestamps:true,

});

const ConnectionRequestModel = mongoose.model('ConnectionRequest', ConnectionRequestSchema);

module.exports = ConnectionRequestModel;