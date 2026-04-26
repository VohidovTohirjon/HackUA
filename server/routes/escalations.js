import { Router } from "express";
import { randomUUID } from "node:crypto";
import { insertEscalation } from "../db.js";
import { sanitizeText, validatePatientId } from "./validation.js";

const router = Router();

router.post("/", (req, res) => {
  const patientId = sanitizeText(req.body?.patientId);
  const priority = sanitizeText(req.body?.priority || "High");
  const reason = sanitizeText(req.body?.reason);
  const summary = sanitizeText(req.body?.summary);

  if (!validatePatientId(patientId)) {
    return res.status(400).json({ error: "Use a synthetic patientId such as p001, p002, p003, p004, or p005." });
  }
  if (!reason || !summary) {
    return res.status(400).json({ error: "Escalation reason and summary are required." });
  }

  const escalation = {
    id: randomUUID(),
    patientId,
    priority,
    reason,
    summary,
    status: "sent to nurse review",
    createdAt: new Date().toISOString()
  };

  insertEscalation(escalation);

  return res.status(201).json({
    status: "escalation created",
    escalation
  });
});

export default router;
