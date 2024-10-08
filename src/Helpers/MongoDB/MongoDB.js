import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB_URL);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("ERROR WITH CONNECTING MongoDB", error.message);
  }
};
