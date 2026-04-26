import { HeartHandshake, Hospital, Languages, Map, Phone, Route, UserRoundCheck, WifiOff } from "lucide-react";
import { Card, IconTile, SectionHeader } from "./Card";

const realities = [
  ["Low bandwidth design", "SMS and voice-first workflows reduce dependence on portals and video visits.", WifiOff],
  ["Basic phone support", "Patients can reply in natural language or simple numbered choices.", Phone],
  ["Long travel distance", "Transportation flags help teams offer ride support or phone visits.", Route],
  ["Provider shortage", "Risk sorting helps limited staff focus on follow-ups most likely to need attention.", Hospital],
  ["Digital literacy", "Plain language, short prompts, and simple choices make check-ins easier.", Languages],
  ["Trust and relationship", "AI supports CHWs and care teams rather than replacing human connection.", HeartHandshake],
  ["Patient-centered care", "The system captures what the patient says matters: barriers, preferences, and context.", UserRoundCheck],
  ["Care coordination fit", "Designed to complement Medicaid/AHCCCS-style care management workflows.", Map]
];

export default function RuralReality() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Rural Reality"
        title="Designed around the constraints rural care teams actually face"
        description="CareBridge AI is intentionally practical: low-bandwidth, relationship-centered, and built for chronic care continuity rather than one-time triage."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {realities.map(([title, text, Icon]) => (
          <Card key={title} className="p-5">
            <IconTile icon={Icon} />
            <h3 className="mt-4 font-black text-care-navy">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
