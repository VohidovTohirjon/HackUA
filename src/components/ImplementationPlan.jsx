import { Database, LockKeyhole, Rocket, TestTube2 } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const phases = [
  {
    phase: "Phase 1",
    title: "Hackathon demo",
    items: ["SMS-style check-in", "Rule-based AI simulation", "Risk dashboard", "CHW copilot", "Provider summary"]
  },
  {
    phase: "Phase 2",
    title: "Small diabetes pilot",
    items: ["One clinic workflow", "Weekly SMS check-ins", "Care coordinator review", "Track missed appointments and follow-up time"]
  },
  {
    phase: "Phase 3",
    title: "Add voice + Spanish",
    items: ["Voice transcription", "Bilingual scripts", "Plain-language patient replies", "Local resource matching"]
  },
  {
    phase: "Phase 4",
    title: "Workflow integration",
    items: ["Care management system handoff", "Audit logs", "Role-based access", "Human-reviewed model evaluation"]
  }
];

export default function ImplementationPlan() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Implementation Plan"
        title="A practical path from demo to rural care pilot"
        description="The next step is not broad deployment. It is a narrow, measured pilot with consent, privacy controls, and human review."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase) => (
          <Card key={phase.phase} className="p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-care-cyan">{phase.phase}</p>
            <h3 className="mt-2 text-xl font-black text-care-navy">{phase.title}</h3>
            <ul className="mt-5 space-y-3">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Card className="p-5">
          <Database className="h-5 w-5 text-care-cyan" />
          <h3 className="mt-4 font-black text-care-navy">Data needed</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Patient opt-in, check-in text or transcript, contact preference, condition program, and care-team outcome labels.</p>
        </Card>
        <Card className="p-5">
          <LockKeyhole className="h-5 w-5 text-care-cyan" />
          <h3 className="mt-4 font-black text-care-navy">Privacy handling</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Collect minimum information, store only needed fields, limit retention, and keep human audit trails.</p>
        </Card>
        <Card className="p-5">
          <TestTube2 className="h-5 w-5 text-care-cyan" />
          <h3 className="mt-4 font-black text-care-navy">Pilot evaluation</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Compare AI labels to human review, measure response time, and collect patient and staff feedback.</p>
        </Card>
      </div>
    </section>
  );
}
