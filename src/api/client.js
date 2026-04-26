import { analyzePatientMessage } from "../utils/analyzePatientMessage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "API request failed" }));
    throw new Error(error.error || "API request failed");
  }

  return response.json();
}

export async function fetchPatients(fallbackPatients) {
  try {
    return { data: await request("/api/patients"), source: "api" };
  } catch (error) {
    return { data: fallbackPatients, source: "local review", error: error.message };
  }
}

export async function analyzeMessage(message) {
  try {
    const analysis = await request("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ message })
    });
    return { analysis, apiOnline: true };
  } catch (error) {
    return {
      analysis: {
        ...analyzePatientMessage(message),
        source: "frontend rule-based fallback"
      },
      apiOnline: false,
      error: error.message
    };
  }
}

export async function createCheckin({ patientId, channel = "sms", message }) {
  try {
    return {
      data: await request("/api/checkins", {
        method: "POST",
        body: JSON.stringify({ patientId, channel, message })
      }),
      apiOnline: true
    };
  } catch (error) {
    return {
      data: {
        checkinId: `local-${Date.now()}`,
        status: "local review",
        analysis: {
          ...analyzePatientMessage(message),
          source: "frontend rule-based fallback"
        }
      },
      apiOnline: false,
      error: error.message
    };
  }
}

export async function fetchMetrics(fallbackMetrics) {
  try {
    return { data: await request("/api/metrics"), source: "api" };
  } catch (error) {
    return { data: fallbackMetrics, source: "local review", error: error.message };
  }
}

export async function saveFollowup(followup) {
  return request("/api/followups", {
    method: "POST",
    body: JSON.stringify(followup)
  });
}

export async function createEscalation(escalation) {
  return request("/api/escalations", {
    method: "POST",
    body: JSON.stringify(escalation)
  });
}
