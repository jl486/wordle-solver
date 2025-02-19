import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import { router } from "./routes/wordRoutes.js";

dotenv.config();

connectDatabase();

const app = express();
app.use(cors());
app.use("/word", router);
