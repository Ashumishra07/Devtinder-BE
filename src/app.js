// console.log ("Starting a project");

const express = require("express");
app=express();
const connectDB =require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup",async(req,res) =>{
    
    // const user = new User({
    //     firstName:"Ashu",
    //     lastname:"Mishra",
    //     email:"Ashu05@gmail.com",
    //     password:"Ashu@123",
    //     gender:"Male",
    // });
    const user = new User(req.body);
    console.log("user",JSON.stringify(user,null,2));
    try{
        await user.save();
        res.send("Ussssser created Successfully...");
    }
    catch(error){
        res.status(400).send("USer is not created:"+error.message);
    }
});

// GEt user by email
app.get("/user", async(req,res) => {
    const user = req.body.email;
    try{
        const users = await User.findOne({email:user});
        if(!users){
            res.status(404).send("Email is not valid or user not exists");
        }
        else{
            res.send("User get successfully by email");
        }
    }
    catch(error){
        console.error("Someting went wrong:"+err.message);

    }
    
});

// GET user -GET/feed find
app.get("/feeds",async(req,res) => {
     const user2 = req.body.email;
     try{
        const findusers = await User.find({email:user2});
        console.log(findusers);
        if(findusers.length === 0){
            res.status(404).send("NOT GETTING USER IN MY FEED ....");
        }
        else{
            // res.send("USER IS VISIBLE IN MY FEED");
            res.send(findusers)
        }
     }
     catch(error){
        console.error("SOMETHING WENT WRONG :"+error.message);
       
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

 





