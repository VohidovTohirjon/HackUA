import { BrainCircuit, MessageSquare, ShieldCheck, Workflow } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const differences = [
  {
    icon: ShieldCheck,
    title: "Coordination, not diagnosis",
    text: "CareBridge does not give medical advice. It turns patient messages into follow-up tasks for humans."
  },
  {
    icon: MessageSquare,
    title: "Rural-first, not app-first",
    text: "Designed around SMS, voice, weak broadband, long travel distance, and basic phones."
  },
  {
    icon: BrainCircuit,
    title: "Explainable AI, not black box",
    text: "Every risk level shows matched barriers, concerns, and the rule or model reason."
  },
  {
    icon: Workflow,
    title: "Workflow-ready",
    text: "APIs support check-ins, analysis, patients, follow-ups, metrics, and SMS webhook simulation."
  }
];

export default function CareBridgeDifference() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Product Difference"
        title="What makes CareBridge different"
        description="CareBridge AI is a care coordination layer for rural chronic care, not a generic healthcare chatbot."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {differences.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="p-5">
            <Icon className="h-6 w-6 text-care-cyan" />
            <h3 className="mt-4 font-black text-care-navy">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
