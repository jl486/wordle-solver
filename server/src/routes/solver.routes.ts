import express from 'express';

import { solverGet, solverPost } from '../controllers/solver.controller';

export const solverRouter = express.Router();

solverRouter.get('/', solverGet)
solverRouter.post('/', solverPost);
