import {
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Database,
  Inbox,
  MessageSquareText,
  RotateCcw,
  Save,
  Server,
  XCircle
} from "lucide-react";
import { Card, SectionHeader } from "./Card";

const pipeline = [
  "Patient SMS/Voice Check-In",
  "CareBridge API",
  "AI Analysis / Rule-Based Safe Fallback",
  "Risk Dashboard",
  "CHW / Nurse Follow-Up",
  "Provider Summary"
];

const apiCards = [
  ["Check-in API", "Receives patientId, channel, and message; stores a synthetic check-in.", Inbox],
  ["AI analysis API", "Uses optional OpenAI-compatible AI or safe rule-based fallback.", BrainCircuit],
  ["SMS webhook simulation", "Accepts Twilio-style inbound SMS payloads without real credentials.", MessageSquareText],
  ["Follow-up outcome API", "Saves mock CHW outcomes and next follow-up dates.", Save],
  ["Metrics API", "Returns proposed pilot metrics for evaluation planning.", BarChart3],
  ["Safe fallback mode", "Runs deterministic simulated AI when no AI key is configured.", RotateCcw]
];

export default function ApiArchitecture({ apiOnline, analysisSource }) {
  const displaySource = analysisSource === "llm" ? "API AI" : "Fallback";

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="API-backed MVP"
          title="API-backed care coordination layer"
          description="CareBridge AI now has a lightweight backend that receives check-ins, analyzes messages, stores demo records, simulates SMS intake, and feeds the care team workflow."
        />

        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_0.38fr]">
          <Card className="p-5">
            <div className="grid gap-3 md:grid-cols-6">
              {pipeline.map((step, index) => (
                <div key={step} className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-care-cyan">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-black text-care-navy">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <TechLabel icon={Server} label="Backend" value="Node/Express" />
              <TechLabel
                icon={Inbox}
                label="Endpoints"
                value="check-ins, analyze, patients, follow-ups, metrics, SMS webhook"
              />
              <TechLabel icon={BrainCircuit} label="AI mode" value="Optional LLM API or deterministic fallback" />
              <TechLabel icon={Database} label="Data" value="Synthetic demo records only" />
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-care-cyan">Live Demo Status</p>
            <div className="mt-4 space-y-3">
              <StatusRow ok={apiOnline} label="Backend connected" value={apiOnline ? "yes" : "no"} />
              <StatusRow ok label="Analysis source" value={displaySource} />
              <StatusRow ok label="SMS webhook" value="simulated" />
            </div>
            <p className="mt-4 text-xs font-bold leading-5 text-slate-500">
              If the backend is offline or no AI key is configured, the frontend and API both use safe deterministic fallback logic.
            </p>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {apiCards.map(([title, text, Icon]) => (
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

function TechLabel({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <Icon className="h-4 w-4 text-care-cyan" />
      <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold leading-5 text-slate-700">{value}</p>
    </div>
  );
}

function StatusRow({ ok, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2">
        {ok ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        ) : (
          <XCircle className="h-4 w-4 text-amber-600" />
        )}
        <p className="text-sm font-black text-care-navy">{label}</p>
      </div>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">
        {value}
      </span>
    </div>
  );
}
