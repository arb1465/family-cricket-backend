import { addOverService } from "../services/scoringService.js";

export const addOver = async (req, res) => {
  try {
    const { bowlerId, balls } = req.body;

    const match = await addOverService(
      req.params.id,
      bowlerId,
      balls
    );

    res.json(match);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};