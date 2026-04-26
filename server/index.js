import "dotenv/config";
import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyze.js";
import checkinRoutes from "./routes/checkins.js";
import patientRoutes from "./routes/patients.js";
import followupRoutes from "./routes/followups.js";
import escalationRoutes from "./routes/escalations.js";
import metricRoutes from "./routes/metrics.js";
import smsRoutes from "./routes/sms.js";

const app = express();
const port = process.env.PORT || 3001;

const allowedLocalOrigins = /^http:\/\/(localhost|127\.0\.0\.1):51\d{2}$/;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origin === process.env.FRONTEND_ORIGIN || allowedLocalOrigins.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CareBridge API CORS"));
    }
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "CareBridge AI API",
    aiMode: process.env.AI_API_KEY ? "llm optional" : "rule-based fallback",
    smsMode: process.env.TWILIO_ACCOUNT_SID ? "twilio-configured-stub" : "simulated-sms",
    database: "sqlite"
  });
});

app.use("/api/analyze", analyzeRoutes);
app.use("/api/checkins", checkinRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/followups", followupRoutes);
app.use("/api/escalations", escalationRoutes);
app.use("/api/metrics", metricRoutes);
app.use("/api/sms", smsRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "CareBridge API error. Human review remains required." });
});

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`CareBridge AI API running on http://localhost:${port}`);
});

server.on("error", (error) => {
  console.error("Unable to start CareBridge AI API:", error.message);
  process.exit(1);
});
