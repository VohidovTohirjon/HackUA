import { Eye, Handshake, LockKeyhole, Scale } from "lucide-react";
import { Card, SectionHeader } from "./Card";

const items = [
  ["Trust by design", "Patients are told that a human care team may follow up, not that AI is making medical decisions.", Handshake],
  ["Transparency", "Risk levels include visible reasons and matched barriers so staff can challenge the output.", Eye],
  ["Equity lens", "The system focuses on reported needs and barriers, not demographics or assumptions about risk.", Scale],
  ["Privacy-first", "A real deployment would collect only needed check-in data, with consent, retention limits, and audit logs.", LockKeyhole]
];

export default function EquityTrustSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Equity and Trust"
          title="Public-good AI has to be understandable and accountable"
          description="The product is designed for communities that may have limited broadband, limited time, and valid reasons to distrust opaque systems."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, text, Icon]) => (
            <Card key={title} className="p-5">
              <Icon className="h-6 w-6 text-care-cyan" />
              <h3 className="mt-4 font-black text-care-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
