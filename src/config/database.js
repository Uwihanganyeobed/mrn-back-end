import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
export default connectDB;
