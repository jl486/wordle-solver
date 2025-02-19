import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    word: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

export const Word = mongoose.model("Word", wordSchema);
