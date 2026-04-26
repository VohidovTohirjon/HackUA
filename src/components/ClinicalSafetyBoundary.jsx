import { AlertTriangle, ShieldCheck } from "lucide-react";

const boundaries = [
  "AI does not diagnose",
  "AI does not prescribe",
  "AI does not change treatment",
  "AI routes to humans",
  "Emergency language receives urgent guidance"
];

export default function ClinicalSafetyBoundary() {
  return (
    <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-red-600" />
        <p className="text-sm font-black text-red-700">Clinical safety boundary</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {boundaries.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-black text-slate-700 ring-1 ring-red-100">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-500" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
