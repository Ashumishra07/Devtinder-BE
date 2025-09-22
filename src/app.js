// console.log ("Starting a project");

const express = require("express");
app=express();

app.use("/new",(req,res)=>{
    res.send("Welcome to server at 7777");
    
});
app.use("/test",(req,res) =>{

    res.send("HEllo welcome to server");
});

app.use("/hello",(req,res) => {
    res.send("Namaste hi hello");
});

app.listen(7777,() =>{
    console.log("App is Listening at port number 7777");
})

