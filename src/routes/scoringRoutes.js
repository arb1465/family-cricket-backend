import express from "express";
import { addOver } from "../controllers/scoringController.js";

const router = express.Router();

router.post("/:id/over", addOver);

export default router;