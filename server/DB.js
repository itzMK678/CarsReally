const mongoose = require("mongoose");
const connectToDb= async()=>{
    try{
   await mongoose.connect(process.env.DATABASE_URL, {
   
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is Connected");
  }catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
}}
module.exports = connectToDb;