const mongoose =require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{type:String , mim:4 ,max:50 ,required :true},
    lastName:{type:String},
    emailId:{type:String},
    password:{type:String},
    photoUrl:{type:String},
    skills:{type:String,max:50},
    branch:{type:String},
    education:{type:String},
    age:{type:String},
    dob:{type:String},
    
});

    
userSchema.methods.getJWT = async function(){
    const user =this;
    const token = await JWT.sign({_id: user._id},"Ashutosh@2004mishra")

    return token;

};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user =this;
    const passwordHash = user.password

    const validPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    return validPassword

}


const User =mongoose.model("User",userSchema);
module.exports =User;