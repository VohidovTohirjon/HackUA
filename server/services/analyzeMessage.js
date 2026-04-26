import { analyzeWithLLM } from "./llmClient.js";
import { ruleBasedAnalyze } from "./ruleBasedAnalyzer.js";
import { applySafetyGuardrails } from "./safetyGuardrails.js";

export async function analyzeMessage(message) {
  try {
    const llmAnalysis = await analyzeWithLLM(message);
    if (llmAnalysis) {
      return applySafetyGuardrails(llmAnalysis, message);
    }
  } catch (error) {
    console.warn("LLM analysis unavailable, using rule-based fallback:", error.message);
  }

  return applySafetyGuardrails(ruleBasedAnalyze(message), message);
}
