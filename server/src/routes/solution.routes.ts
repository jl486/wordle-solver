import express from 'express';

import { solutionListGet, solutionWordGet } from '../controllers/solution.controller';

export const solutionRouter = express.Router();

solutionRouter.get('/', solutionListGet);
solutionRouter.get('/:id', solutionWordGet);
