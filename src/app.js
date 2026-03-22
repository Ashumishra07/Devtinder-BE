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
const dbConnectMiddleware = require("./middlewares/dbConnect");
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
app.use(dbConnectMiddleware)

app.use('/api',authRouter);
app.use('/api',profileRouter);
app.use('/api',requestRouter);
app.use('/api',userRouter);



app.get("/", (req, res) => {
  res.send("API is working");
});

app.use((req, res) => {
  console.log("Route hit:", req.url);
  res.status(404).send("Route not found in Express");
});


module.exports = app;



