import { CalendarClock, Languages, MapPin, Phone, TrendingUp } from "lucide-react";
import { Badge, RiskBadge } from "./Badge";
import { Card } from "./Card";

export default function PatientDetail({ patient }) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-care-cyan">Patient Detail</p>
          <h3 className="mt-2 text-2xl font-black text-care-navy">{patient.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{patient.age} years old • {patient.condition}</p>
        </div>
        <RiskBadge risk={patient.risk} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Detail icon={MapPin} label="Rural context" value={patient.ruralContext} />
        <Detail icon={Phone} label="Preferred contact" value={patient.preferredContact} />
        <Detail icon={Languages} label="Language" value={patient.language} />
        <Detail icon={CalendarClock} label="Last check-in" value={patient.lastCheckIn} />
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-black text-care-navy">AI summary</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{patient.aiSummary}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {patient.barriers.length ? patient.barriers.map((barrier) => <Badge key={barrier} tone="blue">{barrier}</Badge>) : <Badge tone="green">No barrier reported</Badge>}
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-black text-care-navy">
          <TrendingUp className="h-4 w-4 text-care-cyan" />
          Risk history
        </div>
        <div className="flex gap-2">
          {patient.riskHistory.map((risk, index) => (
            <RiskBadge key={`${risk}-${index}`} risk={risk} />
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-black text-care-blue">Suggested next step</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{patient.suggestedAction}</p>
      </div>
    </Card>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <Icon className="h-4 w-4 text-care-cyan" />
      <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}
