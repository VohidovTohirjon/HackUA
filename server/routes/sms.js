import { Router } from "express";
import { randomUUID } from "node:crypto";
import { insertCheckin } from "../db.js";
import { analyzeMessage } from "../services/analyzeMessage.js";
import { buildSmsReply } from "../services/smsService.js";
import { sanitizeText, validateMessage, validatePatientId } from "./validation.js";

const router = Router();

router.post("/webhook", async (req, res) => {
  const patientId = sanitizeText(req.body?.patientId || req.body?.From || "p001");
  const rawMessage = req.body?.message || req.body?.Body;
  const validation = validateMessage(rawMessage);

  if (!validatePatientId(patientId)) {
    return res.status(400).json({ error: "SMS webhook accepts synthetic patient IDs only." });
  }
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const analysis = await analyzeMessage(validation.message);
  const checkin = {
    id: randomUUID(),
    patientId,
    channel: "sms",
    message: validation.message,
    analysis,
    createdAt: new Date().toISOString()
  };
  insertCheckin(checkin);

  return res.json({
    checkinId: checkin.id,
    status: "sms received",
    analysis,
    sms: buildSmsReply(analysis)
  });
});

export default router;
