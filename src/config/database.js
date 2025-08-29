import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.error("MongoDB connected");

  } catch (error) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
export default connectDB;
