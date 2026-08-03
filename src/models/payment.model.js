const {mongoose} = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    receipt:{
        type:String,
        required:true,
    },
    orderId:{
        type:String,
        required:true,
    },
    paymentId:{
        type:String,
        
    },
    notes:{
        firstName:{type:String},
        lastName:{type:String},
        emailId:{type:String},
        membershipType:{type:String},
    },

},{
timestamps:true
});

module.exports = mongoose.model('Payment',paymentSchema);