import { Solution } from "../models/solutionModel.js";

export const solutionListGet = async (req, res) => {
  try {
    const solutions = await Solution.find({});
    res.json(solutions);
  } catch {
    res.status(500).send(err);
  }
};

export const solutionWordGet = async (req, res) => {
  const { id } = req.params;
  try {
    const solution = await Solution.findOne({ id: Number(id) });
    if (!solution) {
      return res.status(404).json({ message: "solution not found" });
    }
    res.status(200).json(solution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal error" });
  }
};
