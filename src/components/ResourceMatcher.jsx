import { HandHeart } from "lucide-react";
import { demoResources } from "../data/resources";
import { Card } from "./Card";

export default function ResourceMatcher({ barriers }) {
  const normalized = barriers.length ? barriers : ["Default"];
  const resources = normalized.flatMap((barrier) => demoResources[barrier] || demoResources.Default);
  const uniqueResources = [...new Set(resources)];

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <HandHeart className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-black text-care-navy">Demo resource matcher</p>
          <p className="text-xs text-slate-500">Fake resources for prototype judging only</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {uniqueResources.map((resource) => (
          <div key={resource} className="rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700">
            {resource}
          </div>
        ))}
      </div>
    </Card>
  );
}
