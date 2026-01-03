import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  mongoose.connection.once("connected", () => {
    console.log("Mongoose connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose disconnected");
  });

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
