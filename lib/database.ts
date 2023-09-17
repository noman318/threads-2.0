import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status
export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  // mongoose.set("strictQuery", true);
  // const MONGODB_URL_LOCAL = "mongodb://localhost:27017/prompt";
  // console.log("MONGODB_URL_LOCAL", MONGODB_URL_LOCAL);
  // console.log("isConnected", isConnected);
  if (!process.env.MONGODB_URL_LOCAL) return console.log("Missing MongoDB URL");

  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }
  console.log("Connecting to MongoDB");
  try {
    await mongoose.connect(process.env.MONGODB_URL_ATLAS || "", {
      dbName: "Threads-2",
    });
    isConnected = true;
    // console.log("isConnected in try", isConnected);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error", error);
  }
};
