import { Router } from "express";
import { analyzeMessage } from "../services/analyzeMessage.js";
import { validateMessage } from "./validation.js";

const router = Router();

router.post("/", async (req, res) => {
  const validation = validateMessage(req.body?.message);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  const analysis = await analyzeMessage(validation.message);
  return res.json(analysis);
});

export default router;
