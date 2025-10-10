import mongoose from "mongoose";
import "dotenv/config";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_BACKEND_URL as string);
  } catch (error) {
    console.log(error);
  }
};
