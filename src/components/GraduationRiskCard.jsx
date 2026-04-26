import { AlertCircle, CheckCircle2, ClipboardList, Flag, MoveRight, RefreshCw, Route, Send, ShieldCheck } from 'lucide-react';
import { riskAnalysis } from '../data/mockData';
import RiskBadge from './RiskBadge';

export default function GraduationRiskCard({ showAnalysis, onCheckRisk, onSendAdvisor, sendSuccess, onRegenerate, advisorAlert }) {
  return (
    <section className="rounded-lg border-2 border-ua-red bg-white p-5 shadow-soft ring-4 ring-red-50 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-ua-red">Rescue Plan</p>
          <h2 className="mt-1 text-3xl font-black text-ua-navy">Graduation Risk Rescue Plan</h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            One click turns hidden requirements into a route Sofia can follow before registration closes.
          </p>
          <p className="mt-3 inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-ua-red ring-1 ring-red-100">
            Presenter cue: click “Check My Graduation Risk”
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 px-5 py-4 ring-1 ring-amber-200 lg:min-w-72">
          <p className="text-xs font-bold uppercase text-slate-500">Risk Level</p>
          <div className="mt-2 flex items-center gap-2">
            {showAnalysis ? <RiskBadge level={riskAnalysis.level} /> : null}
            <span className="text-sm font-black text-slate-700">{showAnalysis ? 'Medium' : 'Risk not checked yet'}</span>
          </div>
          <div className="mt-4 h-2 w-56 max-w-full overflow-hidden rounded-full bg-white">
            <div className={`h-full rounded-full ${showAnalysis ? 'w-[62%] bg-amber-500' : 'w-[22%] bg-emerald-500'}`} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:max-w-4xl">
        <button
          type="button"
          onClick={onCheckRisk}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ua-red px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-red-800 active:scale-[0.99]"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Check My Graduation Risk
        </button>
        <button
          type="button"
          onClick={onSendAdvisor}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ua-navy px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-slate-900 active:scale-[0.99]"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send to Advisor
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-ua-navy active:scale-[0.99]"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Regenerate Plan
        </button>
      </div>
      {showAnalysis ? (
        <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200">
          Demo moment: hidden rules become a concrete route, then the advisor gets the same summary.
        </p>
      ) : null}

      {sendSuccess ? (
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-black">Advisor alert created for Dr. Elena Reyes.</p>
              <p className="mt-1 font-semibold text-emerald-700">Sofia&apos;s credit gap and CSC 245 prerequisite timing are now visible in Advisor View.</p>
            </div>
          </div>
          {advisorAlert ? <AdvisorSummaryCard alert={advisorAlert} /> : null}
        </div>
      ) : null}

      {showAnalysis ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-amber-50 p-5 ring-1 ring-amber-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-700" aria-hidden="true" />
              <h3 className="font-black text-amber-900">Hidden Risks Found</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {riskAnalysis.reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-sm text-amber-950">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-ua-navy p-5 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-red-200">Potential delay avoided</p>
                <h3 className="mt-1 text-xl font-black">Rescue Route</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-black text-white ring-1 ring-white/20">
                <Flag className="h-4 w-4" aria-hidden="true" />
                {riskAnalysis.timeSaved}
              </div>
            </div>
            <ol className="mt-5 space-y-3">
              {riskAnalysis.nextActions.map((action, index) => (
                <li key={action} className="relative flex gap-3 rounded-lg bg-white p-4 text-slate-800 shadow-sm">
                  {index < riskAnalysis.nextActions.length - 1 ? <span className="absolute left-8 top-12 h-6 w-0.5 bg-red-100" /> : null}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ua-red text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-slate-950">{action}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {index === 0
                        ? 'Protects the CSC 245 → CSC 335 sequence.'
                        : index === 1
                          ? 'Closes the upper-division credit gap.'
                          : index === 2
                            ? 'Verifies the non-major rule is complete.'
                            : 'Turns the risk into advisor action.'}
                    </p>
                  </div>
                  <MoveRight className="mt-1 h-5 w-5 shrink-0 text-ua-red" aria-hidden="true" />
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-blue-50 ring-1 ring-white/15">
              <Route className="h-4 w-4 shrink-0 text-red-200" aria-hidden="true" />
              Take the route now to avoid a likely one-semester delay.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AdvisorSummaryCard({ alert }) {
  return (
    <div className="rounded-lg border border-ua-navy/15 bg-slate-50 p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-ua-navy p-2.5 text-white">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-ua-red">Generated Advisor Summary</p>
            <h3 className="mt-1 text-xl font-black text-ua-navy">{alert.studentName}</h3>
          </div>
        </div>
        <RiskBadge level={alert.riskLevel} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.92fr]">
        <div className="rounded-lg bg-white p-4 ring-1 ring-slate-200">
          <p className="text-sm font-black text-ua-navy">Top risk reasons</p>
          <ul className="mt-3 space-y-2">
            {alert.topRiskReasons.map((reason) => (
              <li key={reason} className="flex gap-2 text-sm font-semibold text-slate-700">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ua-red" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <SummaryField label="Recommended advisor action" value={alert.recommendedAdvisorAction} />
          <SummaryField label="Suggested meeting topic" value={alert.suggestedMeetingTopic} />
        </div>
      </div>
    </div>
  );
}

function SummaryField({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-4 ring-1 ring-slate-200">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{value}</p>
    </div>
  );
}
