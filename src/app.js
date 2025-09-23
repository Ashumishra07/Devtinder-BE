// console.log ("Starting a project");

const express = require("express");
app=express();

app.use("/user",(req,res,next)=>{
    console.log("In 1st Response!");
    // res.send("Response1st!");
    next();
},
(req,res,next)=>{
    console.log("In 2 Response!");
    // res.send("Response2!!;");
    next();

},
(req,res,next)=>{
    console.log("In 3 Response!");
    // res.send("Response3!!;");
    next();

},
(req,res,next)=>{
    console.log("In 4 Response!");
    res.send("Response4!!;");
    next();

},


);




app.listen(7777,() =>{
    console.log("App is Listening at port number 7777");
})
