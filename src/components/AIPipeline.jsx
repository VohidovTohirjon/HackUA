import { BrainCircuit, MessageSquareText, Route, ShieldQuestion, UserRoundCheck } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const steps = [
  ["SMS/voice check-in", "Patient reports needs in plain language or by simple choices.", MessageSquareText],
  ["Barrier detection", "Simulated AI identifies transportation, broadband, medication, or appointment barriers.", BrainCircuit],
  ["Risk explanation", "The output includes a risk level, score, and reason a human can review.", ShieldQuestion],
  ["CHW/nurse routing", "Cases are routed to the right care role based on urgency and barrier type.", Route],
  ["Human follow-up", "Care staff call, reschedule, connect resources, or escalate for clinical review.", UserRoundCheck]
];

export default function AIPipeline() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Workflow"
          title="From patient message to human follow-up"
          description="The AI is used to organize messy access signals, not to make medical decisions."
        />
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map(([title, text, Icon], index) => (
            <Card key={title} className="relative p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-care-cyan">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                Step {index + 1}
              </p>
              <h3 className="mt-1 font-black text-care-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
