import mongoose from "mongoose";
import { config } from "../config/config.js";

const connectDB = () => {
  mongoose.connect(config.mongoURI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
    });
};

export default connectDB;
