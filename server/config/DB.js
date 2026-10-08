const mongoose = require("mongoose");

let isConnected = false;

const connectToDb = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const dbUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/Racer";

  try {
    const conn = await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully to", dbUrl);
    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // In local development or standalone server, rethrow or log
    isConnected = false;
    return null;
  }
};

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.warn("⚠️ MongoDB disconnected. Ready to reconnect on next request.");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB runtime error:", err.message);
});

module.exports = connectToDb;