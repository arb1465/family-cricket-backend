import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    photoUrl: {
      type: String,
    },

    stats: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
    },

    payments: [
      {
        matchId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Match",
        },
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Player", playerSchema);