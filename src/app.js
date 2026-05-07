import express from "express";
import cors from "cors";

import matchRoutes from "./routes/matchRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import scoringRoutes from "./routes/scoringRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/matches", matchRoutes);
app.use("/api/players", playerRoutes);
app.use("/api", scoringRoutes);
app.use("/api", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API server is running...");
});

export default app;