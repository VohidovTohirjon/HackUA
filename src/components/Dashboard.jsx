import { Activity, Car, Pill, Users, WifiOff } from "lucide-react";
import { riskRank } from "../utils/riskScoring";
import { Card, IconTile, SectionHeader } from "./Card";
import PatientCard from "./PatientCard";

const filters = ["All", "High Risk", "Medium Risk", "Low Risk", "Transportation", "Medication", "Broadband"];

function matchesFilter(patient, filter) {
  if (filter === "All") return true;
  if (filter.endsWith("Risk")) return patient.risk === filter.replace(" Risk", "");
  return patient.barriers.includes(filter);
}

export default function Dashboard({ patients, selectedPatient, setSelectedPatient, filter, setFilter, demoActive }) {
  const sorted = [...patients]
    .filter((patient) => matchesFilter(patient, filter))
    .sort((a, b) => riskRank[a.risk] - riskRank[b.risk]);

  const counts = {
    total: patients.length,
    high: patients.filter((p) => p.risk === "High").length,
    transport: patients.filter((p) => p.barriers.includes("Transportation")).length,
    broadband: patients.filter((p) => p.barriers.includes("Broadband")).length,
    medication: patients.filter((p) => p.barriers.includes("Medication")).length
  };

  const summary = [
    [Users, "Total patients", counts.total],
    [Activity, "High-risk follow-ups", counts.high],
    [Car, "Transportation barriers", counts.transport],
    [WifiOff, "Broadband issues", counts.broadband],
    [Pill, "Medication issues", counts.medication]
  ];

  return (
    <section id="dashboard" className={`border-y border-slate-200 bg-white py-16 ${demoActive ? "demo-highlight" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Care Team Dashboard"
          title="A realistic queue for care coordinators and community health workers"
          description="Synthetic patient cards are sorted by risk and filterable by access barrier so staff can focus outreach where it matters most."
        />

        <div className="grid gap-3 md:grid-cols-5">
          {summary.map(([Icon, label, value]) => (
            <Card key={label} className="p-4">
              <IconTile icon={Icon} />
              <p className="mt-3 text-2xl font-black text-care-navy">{value}</p>
              <p className="text-sm font-bold text-slate-500">{label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-black ring-1 transition ${
                filter === item
                  ? "bg-care-blue text-white ring-care-blue"
                  : "bg-white text-slate-600 ring-slate-200 hover:ring-care-cyan"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          {sorted.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              selected={selectedPatient.id === patient.id}
              onSelect={setSelectedPatient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
