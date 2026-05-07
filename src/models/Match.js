import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },

    formatOvers: Number,

    currentInnings: {
      type: Number,
      default: 1,
    },

    teams: [
      {
        name: String,
        players: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
          },
        ],
        totalRuns: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
        ballsPlayed: { type: Number, default: 0 },
      },
    ],

    toss: {
      winnerTeamIndex: Number,
      decision: String,
    },

    result: {
      winnerTeamIndex: Number,
      margin: String,
    },

    payments: [
      {
        playerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
        },
        amount: Number,
      },
    ],

    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);