import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, CheckCircle2, Download, Landmark, TriangleAlert } from 'lucide-react';
import { adminAlerts, adminMetrics, advisingCoverage, collegeProgress, criticalCourses, systemBlockers } from '../data/mockData';
import StatCard from './StatCard';

export default function AdminView({ exportSuccess, onExportReport }) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-ua-navy p-5 text-white shadow-soft sm:p-6 lg:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-red-200">Where is the system blocking students?</p>
            <h2 className="mt-2 text-2xl font-black">System Blockers Dashboard</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-50">
              These are not individual student failures. These are repeated patterns that create graduation delay.
            </p>
            <p className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-red-100 ring-1 ring-white/20">
              Presenter cue: Sofia’s CSC 245 risk becomes a system blocker
            </p>
          </div>
          <button
            type="button"
            onClick={onExportReport}
            className="focus-ring relative inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-black text-ua-navy shadow-sm ring-4 ring-white/20 transition hover:bg-slate-100 active:scale-[0.99]"
          >
            <span className="absolute -top-3 right-2 rounded-full bg-ua-red px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">Demo action</span>
            <Download className="h-4 w-4" aria-hidden="true" />
            Export Report
          </button>
        </div>
        {exportSuccess ? (
          <div className="mt-5 flex items-start gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" aria-hidden="true" />
            <div>
              <p className="font-black">Mock leadership report prepared. Demo data only.</p>
              <p className="mt-1 text-blue-50">Includes course bottlenecks, advising coverage, and completion-plan risk.</p>
            </div>
          </div>
        ) : null}
      </section>

      <WhyThisMattersCard>
        Leadership needs to see patterns like bottleneck courses and advising gaps because many student delays are system-level, not individual
        failure. BearPath turns those patterns into action signals.
      </WhyThisMattersCard>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-ua-red">Top System Blockers</p>
          <h2 className="mt-1 text-2xl font-black text-ua-navy">Repeated rules and capacity issues that delay students.</h2>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-5">
          {systemBlockers.map((blocker) => (
            <div key={blocker.title} className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="font-black text-ua-navy">{blocker.title}</h3>
              <p className="mt-3 text-3xl font-black text-ua-red">{blocker.affected}</p>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">students affected</p>
              <div className="mt-4 rounded-md bg-white p-3 ring-1 ring-slate-200">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Why it causes delay</p>
                <p className="mt-2 text-sm font-bold leading-5 text-slate-800">{blocker.detail}</p>
              </div>
              <div className="mt-4 rounded-md bg-white p-3 ring-1 ring-slate-200">
                <p className="text-xs font-black uppercase tracking-wide text-ua-red">Impact if fixed</p>
                <p className="mt-2 text-sm font-bold leading-5 text-slate-800">{blocker.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <p className="text-sm font-black uppercase tracking-wide text-ua-red">From individual risk to system action</p>
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
          The same CSC 245 issue that appears in Sofia’s plan also appears across 289 students, which is how BearPath turns one student story into leadership action.
        </p>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
          {['Sofia risk detected', 'Advisor alert', 'CSC 245 pattern identified', 'Leadership adds support/section'].map((step, index) => (
            <div key={step} className="contents">
              <div className="rounded-lg bg-slate-50 p-4 text-center ring-1 ring-slate-200">
                <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-ua-navy text-sm font-black text-white">{index + 1}</span>
                <p className="mt-3 text-sm font-black text-slate-800">{step}</p>
              </div>
              {index < 3 ? <ArrowRight className="mx-auto hidden h-5 w-5 text-ua-red lg:block" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-black text-ua-navy">Priority Attention Required</h2>
          <p className="text-sm text-slate-600">Institutional blockers that require leadership action, not just student effort.</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {adminAlerts.map((alert) => (
            <div key={alert.title} className="rounded-lg border border-red-100 bg-red-50 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="rounded-md bg-white p-2 text-ua-red ring-1 ring-red-100">
                  <TriangleAlert className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-ua-red ring-1 ring-red-200">{alert.severity}</span>
              </div>
              <h3 className="mt-4 font-black text-red-950">{alert.title}</h3>
              <p className="mt-2 text-sm text-red-800">{alert.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminMetrics.map((metric, index) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} icon={index === 0 ? Landmark : undefined} tone={index === 4 ? 'red' : 'navy'} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
        <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
          <div>
            <h2 className="text-xl font-black text-ua-navy">Degree Planner Progress by College</h2>
            <p className="mt-1 text-sm text-slate-600">Share of active plans that are on track, need support, or are off track.</p>
          </div>
          <div className="mt-5 h-96 min-h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collegeProgress} margin={{ top: 14, right: 12, left: -12, bottom: 18 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="college" tick={{ fontSize: 12, fill: '#475569' }} interval={0} tickMargin={10} />
                <YAxis tick={{ fontSize: 12, fill: '#475569' }} tickFormatter={(value) => `${value}%`} />
                <Tooltip content={<ProgressTooltip />} cursor={{ fill: '#F8FAFC' }} />
                <Legend wrapperStyle={{ paddingTop: 12, fontWeight: 700 }} />
                <Bar dataKey="onTrack" name="On Track" stackId="a" fill="#0C234B" radius={[0, 0, 5, 5]} />
                <Bar dataKey="supportNeeded" name="Support Needed" stackId="a" fill="#F59E0B" />
                <Bar dataKey="offTrack" name="Off Track" stackId="a" fill="#AB0520" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
          <h2 className="text-xl font-black text-ua-navy">Advising Coverage</h2>
          <div className="mt-5 space-y-3">
            {advisingCoverage.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-md bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <span className="text-sm font-semibold text-slate-600">{item.label}</span>
                <span className="font-black text-slate-950">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <div>
          <h2 className="text-xl font-black text-ua-navy">Critical Courses Creating Delay Risk</h2>
          <p className="mt-1 text-sm text-slate-600">Course capacity signals where intervention can protect hundreds of timelines.</p>
        </div>
        {criticalCourses.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {criticalCourses.map((course) => (
              <div key={course.code} className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                <p className="font-black text-ua-navy">{course.code}</p>
                <p className="mt-1 min-h-10 text-sm text-slate-600">{course.name}</p>
                <p className="mt-4 text-3xl font-black text-ua-red">{course.impacted}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">students impacted</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <p className="font-black text-ua-navy">No critical bottlenecks detected</p>
            <p className="mt-2 text-sm text-slate-600">Course capacity is currently aligned with degree-plan demand.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function WhyThisMattersCard({ children }) {
  return (
    <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
      <p className="text-sm font-black uppercase tracking-wide text-ua-red">Why this matters</p>
      <p className="mt-2 max-w-4xl text-base font-semibold leading-7 text-slate-700">{children}</p>
    </section>
  );
}

function ProgressTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="font-black text-ua-navy">{label}</p>
      <div className="mt-2 space-y-1">
        {payload.map((entry) => (
          <p key={entry.name} className="flex items-center justify-between gap-6 text-sm">
            <span className="font-semibold text-slate-600">{entry.name}</span>
            <span className="font-black text-slate-950">{entry.value}%</span>
          </p>
        ))}
      </div>
    </div>
  );
}
