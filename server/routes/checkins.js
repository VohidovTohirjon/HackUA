import { Router } from "express";
import { randomUUID } from "node:crypto";
import { insertCheckin } from "../db.js";
import { analyzeMessage } from "../services/analyzeMessage.js";
import { sanitizeText, validateMessage, validatePatientId } from "./validation.js";

const router = Router();

router.post("/", async (req, res) => {
  const patientId = sanitizeText(req.body?.patientId);
  const channel = sanitizeText(req.body?.channel || "sms");
  const validation = validateMessage(req.body?.message);

  if (!validatePatientId(patientId)) {
    return res.status(400).json({ error: "Use a synthetic patientId such as p001, p002, p003, p004, or p005." });
  }
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const analysis = await analyzeMessage(validation.message);
  const checkin = {
    id: randomUUID(),
    patientId,
    channel,
    message: validation.message,
    analysis,
    createdAt: new Date().toISOString()
  };

  insertCheckin(checkin);

  return res.status(201).json({
    checkinId: checkin.id,
    status: "received",
    analysis
  });
});

export default router;
