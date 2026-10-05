const mongoose = require("mongoose");

const connectToDb = async () => {
  const dbUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/Racer";

  try {
    await mongoose.connect(dbUrl);
    console.log("✅ MongoDB connected successfully to", dbUrl);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Attempting reconnection...");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB runtime error:", err.message);
});

module.exports = connectToDb;