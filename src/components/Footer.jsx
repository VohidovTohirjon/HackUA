import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-2 font-black text-care-navy">
          <HeartPulse className="h-5 w-5 text-care-cyan" />
          CareBridge AI
        </div>
        <p>Hackathon prototype using synthetic data. Designed for care coordination support only.</p>
      </div>
    </footer>
  );
}
