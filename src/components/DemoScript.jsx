import { PlayCircle } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const steps = [
  "Maria receives a weekly SMS check-in.",
  "Maria reports no ride and high blood sugar.",
  "AI detects transportation plus health concern and explains why.",
  "Dashboard marks the case high risk.",
  "Community health worker receives a call goal, script, checklist, and resource suggestions.",
  "Provider receives a concise summary with a safety disclaimer.",
  "Human care team follows up and makes final decisions."
];

export default function DemoScript({ onRunDemo }) {
  return (
    <section id="demo" className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Demo Script"
          title="A clear one-minute judging flow"
          description="This story shows how meaningful AI improves coordination without overclaiming or replacing clinicians."
        />
        <Card className="p-6">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-4 border-b border-slate-100 py-4 last:border-b-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-sm font-black text-care-cyan">
                {index + 1}
              </div>
              <p className="text-slate-700">{step}</p>
            </div>
          ))}
        </Card>
        <div className="mt-8 rounded-xl bg-gradient-to-r from-care-blue to-care-cyan p-6 text-center text-white shadow-soft">
          <p className="text-xl font-black leading-8">
            CareBridge AI uses meaningful AI to improve rural chronic care access by helping care teams identify barriers earlier, prioritize limited staff time, and coordinate human follow-up through low-bandwidth SMS and voice workflows.
          </p>
          <button
            onClick={onRunDemo}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-care-blue"
          >
            <PlayCircle className="h-4 w-4" />
            Run Winning Demo
          </button>
        </div>
      </div>
    </section>
  );
}
