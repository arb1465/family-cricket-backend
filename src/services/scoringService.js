
import Match from "../models/Match.js";
import Over from "../models/Over.js";

export const addOverService = async (matchId, bowlerId, balls) => {
  const match = await Match.findById(matchId);

  if (!match) throw new Error("Match not found");

  const battingIndex = match.currentInnings === 1 ? 0 : 1;
  const bowlingIndex = battingIndex === 0 ? 1 : 0;

  const team = match.teams[battingIndex];
  const opponent = match.teams[bowlingIndex];

  const overNumber = Math.floor(team.ballsPlayed / 6) + 1;

  const over = await Over.create({
    matchId,
    innings: match.currentInnings,
    overNumber,
    bowlerId,
    balls: [],
    totalRuns: 0,
    wicketsInOver: 0,
  });

  // 🧠 PROCESS BALLS
  for (let b of balls) {
    if (!b) continue;

    let runs = 0;
    let extras = 0;
    let extraType = null;
    let wicket = false;

    if (b === "WD") {
      extras = 1;
      extraType = "wide";
    } else if (b === "NB") {
      extras = 1;
      extraType = "no-ball";
    } else if (b === "W") {
      wicket = true;
    } else {
      runs = Number(b);
    }

    const isLegal = !(b === "WD" || b === "NB");

    // 🔥 UPDATE MATCH TEAM STATS
    team.totalRuns += runs + extras;

    if (isLegal) {
      team.ballsPlayed += 1;
    }

    if (wicket) {
      team.wickets += 1;
      over.wicketsInOver += 1;
    }

    // 🔥 SAVE BALL IN OVER
    over.balls.push({
      runs,
      extras,
      extraType,
      isLegalDelivery: isLegal,
      wicket,
    });

    over.totalRuns += runs + extras;
  }

  // 🧠 INNINGS + MATCH LOGIC

  const maxWickets = team.players.length;
  const isAllOut = team.wickets >= maxWickets;
  const isOversDone = team.ballsPlayed >= match.formatOvers * 6;

  // 🔥 FIRST INNINGS END
  if (match.currentInnings === 1 && (isAllOut || isOversDone)) {
    match.currentInnings = 2;
  }

  // 🔥 SECOND INNINGS LOGIC
  if (match.currentInnings === 2) {
    const firstTeam = match.teams[0];
    const secondTeam = match.teams[1];

    const target = firstTeam.totalRuns + 1;

    const chasingTeam = secondTeam; // always 2nd team batting

    const chaseCompleted = chasingTeam.totalRuns >= target;
    const chaseFailed =
      chasingTeam.wickets >= (chasingTeam.players.length - 1) ||
      chasingTeam.ballsPlayed >= match.formatOvers * 6;

    if (chaseCompleted) {
      match.status = "completed";

      match.result = {
        winnerTeamIndex: 1,
        margin: `${secondTeam.name} won by ${
          secondTeam.players.length - 1 - secondTeam.wickets
        } wickets`,
      };
    } else if (chaseFailed) {
      match.status = "completed";

      match.result = {
        winnerTeamIndex: 0,
        margin: `${firstTeam.name} won by ${
          firstTeam.totalRuns - secondTeam.totalRuns
        } runs`,
      };
    }
  }

  await over.save();
  await match.save();

  // 🔥 RETURN FRESH DATA
  const updatedMatch = await Match.findById(matchId);

  return updatedMatch;
};