import express from "express";

import {
  addPayment,
  getPaymentsByDate,
} from "../controllers/paymentController.js";

const router = express.Router();

// ✅ ADD PAYMENT
router.post("/", addPayment);

// ✅ GET PAYMENTS BY DATE
router.get(
  "/date/:date",
  getPaymentsByDate
);

export default router;