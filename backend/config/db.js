import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    if (process.env.ENVIRONMENT === "development") {
      console.log(`database connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
