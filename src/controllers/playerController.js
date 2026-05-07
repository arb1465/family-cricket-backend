import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const player = await Player.create({
      name: req.body.name,
      photoUrl: req.file?.path || "",
    });

    res.status(201).json(player);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const getPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

export const getPlayerById = async (req, res) => {
  const player = await Player.findById(req.params.id)
  .populate({
    path: "payments.matchId",
    select: "date",
  });
  
  res.json(player);
};