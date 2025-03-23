import { NextFunction, Request, Response } from 'express';

import { Solution } from '../models/solution.model';

export const solutionListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const solutions = await Solution.find({});
    res.json(solutions);
  } catch (error) {
    next(error);
  }
};

export const solutionWordGet = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const solution = await Solution.findOne({ id: Number(id) });
    if (!solution) {
      res.status(404).json({ message: 'Solution not found' });
    }
    res.status(200).json(solution);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
