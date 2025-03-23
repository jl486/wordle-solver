import { NextFunction, Request, Response } from 'express';

export const error = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'Internal error'
  });
};
