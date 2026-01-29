// console.log ("Starting a project");

const express = require("express");
app=express();
const connectDB =require("./config/database");
const cookieParser =require("cookie-parser");
const authRouter = require("./routes/authroute");
const profileRouter = require("./routes/profileroute");
const requestRouter =require("./routes/requestrouter");
const userRouter = require("./routes/userroute");

app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);



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

 





