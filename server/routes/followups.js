import { Router } from "express";
import { randomUUID } from "node:crypto";
import { insertFollowup } from "../db.js";
import { sanitizeText, validatePatientId } from "./validation.js";

const router = Router();

router.post("/", async (req, res) => {
  const patientId = sanitizeText(req.body?.patientId);
  const outcome = sanitizeText(req.body?.outcome);
  const notes = sanitizeText(req.body?.notes);
  const nextFollowUpDate = sanitizeText(req.body?.nextFollowUpDate);

  if (!validatePatientId(patientId)) {
    return res.status(400).json({ error: "Use a synthetic patientId such as p001, p002, p003, p004, or p005." });
  }
  if (!outcome) {
    return res.status(400).json({ error: "Outcome is required." });
  }
  if (notes.length > 1200) {
    return res.status(400).json({ error: "Notes must be 1200 characters or fewer." });
  }

  const followup = {
    id: randomUUID(),
    patientId,
    outcome,
    notes,
    nextFollowUpDate,
    createdAt: new Date().toISOString()
  };

  insertFollowup(followup);

  return res.status(201).json({ status: "saved", followup });
});

export default router;
