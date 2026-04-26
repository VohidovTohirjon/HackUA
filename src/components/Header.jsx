import { AlertTriangle, GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ua-red text-white shadow-sm">
            <GraduationCap className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-wide text-ua-red">Bear Down, Build Up</p>
            <h1 className="text-2xl font-black text-ua-navy">BearPath</h1>
            <p className="text-sm text-slate-600">Graduation Risk Detection Before It Becomes Graduation Delay</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-ua-navy ring-1 ring-slate-200">
          <AlertTriangle className="h-5 w-5 text-ua-red" aria-hidden="true" />
          From hidden risk to visible action
        </div>
      </div>
    </header>
  );
}
