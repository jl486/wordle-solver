import fs from 'fs';
import path from 'path';

import mongoose from 'mongoose';

import { Solution } from '../models/solution.model';

export const seedDatabase = async () => {
  try {
    const solutionsPath = path.resolve('/data/solutions.txt');
    const data = await fs.promises.readFile(solutionsPath, 'utf-8');

    const solutions = data.split('\n').map((solution) => solution.trim()).filter(Boolean);
    const docs = solutions.map((solution, i) => ({
      id: i + 1,
      word: solution
    }));

    await Solution.insertMany(docs);
    console.log('Database seeded');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};
