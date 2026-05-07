import Match from "../models/Match.js";
import Player from "../models/Player.js";

export const addPaymentService = async (
  matchId,
  playerId,
  amount
) => {
  const match = await Match.findById(matchId);
  const player = await Player.findById(playerId);

  if (!match || !player)
    throw new Error("Match or Player not found");

  // update match
  match.payments.push({ playerId, amount });

  // update player
  player.payments.push({ matchId, amount });

  await match.save();
  await player.save();

  return match.payments;
};