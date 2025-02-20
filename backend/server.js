import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import { solutionRouter } from "./routes/solutionRoutes.js";

dotenv.config();

connectDatabase();

const app = express();
app.use(cors());
app.use("/", solutionRouter);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`listening on port ${process.env.HTTP_PORT}`);
});
