import express from "express"
import { solutionListGet, solutionWordGet } from "../controllers/solutionController.js";

export const solutionRouter = express.Router();

solutionRouter.get("/solutions", solutionListGet);
solutionRouter.get("/solutions/:id", solutionWordGet);
