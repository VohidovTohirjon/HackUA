import { Bot, CheckCircle2, ShieldX } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const points = [
  "It is not a medical chatbot.",
  "It is not a diagnosis system.",
  "It is not replacing providers.",
  "It is a care coordination layer for access barriers.",
  "The AI output is structured, explainable, and reviewed by humans."
];

export default function NotChatbot() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="AI Boundary"
        title="Why this is not just a chatbot"
        description="CareBridge AI is built around a healthcare workflow: classify, explain, route, and support human follow-up."
      />
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-care-navy p-6 text-white md:p-8">
            <Bot className="h-8 w-8 text-cyan-200" />
            <h3 className="mt-4 text-2xl font-black">Structured coordination, not open-ended medical advice</h3>
            <p className="mt-3 text-sm leading-7 text-cyan-50">
              The prototype demonstrates simulated AI logic that produces risk labels, reasons, summaries, and routing suggestions for care teams.
            </p>
          </div>
          <div className="grid gap-3 p-6 md:grid-cols-2 md:p-8">
            {points.map((point, index) => (
              <div key={point} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                {index < 3 ? (
                  <ShieldX className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                )}
                <p className="text-sm font-bold leading-6 text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
