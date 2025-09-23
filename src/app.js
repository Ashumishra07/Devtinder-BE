// console.log ("Starting a project");

const express = require("express");
app=express();

// Create multiple http method get,post,put,delete
app.get("/a",(req,res)=>{
    res.send("Hello ANd Lets boom it");
});

app.post("/hello",(req,res)=>{
    res.send("Hello ANd Lets boom it only hello");
});

app.put("/xyz",(req,res)=>{
    res.send("Hello ANd Lets boom it xyz");
});

app.delete("/hello/2",(req,res)=>{
    res.send("Hello ANd Lets boom it hello2");
});

// play with rote and checks order and ordermatters in real 
app.use("/new",(req,res)=>{
    res.send("Welcome to server at 7777");
    
});
app.use("/test",(req,res) =>{

    res.send("HEllo welcome to server");
});
app.use("/",(req,res)=>{
    res.send("Welcome to server at 7777 hey");
    
});

app.use("/hello/2",(req,res) => {
    res.send("Namaste hi hello");
});

app.listen(7777,() =>{
    console.log("App is Listening at port number 7777");
})

