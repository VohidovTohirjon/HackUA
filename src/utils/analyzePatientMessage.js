import { scoreRisk } from "./riskScoring";
import { joinList } from "./formatters";

const barrierRules = [
  {
    label: "Transportation",
    terms: ["transport", "ride", "car", "bus", "gas", "driver", "far away", "travel"]
  },
  {
    label: "Appointment",
    terms: ["appointment", "missed", "reschedule", "clinic", "visit", "follow-up"]
  },
  {
    label: "Medication",
    terms: ["medication", "medicine", "pill", "refill", "ran out", "pharmacy", "dose"]
  },
  {
    label: "Broadband",
    terms: ["internet", "wifi", "wi-fi", "video", "telehealth", "broadband", "connection"]
  }
];

const concernRules = [
  { label: "High blood sugar", terms: ["high blood sugar", "glucose high", "sugar has been high"] },
  { label: "Breathing concern", terms: ["breathing", "short of breath", "can't breathe"] },
  { label: "Chest pain", terms: ["chest pain", "chest hurts"] },
  { label: "Symptoms worse", terms: ["worse", "worsening", "getting worse"] },
  { label: "Dizziness", terms: ["dizzy", "very dizzy", "lightheaded"] }
];

const severeTerms = [
  "chest pain",
  "severe breathing",
  "can't breathe",
  "emergency",
  "very dizzy",
  "fainted",
  "unsafe"
];

const stableTerms = ["stable", "okay", "ok", "no issue", "fine", "doing well", "all good"];

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

// This simulates an AI classifier for demo purposes. A production version would
// use evaluated models, clinical governance, consent controls, and audit logs.
export function analyzePatientMessage(message) {
  const text = message.toLowerCase();

  const barriers = barrierRules
    .filter((rule) => includesAny(text, rule.terms))
    .map((rule) => rule.label);

  const healthConcerns = concernRules
    .filter((rule) => includesAny(text, rule.terms))
    .map((rule) => rule.label);

  const hasSevereLanguage = includesAny(text, severeTerms);
  const isStable = includesAny(text, stableTerms);
  const scored = scoreRisk({
    barrierCount: barriers.length,
    concernCount: healthConcerns.length,
    hasSevereLanguage,
    isStable
  });

  const recommendedRole =
    scored.riskLevel === "High"
      ? "Community health worker + nurse review"
      : scored.riskLevel === "Medium"
        ? "Community health worker or care coordinator"
        : "Automated check-in with care team visibility";

  const suggestedAction =
    scored.riskLevel === "High"
      ? "Contact patient within 24 hours, address the reported access barrier, and route any health concern to a nurse for review."
      : scored.riskLevel === "Medium"
        ? "Follow up within 2-3 business days, clarify the barrier, and connect the patient with care coordination support."
        : "Send encouragement, keep weekly check-ins active, and monitor for new barriers.";

  const patientReply =
    scored.riskLevel === "Low"
      ? "Thanks for checking in. We will keep your weekly check-ins active. Reply anytime if something changes."
      : "Thanks for letting us know. A care team member may follow up. If you feel severely ill or unsafe, call emergency services.";

  const safetyFlags = [
    "Care coordination only",
    "No diagnosis generated",
    "No medication or treatment change recommended",
    "Human review required for clinical decisions"
  ];

  if (hasSevereLanguage) {
    safetyFlags.push("Urgent language detected: escalate to human review");
  }

  const barrierText = joinList(barriers, "no access barrier");
  const concernText = joinList(healthConcerns, "no major health concern");

  return {
    riskLevel: scored.riskLevel,
    score: scored.score,
    barriers: barriers.length ? barriers : ["None detected"],
    healthConcerns: healthConcerns.length ? healthConcerns : ["None detected"],
    reason: scored.reason,
    recommendedRole,
    suggestedAction,
    patientReply,
    staffSummary: `Patient message suggests ${barrierText.toLowerCase()} and ${concernText.toLowerCase()}. Follow-up should focus on coordination and human review, not automated clinical decision-making.`,
    confidence: barriers.length || healthConcerns.length ? "High pattern match" : "Moderate pattern match",
    transparencyNotes: [
      `Matched barriers: ${barrierText}.`,
      `Matched concerns: ${concernText}.`,
      `Risk rule used: ${scored.reason}`
    ],
    safetyFlags
  };
}
