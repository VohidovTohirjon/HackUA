import { Router } from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { getCheckinsByPatient, getEscalationsByPatient, getFollowupsByPatient } from "../db.js";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const patientsPath = join(__dirname, "../data/patients.json");
const patients = JSON.parse(readFileSync(patientsPath, "utf8"));

router.get("/", (_req, res) => {
  res.json(patients);
});

router.get("/:id", (req, res) => {
  const patient = patients.find((item) => item.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ error: "Synthetic patient not found." });
  }

  return res.json({
    ...patient,
    checkins: getCheckinsByPatient(patient.id),
    followups: getFollowupsByPatient(patient.id),
    escalations: getEscalationsByPatient(patient.id),
    careSummary: {
      riskHistory: patient.riskHistory,
      latestSummary: patient.aiSummary,
      suggestedAction: patient.suggestedAction
    }
  });
});

export default router;
