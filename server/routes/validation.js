const syntheticPatientIds = new Set(["p001", "p002", "p003", "p004", "p005"]);

export function sanitizeText(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function validatePatientId(patientId) {
  return syntheticPatientIds.has(patientId);
}

export function validateMessage(message) {
  const sanitized = sanitizeText(message);
  if (!sanitized) {
    return { ok: false, error: "Message is required." };
  }
  if (sanitized.length > 1000) {
    return { ok: false, error: "Message must be 1000 characters or fewer." };
  }
  return { ok: true, message: sanitized };
}
