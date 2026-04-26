import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json([
    { label: "Missed appointment reduction goal", value: "15%", note: "Proposed diabetes pilot target, not a proven result" },
    { label: "Follow-up response time", value: "< 24h", note: "Goal for high-risk coordination flags" },
    { label: "Patient check-in response rate", value: "65%", note: "Target for weekly SMS or voice check-ins" },
    { label: "Staff triage time saved", value: "5 min/case", note: "Estimated time saved through structured summaries" },
    { label: "Barrier detection accuracy", value: "90%", note: "Pilot measurement against human-reviewed labels" },
    { label: "Patient satisfaction", value: "4.5/5", note: "Target for trust, clarity, and follow-up experience" }
  ]);
});

export default router;
