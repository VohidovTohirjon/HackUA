import { ClipboardCheck, PhoneCall, Send, ShieldAlert, Siren } from "lucide-react";
import { useState } from "react";
import { createEscalation, saveFollowup } from "../api/client";
import { firstName } from "../utils/formatters";
import { Card, SectionHeader } from "./Card";
import ResourceMatcher from "./ResourceMatcher";

export default function CHWCopilot({ patient, demoActive }) {
  const [saveStatus, setSaveStatus] = useState("Not saved");
  const [escalation, setEscalation] = useState(null);
  const [isEscalating, setIsEscalating] = useState(false);
  const callGoal =
    patient.id === "p001"
      ? "Confirm medication access, understand transportation need, and offer rescheduling support."
      : "Clarify the access barrier, confirm current safety, and connect the patient to the right human support.";

  const script =
    patient.id === "p001"
      ? "Hi Maria, I saw that transportation made it hard to attend your appointment. Would you like help finding a ride or switching to a phone visit?"
      : `Hi ${firstName(patient.name)}, I’m calling from your care team to understand what made care harder this week and see what support would help.`;

  const checklist = [
    "Confirm current safety",
    "Ask if patient has medication and needed supplies",
    "Clarify transportation, broadband, or appointment barrier",
    "Offer low-bandwidth follow-up option",
    "Route clinical concern to nurse when needed",
    "Record follow-up outcome"
  ];

  async function escalateToNurse() {
    setIsEscalating(true);
    const payload = {
      patientId: patient.id,
      priority: patient.risk === "High" ? "High" : "Medium",
      reason: patient.reportedConcern || patient.mainBarrier,
      summary: `${patient.name} is managing ${patient.condition}. Reported barrier: ${patient.mainBarrier}. Suggested review: ${patient.suggestedAction}`
    };

    try {
      const result = await createEscalation(payload);
      setEscalation(result.escalation);
    } catch {
      setEscalation({
        id: `local-${Date.now()}`,
        ...payload,
        status: "local nurse handoff draft",
        createdAt: new Date().toISOString()
      });
    } finally {
      setIsEscalating(false);
    }
  }

  return (
    <section id="chw-copilot" className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${demoActive ? "demo-highlight" : ""}`}>
      <SectionHeader
        eyebrow="Community Health Worker Copilot"
        title="AI support that makes human outreach faster and more prepared"
        description="The copilot gives a call goal, plain-language script, checklist, and resource suggestions without diagnosing or changing care."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-care-cyan">Selected patient</p>
              <h3 className="mt-2 text-2xl font-black text-care-navy">{patient.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{patient.condition} • {patient.location}</p>
            </div>
            <button
              onClick={escalateToNurse}
              disabled={isEscalating}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <Siren className="h-4 w-4" />
              {isEscalating ? "Sending..." : escalation ? "Nurse escalation sent" : "Escalate to nurse"}
            </button>
          </div>

          {escalation && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
                  <div>
                    <p className="text-sm font-black text-red-800">Nurse handoff created</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{escalation.summary}</p>
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-red-700 ring-1 ring-red-200">
                  {escalation.priority} priority
                </span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <EscalationField label="Status" value={escalation.status} />
                <EscalationField label="Reason" value={escalation.reason} />
                <EscalationField label="Reference" value={escalation.id} />
              </div>
            </div>
          )}

          <div className="mt-5 rounded-xl bg-cyan-50 p-4">
            <p className="text-sm font-black text-care-cyan">Suggested call goal</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{callGoal}</p>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-care-blue" />
              <p className="text-sm font-black text-care-navy">Suggested call script</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">“{script}”</p>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-sm font-black text-care-navy">Follow-up checklist</p>
            <div className="grid gap-2 md:grid-cols-2">
              {checklist.map((item) => (
                <label key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-care-blue" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-black text-care-navy">Document outcome</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <option>Reached patient</option>
                <option>Left voicemail</option>
                <option>Sent SMS follow-up</option>
                <option>Unable to reach</option>
              </select>
              <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Next follow-up date" />
            </div>
            <textarea className="mt-3 min-h-24 w-full rounded-lg border border-slate-200 p-3 text-sm" placeholder="Outcome notes for care team..." />
            <button
              onClick={async () => {
                try {
                  await saveFollowup({
                    patientId: patient.id,
                    outcome: "Reached patient",
                    notes: "Patient wants phone visit and transportation help.",
                    nextFollowUpDate: "2026-04-27"
                  });
                  setSaveStatus("Saved through API");
                } catch {
                  setSaveStatus("Care coordination service offline. Outcome remains a local draft.");
                }
              }}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-care-blue px-4 py-2 text-sm font-black text-white"
            >
              <Send className="h-4 w-4" />
              Save mock outcome
            </button>
            <p className="mt-2 text-xs font-bold text-slate-500">{saveStatus}</p>
          </div>
        </Card>

        <div className="space-y-6">
          <ResourceMatcher barriers={patient.barriers} />
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-emerald-600" />
              <p className="font-black text-care-navy">Why this supports CHWs</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The copilot reduces preparation time, keeps the conversation patient-centered, and makes social barriers visible before they become missed-care patterns.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function EscalationField({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-3 ring-1 ring-red-100">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold leading-5 text-slate-700">{value}</p>
    </div>
  );
}
