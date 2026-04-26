export const riskRank = {
  High: 0,
  Medium: 1,
  Low: 2
};

export function scoreRisk({ barrierCount, concernCount, hasSevereLanguage, isStable }) {
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
      reason:
        "Patient reported both an access barrier and a possible chronic-care concern, which can interrupt continuity of care."
    };
  }

  if (barrierCount > 0 || concernCount > 0) {
    return {
      riskLevel: "Medium",
      score: 58,
      reason:
        "Patient reported a barrier or concern that may need follow-up before it becomes a missed-care event."
    };
  }

  if (isStable) {
    return {
      riskLevel: "Low",
      score: 18,
      reason: "Patient reported stability and no major access barrier was detected."
    };
  }

  return {
    riskLevel: "Low",
    score: 25,
    reason: "No major access barrier or urgent concern was detected in the check-in."
  };
}
