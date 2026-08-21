// console.log ("Starting a project");

const express = require("express");
app=express();
const connectDB =require("./config/database");
const cookieParser =require("cookie-parser");
const authRouter = require("./routes/authroute");
const profileRouter = require("./routes/profileroute");
const requestRouter =require("./routes/requestrouter");
const userRouter = require("./routes/userroute");
const paymentRouter = require("./routes/paymentroute");
const cors = require("cors");
const mongoose = require("mongoose");
// Creating a server without using express , we will use http module of nodejs
const http = require("http");
const initializeSocket = require("./utility/socket");
const { chatRouter } = require("./routes/chatroute");
require("dotenv").config();
require("./utility/cronScheduler");
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));
app.use(cors({
  origin:[
    "http://localhost:5173", // Vite dev
    "http://localhost:3000", // React dev
    "https://devtinder-fe-gamma.vercel.app" // Production
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);
app.use('/',paymentRouter);
app.use('/',chatRouter);

app.use('/api', (req, res) => {
    res.send("API is working fine...");
});

const server = http.createServer(app);

initializeSocket(server);


connectDB()
  .then(() =>{
    console.log("Database connection established ....");
    server.listen(7777,() =>{
    console.log("App is Listening at port number 7777");
    console.log("Connected DB:", mongoose.connection.name);
});

})
.catch((err) =>{
     console.error("Database cannot established...")
})




