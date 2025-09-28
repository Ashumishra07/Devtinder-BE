// console.log ("Starting a project");

const express = require("express");
app=express();
const connectDB =require("./config/database");
const User = require("./models/user");

app.post("/signup",async(req,res) =>{
    const user = new User({
        firstName:"Ashu",
        lastmane:"Mishra",
        emamil:"Ashu05@gmail.com",
        password:"Ashu@123",
        gender:"Male",
    });
    try{
        await user.save();
        res.send("Ussssser created Successfully...");
    }
    catch(error){
        res.status(400).send("USer is not created:"+error.message);
    }
})

connectDB()
  .then(() =>{
    console.log("Database connection established ....");
    app.listen(7777,() =>{
    console.log("App is Listening at port number 7777");
});

})
.catch((err) =>{
     console.error("Database cannot established...")
})

 





