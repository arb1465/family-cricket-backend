import express from "express";
import cors from "cors";

import matchRoutes from "./routes/matchRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import scoringRoutes from "./routes/scoringRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// middleware
app.use(cors({
  origin: [
      "http://localhost:5173",

      "https://family-cricket-6ryeu2f3-aasutosh-baraiyas-projects.vercel.app",

      "https://family-cricket.vercel.app",
    ],
  credentials: true,
}));
app.use(express.json());

app.use("/api/matches", matchRoutes);
app.use("/api/players", playerRoutes);
app.use("/api", scoringRoutes);
app.use("/api/payments", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API server is running...");
});

export default app;