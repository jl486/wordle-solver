import mongoose from "mongoose";
import fs from "fs";
import { Solution } from "../models/solutionModel.js";

export const seedDatabase = async () => {
  try {
    const data = await fs.promises.readFile("./seed/solutions.txt", "utf-8");

    const solutions = data.split("\n").map((solution) => solution.trim()).filter(Boolean);
    const docs = solutions.map((solution, i) => ({
      id: i + 1,
      word: solution
    }));

    await Solution.insertMany(docs);
    console.log("database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};
