import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Payment", paymentSchema);