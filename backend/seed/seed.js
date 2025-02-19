import mongoose from "mongoose";
import fs from "fs";
import { Word } from "../models/wordModel.js";

export const seedDatabase = async () => {
  try {
    const data = await fs.promises.readFile("./seed/words.txt", "utf-8");

    const words = data.split("\n").map((word) => word.trim()).filter(Boolean);
    const docs = words.map((word, i) => ({
      id: i + 1,
      word
    }));

    await Word.insertMany(docs);
    console.log("database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};
