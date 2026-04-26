export default function StatCard({ label, value, icon: Icon, tone = 'navy' }) {
  const toneClasses = tone === 'red' ? 'bg-ua-red text-white shadow-red-100' : 'bg-ua-navy text-white shadow-blue-100';

  return (
    <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold leading-5 text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{value}</p>
        </div>
        {Icon ? (
          <div className={`shrink-0 rounded-md p-2.5 shadow-sm ${toneClasses}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
