import { BrainCircuit, ClipboardCheck, Route, ShieldCheck, Workflow } from "lucide-react";
import { Card, IconTile, SectionHeader } from "./Card";

const cards = [
  {
    icon: BrainCircuit,
    title: "Meaningful AI",
    text: "A rule-based AI simulation classifies messy SMS or voice check-ins into barriers, health concerns, risk score, confidence, transparency notes, staff summary, and safe next action.",
    evidence: "See: SMS simulator + AI analysis panel"
  },
  {
    icon: Route,
    title: "Improves access",
    text: "Designed for rural Arizona realities: long travel distance, low broadband, clinic availability, low digital literacy, and patients who may only have a basic phone.",
    evidence: "See: rural reality + resource matcher"
  },
  {
    icon: Workflow,
    title: "Better decision-making",
    text: "Transforms check-ins into a risk-sorted queue, selected patient profile, CHW call script, follow-up checklist, and provider-ready note.",
    evidence: "See: dashboard + CHW copilot"
  },
  {
    icon: ShieldCheck,
    title: "Ethical AI",
    text: "Explicitly avoids diagnosis, prescribing, and treatment changes. Every output is framed as care coordination support for human review.",
    evidence: "See: ethics, safety flags, pilot plan"
  }
];

export default function PrizeAlignment() {
  return (
    <section id="prize" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="mb-10 overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-care-navy p-6 text-white md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Judge Brief</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              This is not just a landing page. It is a complete care coordination workflow.
            </h2>
            <p className="mt-4 text-sm leading-7 text-cyan-50">
              The demo follows one realistic rural chronic-care problem from patient message to AI analysis, care team prioritization, CHW outreach, provider summary, resource support, safety guardrails, and pilot metrics.
            </p>
          </div>
          <div className="grid gap-3 bg-white p-6 md:grid-cols-2 md:p-8">
            {[
              ["Problem", "Rural patients miss care because of rides, broadband, medication confusion, clinic access, and provider shortages."],
              ["AI use", "AI converts unstructured check-ins into structured care coordination signals with reasons and safety flags."],
              ["Human workflow", "CHWs, nurses, and coordinators get prioritized worklists, scripts, summaries, and resources."],
              ["Public good", "The product aims to help low-bandwidth communities stay connected to chronic care without replacing clinicians."]
            ].map(([label, text]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-care-cyan">
                  <ClipboardCheck className="h-4 w-4" />
                  <p className="text-xs font-black uppercase tracking-[0.12em]">{label}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <SectionHeader
        eyebrow="Prize Alignment"
        title="Why this is built to compete for Best Use of AI for Public Good"
        description="Each part of the prototype maps to the prize: meaningful AI, rural access, safer human decision-making, measurable pilot impact, and ethical oversight."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="p-5">
            <IconTile icon={card.icon} />
            <h3 className="mt-4 text-lg font-black text-care-navy">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
            <div className="mt-4 rounded-lg bg-cyan-50 px-3 py-2 text-xs font-black text-care-cyan">
              {card.evidence}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
