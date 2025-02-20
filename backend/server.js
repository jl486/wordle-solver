import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import { router } from "./routes/solutionRoutes.js";

dotenv.config();

connectDatabase();

const app = express();
app.use(cors());
app.use("/solutions", router);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`listening on port ${process.env.HTTP_PORT}`);
});
