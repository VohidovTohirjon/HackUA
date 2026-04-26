import { BarChart3 } from "lucide-react";
import { evaluationMetrics } from "../data/evaluationMetrics";
import { Card, SectionHeader } from "./Card";

export default function MetricsPanel() {
  return (
    <section id="metrics" className="border-y border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pilot Metrics"
          title="How we would evaluate public-good impact"
          description="These are proposed pilot metrics, not proven results. They make the project testable with a small rural chronic-care workflow."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {evaluationMetrics.map((metric) => (
            <Card key={metric.label} className="p-5">
              <BarChart3 className="h-5 w-5 text-care-cyan" />
              <p className="mt-4 text-3xl font-black text-care-navy">{metric.value}</p>
              <h3 className="mt-2 font-black text-care-navy">{metric.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{metric.note}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
