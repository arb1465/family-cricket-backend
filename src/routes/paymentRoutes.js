import express from "express";
import {
  addPayment,
  getPaymentsByMatch,
} from "../controllers/paymentController.js";

const router = express.Router();

// ✅ add payment
router.post("/:matchId/payment", addPayment);

// ✅ get payments
router.get("/:matchId/payment", getPaymentsByMatch);

export default router;