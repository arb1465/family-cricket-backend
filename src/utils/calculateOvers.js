export const getOverNumber = (ballsPlayed) => {
  return Math.floor(ballsPlayed / 6) + 1;
};

export const isOverComplete = (ballsPlayed) => {
  return ballsPlayed > 0 && ballsPlayed % 6 === 0;
};