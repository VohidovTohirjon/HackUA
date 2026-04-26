import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  MessageSquareText,
  Mic,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { Card } from "./Card";
import { RiskBadge } from "./Badge";

export default function Hero({ onRunDemo }) {
  return (
    <section id="top" className="health-grid overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-cyan-50 to-emerald-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm font-black text-care-cyan shadow-sm">
            <Sparkles className="h-4 w-4" />
            Built for Best Use of AI for Public Good
          </div>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-care-navy md:text-7xl">
            CareBridge AI
          </h1>
          <p className="mt-5 text-2xl font-bold text-care-blue md:text-3xl">
            Low-bandwidth AI care coordination for rural chronic care
          </p>
          <p className="mt-4 max-w-2xl rounded-xl border border-cyan-200 bg-white/85 p-4 text-base font-black leading-7 text-care-navy shadow-sm">
            Built to compete for Best Use of AI for Public Good by turning low-bandwidth patient check-ins into explainable care-coordination signals for rural chronic-care teams.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A complete rural healthcare access demo: patients check in by SMS or voice, AI detects care barriers and risk, community health workers get follow-up support, and clinicians stay in control.
          </p>
          <div className="mt-4 flex max-w-3xl flex-wrap gap-2">
            {[
              "Transportation",
              "Low broadband",
              "Provider shortage",
              "Digital literacy",
              "Continuity of care",
              "Human trust"
            ].map((badge) => (
              <span key={badge} className="rounded-full bg-white px-3 py-1 text-xs font-black text-care-cyan ring-1 ring-cyan-200">
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
            {[
              "Transportation, broadband, medication, and appointment barriers",
              "Chronic care workflows for diabetes, COPD, asthma, and heart disease",
              "Transparent AI reasons, safety flags, and human review",
              "Dashboard, copilot, provider summary, resources, metrics, and pilot plan"
            ].map((item) => (
              <div key={item} className="flex gap-2 rounded-xl border border-white bg-white/80 p-3 text-sm font-bold text-slate-700 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onRunDemo}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-care-blue px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Run Winning Demo <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black text-care-navy transition hover:border-care-cyan"
            >
              View Dashboard
            </a>
          </div>
          <div className="mt-5 flex max-w-3xl flex-wrap gap-2">
            {[
              "SMS simulator",
              "AI classifier",
              "Risk dashboard",
              "CHW copilot",
              "Provider summary",
              "Resource matcher",
              "Safety guardrails",
              "Pilot metrics"
            ].map((item) => (
              <span key={item} className="rounded-lg bg-slate-900/90 px-3 py-2 text-xs font-black text-white shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <Card className="p-4">
          <div className="rounded-xl bg-care-navy p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-cyan-100">What the demo proves</p>
                <h2 className="mt-1 text-2xl font-black">AI that helps people reach care</h2>
              </div>
              <BrainCircuit className="h-9 w-9 text-emerald-300" />
            </div>
            <div className="mt-5 rounded-xl bg-white/10 p-4">
              <p className="text-sm font-black text-cyan-100">Winning demo scenario</p>
              <p className="mt-2 text-sm leading-6 text-white">
                Maria misses a diabetes visit because she cannot get a ride and reports high blood sugar. CareBridge AI flags transportation plus health concern, explains the risk, suggests CHW outreach, routes nurse review, and creates a provider-ready summary.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ["Maria Lopez", "Transportation + high blood sugar", "High"],
                ["James Carter", "Worse breathing + no broadband", "High"],
                ["Ana Martinez", "Telehealth failed from weak internet", "Medium"]
              ].map(([name, need, risk]) => (
                <div key={name} className="rounded-xl bg-white/10 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black">{name}</p>
                      <p className="text-sm text-cyan-100">{need}</p>
                    </div>
                    <RiskBadge risk={risk} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 p-2 pt-4 sm:grid-cols-3">
            {[
              [MessageSquareText, "SMS-first"],
              [Mic, "Voice-ready"],
              [ShieldCheck, "Clinician-safe"]
            ].map(([Icon, label]) => (
              <div key={label} className="rounded-lg bg-slate-50 p-3 text-center">
                <Icon className="mx-auto h-5 w-5 text-care-cyan" />
                <p className="mt-2 text-xs font-black text-care-navy">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
