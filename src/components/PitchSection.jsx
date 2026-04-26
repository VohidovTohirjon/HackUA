import { Copy } from "lucide-react";
import { useState } from "react";
import { Card, SectionHeader } from "./Card";

const pitch =
  "CareBridge AI helps rural chronic-care teams identify barriers earlier through SMS and voice check-ins. The AI converts patient messages into explainable risk signals, care summaries, and human follow-up routing. It is designed for transportation barriers, weak broadband, limited staff time, and patient trust. It does not diagnose or prescribe. It helps humans reach the right patient sooner.";

export default function PitchSection() {
  const [copied, setCopied] = useState(false);

  async function copyPitch() {
    try {
      await navigator.clipboard.writeText(pitch);
      setCopied(true);
    } catch {
      setCopied(true);
    }
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Devpost Ready" title="30-second pitch" />
        <Card className="p-6 text-center">
          <p className="text-lg font-bold leading-8 text-slate-700">{pitch}</p>
          <button
            onClick={copyPitch}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-care-blue px-4 py-2 text-sm font-black text-white"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy pitch"}
          </button>
        </Card>
      </div>
    </section>
  );
}
