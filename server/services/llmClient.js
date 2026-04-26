const SYSTEM_PROMPT =
  "You are a healthcare care-coordination assistant. You do not diagnose, prescribe, or make medical decisions. Analyze the patient message only for access barriers, reported concerns, risk level, and safe human follow-up routing. Return strict JSON only.";

export async function analyzeWithLLM(message) {
  if (!process.env.AI_API_KEY) {
    return null;
  }

  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const baseUrl = process.env.AI_API_BASE_URL || "https://api.openai.com/v1";
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AI_API_KEY}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: JSON.stringify({
            message,
            requiredShape: {
              riskLevel: "Low | Medium | High",
              score: "number 0-100",
              barriers: ["Transportation | Appointment | Medication | Broadband | None detected"],
              healthConcerns: ["reported concerns only"],
              reason: "short explanation",
              recommendedRole: "safe human follow-up role",
              suggestedAction: "care coordination only",
              patientReply: "plain language",
              staffSummary: "brief staff summary",
              confidence: "short confidence label",
              safetyFlags: ["No diagnosis", "Human review required"]
            }
          })
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`LLM request failed with ${response.status}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("LLM response missing content");
  }

  const parsed = JSON.parse(content);
  return {
    ...parsed,
    safetyFlags: [
      ...new Set([
        ...(parsed.safetyFlags || []),
        "No diagnosis",
        "No prescribing",
        "No treatment changes",
        "Human review required"
      ])
    ],
    source: "llm"
  };
}
