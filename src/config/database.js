const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err.message);
    throw err;
  }
};

module.exports = connectDB;




// const mongoose =require("mongoose");
// const dotenv =require("dotenv");
// dotenv.config();

// const connectDB = async ()  =>{
//     // await mongoose.connect("mongodb://localhost:27017/");
//     await mongoose.connect(process.env.MONGO_URI);
    
// };

// module.exports=connectDB;
    

