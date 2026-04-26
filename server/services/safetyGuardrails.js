const requiredSafetyFlags = ["No diagnosis", "No prescribing", "Human review required"];
const severeTerms = [
  "chest pain",
  "severe breathing",
  "cannot breathe",
  "can't breathe",
  "emergency",
  "fainting",
  "fainted",
  "very dizzy"
];

export function hasSevereLanguage(message) {
  const text = String(message || "").toLowerCase();
  return severeTerms.some((term) => text.includes(term));
}

export function applySafetyGuardrails(analysis, message) {
  const severe = hasSevereLanguage(message);
  const safetyFlags = [...new Set([...(analysis.safetyFlags || []), ...requiredSafetyFlags])];

  return {
    ...analysis,
    safetyFlags,
    suggestedAction: severe
      ? "Urgent human review recommended. Route to a nurse or clinician immediately and address any reported access barrier after safety is assessed."
      : analysis.suggestedAction,
    patientReply: severe
      ? "If you feel severely ill, unsafe, or are having an emergency, call emergency services."
      : analysis.patientReply
  };
}
