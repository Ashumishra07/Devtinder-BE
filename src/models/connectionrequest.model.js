const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    Status: {
      type: String,
      enum: {
        values: ['Interested', 'Ignored', 'Accepted', 'Rejected'],
        message: '{VALUE} is not a valid status'
      },
    //   default: 'Pending',
      required: true
    }
  },
  {
    timestamps: true   
  }
);


// ConnectionRequestSchema.pre('save', function (next) {
//   // You can add any pre-save logic here if needed
//   const connectionRequest = this;
//   // For example, you might want to validate certain fields 
//   if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//     return next(new Error("You cannot send request to yourself"));
//   }
//   next();
// });


const ConnectionRequestModel = mongoose.model(
  'ConnectionRequest',
  ConnectionRequestSchema
);

module.exports = ConnectionRequestModel;
