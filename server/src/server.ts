import cors from 'cors';
import express from 'express';

import { connectDatabase } from './config/db';
import { solutionRouter } from './routes/solution.routes';
import { solverRouter } from './routes/solver.routes';
import { error } from './middleware/error';

connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/solutions', solutionRouter);
app.use('/solver', solverRouter);

app.use(error);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Listening on port ${process.env.HTTP_PORT}`);
});
