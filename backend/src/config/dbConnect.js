import mongoose from "mongoose";


const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.info(`MongoDB connected - Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default dbConnect;