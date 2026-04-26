import { Copy, ShieldAlert, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Card } from "./Card";

export default function ProviderSummary({ patient }) {
  const [copied, setCopied] = useState(false);
  const summary =
    patient.id === "maria-lopez"
      ? "Maria missed her last diabetes follow-up because of transportation. She reports high blood sugar this week. She prefers phone communication and wants help arranging care. Nurse review is recommended."
      : `${patient.name} is managing ${patient.condition.toLowerCase()}. Reported barrier: ${patient.mainBarrier}. Suggested human review: ${patient.suggestedAction}`;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-care-blue">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-care-blue">Provider Summary</p>
            <h3 className="text-xl font-black text-care-navy">Concise prep note</h3>
          </div>
        </div>
        <button
          onClick={() => setCopied(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-care-navy hover:border-care-cyan"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <SummaryField label="Reason for follow-up" value={patient.aiSummary} />
        <SummaryField label="Patient-reported barrier" value={patient.mainBarrier} />
        <SummaryField label="Reported concern" value={patient.reportedConcern} />
        <SummaryField label="Suggested human review" value={patient.suggestedAction} />
      </div>

      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm leading-6 text-slate-700">{summary}</p>
      </div>

      <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
        <div>
          <p className="text-sm font-black text-amber-800">What not to do</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            AI has not diagnosed, prescribed, or changed treatment. This note supports human review and care coordination only.
          </p>
        </div>
      </div>
    </Card>
  );
}

function SummaryField({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}
