const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/taskDB").then(() => {
      console.log("Connection Successfull");
    });
  } catch (err) {
    console.error("MongoDB connection failed");
  }
};
module.exports = connectDB;
