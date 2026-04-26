import { MessageSquareText, Phone, Sparkles } from "lucide-react";
import { demoScenarios } from "../data/demoScenarios";
import AIAnalysisPanel from "./AIAnalysisPanel";
import { Card, SectionHeader } from "./Card";

export default function PatientCheckInSimulator({
  message,
  setMessage,
  analysis,
  onAnalyze,
  onSelectScenario,
  activeScenario,
  demoActive
}) {
  return (
    <section id="checkin" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Patient Check-In Simulator"
        title="Patients can reply naturally or use simple number choices"
        description="The demo simulates an AI classifier that identifies access barriers, risk, and safe human follow-up steps from low-bandwidth check-ins."
      />

      <div className="mb-6 grid gap-3 md:grid-cols-5">
        {demoScenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelectScenario(scenario)}
            className={`rounded-xl border p-3 text-left text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-care-cyan hover:shadow-soft ${
              activeScenario?.id === scenario.id
                ? "border-care-blue bg-blue-50 text-care-blue"
                : "border-slate-200 bg-white text-care-navy"
            }`}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      {demoActive && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-black text-care-blue shadow-sm">
          Demo scenario selected: diabetes + transportation barrier + chronic-care concern
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="mx-auto w-full max-w-sm rounded-[2rem] border-8 border-slate-900 bg-slate-900 p-3 shadow-soft">
          <div className="rounded-[1.45rem] bg-white p-4">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-care-cyan">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black text-care-navy">CareBridge</p>
                  <p className="text-xs text-slate-500">SMS check-in</p>
                </div>
              </div>
              <MessageSquareText className="h-5 w-5 text-slate-400" />
            </div>

            <div className="space-y-3">
              <div className="rounded-xl rounded-tl-sm bg-slate-100 p-3 text-sm leading-6 text-slate-700">
                Hi Maria, this is your weekly care check-in. How are you doing today? You can reply normally or choose: 1 = okay, 2 = medication help, 3 = appointment help, 4 = transportation help, 5 = symptoms worse.
              </div>
              <form onSubmit={onAnalyze} className="space-y-3">
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="min-h-36 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 outline-none ring-care-cyan transition focus:ring-2"
                  aria-label="Patient response"
                />
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-care-blue px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700">
                  Analyze check-in <Sparkles className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <AIAnalysisPanel analysis={analysis} highlight={demoActive} />
      </div>

      <Card className="mt-6 p-5">
        <p className="text-sm font-black text-care-navy">Staff summary generated from current check-in</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{analysis.staffSummary}</p>
      </Card>
    </section>
  );
}
