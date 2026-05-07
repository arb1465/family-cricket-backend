import Match from "../models/Match.js";
import Over from "../models/Over.js";

export const createMatch = async (req, res) => {
  try {
    const {
      teamA,
      teamB,
      teamAPlayers,
      teamBPlayers,
      formatOvers,
    } = req.body;

    const match = await Match.create({
      formatOvers,
      status: "live",

      teams: [
        {
          name: teamA,
          players: teamAPlayers,
        },
        {
          name: teamB,
          players: teamBPlayers,
        },
      ],
    });

    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMatches = async (req, res) => {
  const matches = await Match.find().sort({ createdAt: -1 });
  res.json(matches);
};

export const getMatchById = async (req, res) => {
  const match = await Match.findById(req.params.id)
    .populate("teams.players");

  const overs = await Over.find({
    matchId: req.params.id,
    innings: match.currentInnings,
  }).sort({ overNumber: 1 });

  res.json({ match, overs }); // 🔥 important
};