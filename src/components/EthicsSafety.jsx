import { AlertTriangle, Eye, LockKeyhole, Scale, ShieldCheck, Stethoscope, UserCheck, XCircle } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const safetyItems = [
  ["Human-in-the-loop", "Care teams review and decide every follow-up.", UserCheck],
  ["No diagnosis", "The AI never names a condition or determines what a symptom means.", XCircle],
  ["No prescribing", "The system does not suggest medications or treatment changes.", Stethoscope],
  ["Transparent risk reasons", "Every risk label includes the rule that produced it.", Eye],
  ["Synthetic data only", "The demo uses realistic but fake patient records.", ShieldCheck],
  ["Bias minimization", "Risk is based on reported needs and barriers, not demographic shortcuts.", Scale],
  ["Consent and privacy", "Real pilots would use consent, minimum data collection, retention limits, and audit logs.", LockKeyhole],
  ["Urgent language escalation", "Severe terms are routed to human review and emergency guidance.", AlertTriangle]
];

export default function EthicsSafety() {
  return (
    <section id="safety" className="bg-care-navy py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Ethics and Safety"
          title="Clinical boundaries are built into the product"
          description="CareBridge AI is a coordination aid. It does not automate medicine."
        />
        <div className="mb-6 rounded-xl border border-cyan-300/30 bg-white/10 p-5 text-center">
          <p className="text-lg font-black leading-8">
            CareBridge AI does not diagnose, prescribe, or replace healthcare professionals. It helps care teams identify access barriers, summarize patient needs, and prioritize human follow-up.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {safetyItems.map(([title, text, Icon]) => (
            <div key={title} className="rounded-xl border border-white/15 bg-white/10 p-5">
              <Icon className="h-5 w-5 text-emerald-300" />
              <h3 className="mt-4 font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-cyan-50">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
