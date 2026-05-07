import { addPaymentService } from "../services/paymentService.js";
import Payment from "../models/Payment.js"

export const addPayment = async (req, res) => {
  try {
    const { playerId, amount } = req.body;

    const payment = await Payment.create({
      matchId: req.params.matchId, // ✅ FIX HERE
      playerId,
      amount,
    });

    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPaymentsByMatch = async (req, res) => {
  try {
    const payments = await Payment.find({
      matchId: req.params.matchId,
    }).populate("playerId", "name"); // 🔥 FIX HERE

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};