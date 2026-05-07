export const getBattingTeam = (match) => {
  return match.currentInnings === 1 ? 0 : 1;
};

export const getBowlingTeam = (match) => {
  return match.currentInnings === 1 ? 1 : 0;
};

export const isInningsComplete = (team, formatOvers) => {
  return (
    team.wickets >= 10 ||
    team.ballsPlayed >= formatOvers * 6
  );
};