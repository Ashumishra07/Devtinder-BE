// console.log ("Starting a project");

const express = require("express");
app=express();
const connectDB =require("./config/database");
const cookieParser =require("cookie-parser");
const authRouter = require("./routes/authroute");
const profileRouter = require("./routes/profileroute");
const requestRouter =require("./routes/requestrouter");
const userRouter = require("./routes/userroute");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

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
    console.log("Connected DB:", mongoose.connection.name);
});

})
.catch((err) =>{
     console.error("Database cannot established...")
})

 





