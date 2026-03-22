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
const dotenv = require("dotenv");
dotenv.config();  

const allowedOrigins = [
    process.env.FRONTEND_URL_LOCAL,
    process.env.FRONTEND_URL_PROD,
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api',authRouter);
app.use('/api',profileRouter);
app.use('/api',requestRouter);
app.use('/api',userRouter);

app.use((req, res) => {
  console.log("Route hit:", req.url);
  res.status(404).send("Route not found in Express");
});

app.get("/", (req, res) => {
  res.send("API is working");
});

connectDB()
  .then(() =>{
    console.log("Database connection established ....");
    
    console.log("App is Listening at port number 7777");
    console.log("Connected DB:", mongoose.connection.name)

})
.catch((err) =>{
     console.error("Database cannot established...")
})

module.exports = app;



