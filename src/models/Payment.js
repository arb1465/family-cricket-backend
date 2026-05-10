import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  paymentDate: {
    type: Date,
    required: true,
  },

  note: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model(
  "Payment",
  paymentSchema
);