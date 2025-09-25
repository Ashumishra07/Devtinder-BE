// console.log ("Starting a project");

const express = require("express");
app=express();
const {authMiddleware, userMiddleware} =require("./middlewares/auth.middleware")

app.use("/admin",authMiddleware);
// app.use("/user",userMiddleware);

app.get("/admin/getAdminAllUser",(req,res)=>{
    res.send("DAta is already sent");
});

app.get("/admin/DeleteAllUser",(req,res)=>{
    res.send("DAta is Deleted sent");
});

app.get("/user/getAllUser",userMiddleware,(req,res)=>{
    res.send("All useer sent");
});

// Dont make middleware for user/Login
app.get("/user/loginUser",(req,res)=>{
    res.send("user logined");
})




app.listen(7777,() =>{
    console.log("App is Listening at port number 7777");
})
