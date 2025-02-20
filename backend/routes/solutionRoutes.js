import express from "express";
import { Solution } from "../models/solutionModel.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const solution = await Solution.find({});
    res.json(solution);
  } catch (err) {
    res.status(500).send(err);
  }
});
