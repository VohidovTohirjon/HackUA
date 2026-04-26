const barrierRules = [
  { label: "Transportation", terms: ["transport", "ride", "car", "bus", "gas", "driver", "far away", "travel"] },
  { label: "Appointment", terms: ["appointment", "missed", "reschedule", "clinic", "visit", "follow-up"] },
  { label: "Medication", terms: ["medication", "medicine", "pill", "refill", "ran out", "pharmacy", "dose"] },
  { label: "Broadband", terms: ["internet", "wifi", "wi-fi", "video", "telehealth", "broadband", "connection"] }
];

const concernRules = [
  { label: "High blood sugar", terms: ["high blood sugar", "glucose high", "sugar has been high"] },
  { label: "Breathing concern", terms: ["breathing", "short of breath", "can't breathe"] },
  { label: "Chest pain", terms: ["chest pain", "chest hurts"] },
  { label: "Symptoms worse", terms: ["worse", "worsening", "getting worse"] },
  { label: "Dizziness", terms: ["dizzy", "very dizzy", "lightheaded"] }
];

const severeTerms = ["chest pain", "severe breathing", "cannot breathe", "can't breathe", "emergency", "fainting", "very dizzy", "fainted", "unsafe"];
const stableTerms = ["stable", "okay", "ok", "no issue", "fine", "doing well", "all good"];

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function joinList(items, fallback) {
  return items.length ? items.join(", ") : fallback;
}

function scoreRisk({ barrierCount, concernCount, hasSevereLanguage, isStable }) {
  if (hasSevereLanguage) {
    return {
      riskLevel: "High",
      score: 92,
      reason: "Message included urgent or severe symptom language that should be reviewed by a human care team."
    };
  }
  if (concernCount > 0 && barrierCount > 0) {
    return {
      riskLevel: "High",
      score: 86,
      reason: "Patient reported both an access barrier and a possible chronic-care concern, which can interrupt continuity of care."
    };
  }
  if (barrierCount > 0 || concernCount > 0) {
    return {
      riskLevel: "Medium",
      score: 58,
      reason: "Patient reported a barrier or concern that may need follow-up before it becomes a missed-care event."
    };
  }
  if (isStable) {
    return { riskLevel: "Low", score: 18, reason: "Patient reported stability and no major access barrier was detected." };
  }
  return { riskLevel: "Low", score: 25, reason: "No major access barrier or urgent concern was detected in the check-in." };
}

export function ruleBasedAnalyze(message) {
  const text = String(message || "").toLowerCase();
  const barriers = barrierRules.filter((rule) => includesAny(text, rule.terms)).map((rule) => rule.label);
  const healthConcerns = concernRules.filter((rule) => includesAny(text, rule.terms)).map((rule) => rule.label);
  const hasSevereLanguage = includesAny(text, severeTerms);
  const scored = scoreRisk({
    barrierCount: barriers.length,
    concernCount: healthConcerns.length,
    hasSevereLanguage,
    isStable: includesAny(text, stableTerms)
  });

  const recommendedRole =
    scored.riskLevel === "High"
      ? "Community health worker + nurse review"
      : scored.riskLevel === "Medium"
        ? "Community health worker or care coordinator"
        : "Automated check-in with care team visibility";

  const suggestedAction =
    hasSevereLanguage
      ? "Urgent human review recommended. Route to a nurse or clinician immediately and address any reported access barrier after safety is assessed."
      : scored.riskLevel === "High"
      ? "Contact patient within 24 hours, address the reported access barrier, and route any health concern to a nurse for review."
      : scored.riskLevel === "Medium"
        ? "Follow up within 2-3 business days, clarify the barrier, and connect the patient with care coordination support."
        : "Send encouragement, keep weekly check-ins active, and monitor for new barriers.";

  const safetyFlags = [
    "No diagnosis",
    "No prescribing",
    "No treatment changes",
    "Human review required",
    "Care coordination only"
  ];

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
    patientReply:
      hasSevereLanguage
        ? "If you feel severely ill, unsafe, or are having an emergency, call emergency services."
        : scored.riskLevel === "Low"
        ? "Thanks for checking in. We will keep your weekly check-ins active. Reply anytime if something changes."
        : "Thanks for letting us know. A care team member may follow up. If you feel severely ill or unsafe, call emergency services.",
    staffSummary: `Patient message suggests ${barrierText.toLowerCase()} and ${concernText.toLowerCase()}. Follow-up should focus on coordination and human review, not automated clinical decision-making.`,
    confidence: barriers.length || healthConcerns.length ? "High pattern match" : "Moderate pattern match",
    transparencyNotes: [
      `Matched barriers: ${barrierText}.`,
      `Matched concerns: ${concernText}.`,
      `Risk rule used: ${scored.reason}`
    ],
    safetyFlags,
    source: "rule-based fallback"
  };
}
