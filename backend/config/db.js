import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    if (process.env.ENVIRONMENT === "development") {
      console.log(`database connected: ${db.connection.host}:${db.connection.port}/${db.connection.name}`);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
