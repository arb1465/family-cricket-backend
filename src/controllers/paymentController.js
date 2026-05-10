import { addPaymentService } from "../services/paymentService.js";
import Payment from "../models/Payment.js"

export const addPayment = async (req, res) => {
  try {
    const { playerId, amount } = req.body;

    const payment = await Payment.create({
      paymentDate: req.body.paymentDate,
      note: req.body.note,
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

export const getPaymentsByDate = async (req, res) => {
  try {

    const selectedDate = new Date(
      req.params.date
    );

    const nextDay = new Date(selectedDate);

    nextDay.setDate(
      nextDay.getDate() + 1
    );

    const payments = await Payment.find({
      paymentDate: {
        $gte: selectedDate,
        $lt: nextDay,
      },
    }).populate("playerId");

    res.json(payments);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};