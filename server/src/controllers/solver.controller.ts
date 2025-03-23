import { spawnSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

export const solverGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pythonProcess = spawnSync('python3', [
      path.resolve('../solver/algorithm.py')
    ]);
    const error = pythonProcess.stderr?.toString().trim();
    const output = pythonProcess.stdout?.toString().trim();
  
    if (pythonProcess.error) {
      console.error(error);
      res.status(500).json({ error: 'Python process error' });
    } else if (pythonProcess.status !== 0) {
      console.error(error);
      res.status(500).json({ error: error });
    }

    // const buffer = await fs.readFile('/solver/results.json', 'utf-8');
    // const resultParsed = JSON.parse(buffer.toString());
    res.json({ output: output });
  } catch (error) {
    next(error);
  }
};

export const solverPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { input } = req.body;
    const response = await axios.post('http://localhost:8000/solve', { input });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};
