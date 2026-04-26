import { AlertTriangle, BrainCircuit, Gauge, ShieldCheck, UserCheck } from "lucide-react";
import { Badge, RiskBadge } from "./Badge";
import { Card } from "./Card";
import ClinicalSafetyBoundary from "./ClinicalSafetyBoundary";

function InfoBlock({ title, children, highlight = false }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-slate-50 p-4 ${highlight ? "demo-pulse" : ""}`}>
      <p className="text-sm font-black text-care-navy">{title}</p>
      <div className="mt-2 text-sm leading-6 text-slate-600">{children}</div>
    </div>
  );
}

export default function AIAnalysisPanel({ analysis, highlight = false }) {
  return (
    <Card className={`p-6 ${highlight ? "demo-highlight" : ""}`} id="analysis">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-care-cyan">AI Analysis Panel</p>
          <h3 className="mt-2 text-2xl font-black text-care-navy">Care coordination output</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={analysis.source === "llm" ? "green" : "amber"}>
            Review mode: {analysis.source === "llm" ? "AI-assisted" : analysis.source === "draft preview" ? "draft preview" : "safe rules"}
          </Badge>
          <RiskBadge risk={analysis.riskLevel} />
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-blue-50 p-4">
          <Gauge className="h-5 w-5 text-care-blue" />
          <p className="mt-2 text-sm font-black text-care-blue">Risk score</p>
          <p className="text-3xl font-black text-care-navy">{analysis.score}</p>
        </div>
        <div className="rounded-xl bg-cyan-50 p-4">
          <p className="text-sm font-black text-care-cyan">Confidence</p>
          <p className="mt-2 text-lg font-black text-care-navy">{analysis.confidence}</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <p className="mt-2 text-sm font-black text-emerald-700">Mode</p>
          <p className="text-sm font-bold text-care-navy">Human-in-the-loop</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <InfoBlock title="Detected barriers">
          <div className="flex flex-wrap gap-2">
            {analysis.barriers.map((item) => <Badge key={item} tone="blue">{item}</Badge>)}
          </div>
        </InfoBlock>
        <InfoBlock title="Reported health concerns">
          <div className="flex flex-wrap gap-2">
            {analysis.healthConcerns.map((item) => <Badge key={item} tone={item === "None detected" ? "green" : "amber"}>{item}</Badge>)}
          </div>
        </InfoBlock>
        <InfoBlock title="Why it was flagged" highlight={highlight}>{analysis.reason}</InfoBlock>
        <InfoBlock title="Recommended human role">{analysis.recommendedRole}</InfoBlock>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-care-cyan" />
            <p className="text-sm font-black text-care-cyan">Why AI is needed here</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Care teams may receive many short, messy patient messages. AI helps organize them into structured signals so humans can respond faster.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-black text-emerald-700">Human decision point</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            AI suggests routing; clinicians and care staff decide what happens next.
          </p>
        </div>
      </div>

      <div className={`mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 ${highlight ? "demo-pulse" : ""}`}>
        <p className="text-sm font-black text-care-blue">Suggested next action</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{analysis.suggestedAction}</p>
      </div>
      <ClinicalSafetyBoundary />
      <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
        <p className="text-sm font-black text-emerald-700">Patient-friendly reply</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{analysis.patientReply}</p>
      </div>
      <div className={`mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 ${highlight ? "demo-pulse" : ""}`}>
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-black text-amber-800">Transparency notes</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-700">
              {analysis.transparencyNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
