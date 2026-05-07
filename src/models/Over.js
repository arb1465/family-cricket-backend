import mongoose from "mongoose";

const ballSchema = new mongoose.Schema({
  runs: Number,
  extras: Number,
  extraType: String,
  isLegalDelivery: Boolean,
  wicket: Boolean,
  wicketType: String,
  playerOutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
});

const overSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },

    innings: Number,

    overNumber: Number,

    bowlerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },

    balls: [ballSchema],

    totalRuns: { type: Number, default: 0 },

    wicketsInOver: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Over", overSchema);