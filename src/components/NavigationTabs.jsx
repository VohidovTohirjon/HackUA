import { BarChart3, BookOpenCheck, Presentation, Users } from 'lucide-react';

const icons = {
  'Student View': BookOpenCheck,
  'Advisor View': Users,
  'Admin View': BarChart3,
  'Demo Story': Presentation,
};

export default function NavigationTabs({ tabs, activeTab, onChange }) {
  return (
    <nav className="mx-auto max-w-7xl px-5 pt-6">
      <div className="grid gap-2 rounded-lg bg-white p-2 shadow-soft ring-1 ring-slate-200/70 sm:grid-cols-4">
        {tabs.map((tab) => {
          const Icon = icons[tab];
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={`focus-ring flex min-h-12 items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-black transition active:scale-[0.99] ${
                active ? 'bg-ua-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-ua-navy hover:ring-1 hover:ring-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {tab}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
