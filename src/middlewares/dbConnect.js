const connectDB = require("../config/database");

let dbInitialized = false;

const dbConnectMiddleware = async (req, res, next) => {
  try {
    if (!dbInitialized) {
      await connectDB();
      dbInitialized = true;
    }
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    return res.status(500).send("Database connection error");
  }
};

module.exports = dbConnectMiddleware;





// const connectDB = require("../config/database");

// const dbConnectMiddleware = async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (err) {
//     console.error("DB connection failed:", err);
//     res.status(500).send("Database connection error");
//   }
// };

// module.exports = dbConnectMiddleware;