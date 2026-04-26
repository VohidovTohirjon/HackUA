import { ClipboardList, DatabaseZap, MessageCircle, UserPlus } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const steps = [
  ["Intake/opt-in", "Patient consents to SMS or voice check-ins.", UserPlus],
  ["Weekly check-ins", "Responses are classified into access barriers.", MessageCircle],
  ["Care coordinator queue", "High-risk cases are reviewed first.", ClipboardList],
  ["Outcome labels", "Staff records what happened, improving future evaluation.", DatabaseZap]
];

export default function IntegrationRealism() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Integration Realism"
          title="How this could fit existing care workflows"
          description="The pilot path is intentionally narrow: opt-in check-ins, care coordinator review, and measured outcomes."
        />
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map(([title, text, Icon]) => (
            <Card key={title} className="p-5">
              <Icon className="h-6 w-6 text-care-cyan" />
              <h3 className="mt-4 font-black text-care-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
