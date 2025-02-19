import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import { Word } from "../models/wordModel.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    const data = await fs.promises.readFile("backend/seed/words.txt", "utf-8");

    const words = data.split("\n").map((word) => word.trim()).filter(Boolean);
    const documents = words.map((word, i) => ({
      id: i + 1,
      word
    }));

    await Word.insertMany(documents);
    if (process.env.ENVIRONMENT === "development") {
      console.log("database seeded");
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
