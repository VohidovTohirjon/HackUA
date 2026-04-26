import { CheckCircle2, XCircle } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const does = [
  "Detects reported barriers",
  "Summarizes patient messages",
  "Prioritizes follow-up",
  "Suggests routing",
  "Explains its reasoning"
];

const never = [
  "Diagnoses conditions",
  "Prescribes medication",
  "Changes treatment",
  "Replaces clinicians",
  "Hides why a risk level was assigned"
];

export default function AISafetyComparison() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Safety Scope"
        title="What the AI does / What the AI never does"
        description="This boundary is visible throughout the demo because healthcare AI must be safe, transparent, and accountable."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-black text-care-navy">AI does</h3>
          <div className="mt-4 space-y-3">
            {does.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-slate-700">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-black text-care-navy">AI never does</h3>
          <div className="mt-4 space-y-3">
            {never.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-slate-700">
                <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
