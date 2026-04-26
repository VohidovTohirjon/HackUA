import { MapPin } from "lucide-react";
import { RiskBadge } from "./Badge";

export default function PatientCard({ patient, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(patient)}
      className={`rounded-xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
        selected ? "border-care-blue bg-blue-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-black text-care-navy">{patient.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{patient.condition}</p>
        </div>
        <RiskBadge risk={patient.risk} />
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-500">
        <MapPin className="h-3.5 w-3.5" />
        {patient.location}
      </div>
      <p className="mt-4 text-sm font-bold text-slate-700">{patient.mainBarrier}</p>
      <p className="mt-2 min-h-20 text-sm leading-6 text-slate-600">{patient.aiSummary}</p>
      <p className="mt-3 text-sm font-black text-care-blue">View Copilot</p>
    </button>
  );
}
