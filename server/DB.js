const mongoose = require("mongoose");
const connectToDb= async()=>{
    try{
   await mongoose.connect("mongodb://127.0.0.1:27017/Racer", {
   
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is Connected");
  }catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
}}
module.exports = connectToDb;