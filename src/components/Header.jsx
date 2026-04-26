import { HeartPulse } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 text-lg font-black text-care-navy">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-care-navy text-cyan-200">
            <HeartPulse className="h-5 w-5" />
          </span>
          CareBridge AI
        </a>
        <nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 lg:flex">
          <a className="hover:text-care-blue" href="#prize">Prize Fit</a>
          <a className="hover:text-care-blue" href="#checkin">Simulator</a>
          <a className="hover:text-care-blue" href="#dashboard">Dashboard</a>
          <a className="hover:text-care-blue" href="#metrics">Metrics</a>
          <a className="hover:text-care-blue" href="#safety">Safety</a>
        </nav>
        <a
          href="#checkin"
          className="rounded-lg bg-care-blue px-4 py-2 text-sm font-black text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
        >
          Demo
        </a>
      </div>
    </header>
  );
}
