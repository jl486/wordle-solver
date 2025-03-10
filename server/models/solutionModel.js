import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema(
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

export const Solution = mongoose.model("Solution", solutionSchema);
