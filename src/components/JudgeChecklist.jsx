import { CheckCircle2 } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const checklist = [
  ["Rural access", "SMS and voice-first check-ins reduce dependence on broadband and patient portals."],
  ["Chronic care continuity", "Weekly check-ins catch missed appointments, medication gaps, and worsening symptoms earlier."],
  ["Meaningful AI", "AI converts unstructured patient messages into barriers, risk level, summary, and next-step routing."],
  ["Real-world constraints", "Designed for transportation issues, provider shortages, digital literacy limits, and Medicaid-style care coordination."],
  ["Patient-centered", "Captures patient preferences, contact method, language, and reported barriers."],
  ["Safe and ethical", "No diagnosis, no prescribing, human review, transparent reasons, synthetic data."]
];

export default function JudgeChecklist() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Track Fit"
        title="Judge Checklist: How CareBridge AI meets the track"
        description="A quick map from the Rural Healthcare Access challenge to what the prototype actually demonstrates."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {checklist.map(([title, text]) => (
          <Card key={title} className="p-5">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <h3 className="font-black text-care-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
