import express from "express";
import { Word } from "../models/wordModel.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const words = await Word.find({});
    res.json(words);
  } catch (err) {
    res.status(500).send(err);
  }
});
