const mongoose =require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{type:String , mim:4 ,max:50 ,required :true},
    lastName:{type:String},
    emailId:{type:String},
    password:{type:String},
    

});

const User =mongoose.model("User",userSchema);
module.exports =User;