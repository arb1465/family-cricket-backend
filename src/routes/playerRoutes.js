import express from "express";

import {
  createPlayer,
  getPlayers,
  getPlayerById,
} from "../controllers/playerController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ✅ CREATE PLAYER
router.post(
  "/",
  upload.single("photo"),
  createPlayer
);

// ✅ GET ALL
router.get("/", getPlayers);

// ✅ GET ONE
router.get("/:id", getPlayerById);

export default router;