const connectDB = require("../config/database");

const dbConnectMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).send("Database connection error");
  }
};

module.exports = dbConnectMiddleware;