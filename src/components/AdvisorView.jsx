import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { BellRing, CheckCircle2, ClipboardList, MailOpen, SearchX, UsersRound } from 'lucide-react';
import { advisorDistribution, advisorStudents, advisorSummary } from '../data/mockData';
import RiskBadge from './RiskBadge';
import StatCard from './StatCard';

const filters = ['All', 'International', 'Transfer', 'First-generation', 'High Risk', 'Missing Advisor Review'];
const chartColors = ['#0C234B', '#F59E0B', '#AB0520'];

export default function AdvisorView({ activeFilter, onFilterChange, outreachOpen, onOpenOutreach, advisorAlert }) {
  const filteredStudents = advisorStudents.filter((student) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'High Risk') return student.risk === 'High';
    if (activeFilter === 'Missing Advisor Review') return student.needsReview;
    return student.studentType === activeFilter;
  });

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <p className="text-sm font-black uppercase tracking-wide text-ua-red">Who needs help first?</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-ua-navy">Advisor Intervention Queue</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Students are sorted by hidden graduation risk, not just GPA. BearPath reduces advisor guesswork by showing the rule causing the risk.
            </p>
            <p className="mt-3 inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-ua-red ring-1 ring-red-100">
              Presenter cue: show Sofia alert, then generate outreach draft
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenOutreach}
            className="focus-ring relative inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ua-red px-4 py-2.5 text-sm font-black text-white shadow-sm ring-4 ring-red-100 transition hover:bg-red-800 active:scale-[0.99]"
          >
            <span className="absolute -top-3 right-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-ua-red ring-1 ring-red-100">Demo action</span>
            <MailOpen className="h-4 w-4" aria-hidden="true" />
            Generate Outreach Draft
          </button>
        </div>
        {outreachOpen ? (
          <div className="mt-5 flex items-start gap-3 rounded-lg bg-emerald-50 p-4 text-sm leading-6 text-emerald-800 ring-1 ring-emerald-200">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-black">Outreach draft ready</p>
              <p className="mt-1">
                Hi Sofia, BearPath flagged a possible graduation delay caused by a 7-credit gap and CSC 245 prerequisite timing. Let&apos;s meet
                before registration to adjust your plan.
              </p>
            </div>
          </div>
        ) : null}
      </section>

      <WhyThisMattersCard>
        Advisors need prioritization because they cannot manually inspect every student plan every day. BearPath shows who needs help first,
        before a small planning issue becomes a delayed graduation.
      </WhyThisMattersCard>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-ua-red ring-1 ring-red-100">
              <BellRing className="h-4 w-4" aria-hidden="true" />
              New BearPath Alert
            </div>
              <h2 className="mt-3 text-xl font-black text-ua-navy">
                {advisorAlert ? 'New BearPath Alert: Sofia Martinez may avoid a 1-semester delay with advisor review.' : 'New BearPath Alerts'}
              </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {advisorAlert
                ? 'Sofia sent a risk summary from the Student View. The same hidden-risk details are now ready for advisor intervention.'
                : 'When a student sends a BearPath summary, it appears here with the same action details.'}
            </p>
          </div>
          {advisorAlert ? <RiskBadge level={advisorAlert.riskLevel} /> : null}
        </div>

        {advisorAlert ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-ua-red" aria-hidden="true" />
                <p className="font-black text-ua-navy">Sofia Martinez</p>
              </div>
              <div className="mt-4 grid gap-3">
                <AlertDetail label="Risk level" value={advisorAlert.riskLevel} />
                <AlertDetail label="Credit gap" value="7-credit gap" />
                <AlertDetail label="Prerequisite chain" value="CSC 245 → CSC 335" />
                <AlertDetail label="Potential delay avoided" value={advisorAlert.potentialDelayAvoided} />
              </div>
            </div>
            <div className="grid gap-3">
              <AlertDetail label="Recommended advisor action" value={advisorAlert.recommendedAdvisorAction} />
              <AlertDetail label="Suggested meeting topic" value={advisorAlert.suggestedMeetingTopic} />
              <button
                type="button"
                onClick={onOpenOutreach}
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ua-red px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-red-800 active:scale-[0.99]"
              >
                <MailOpen className="h-4 w-4" aria-hidden="true" />
                Generate Outreach Draft
              </button>
              <div className="rounded-lg bg-red-50 p-4 ring-1 ring-red-100">
                <p className="text-xs font-black uppercase tracking-wide text-ua-red">Why this reduces guesswork</p>
                <p className="mt-2 text-sm font-bold leading-6 text-red-900">
                  The advisor does not have to manually rediscover the issue. BearPath names the hidden rule and the deadline.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-sm font-semibold text-slate-600">
            Student-sent alerts will appear here during the demo.
          </div>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assigned students to monitor" value={advisorSummary.totalAssigned} icon={UsersRound} />
        <StatCard label="No hidden risk detected" value={advisorSummary.onTrack} />
        <StatCard label="Need advisor support" value={advisorSummary.supportNeeded} tone="red" />
        <StatCard label="High urgency interventions" value={advisorSummary.highRisk} tone="red" />
      </div>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <p className="text-sm font-black uppercase tracking-wide text-ua-red">Intervention queue</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {advisorStudents.filter((student) => student.risk !== 'Low').map((student) => (
            <div key={student.name} className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-ua-navy">{student.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{student.major}</p>
                </div>
                <RiskBadge level={student.risk} />
              </div>
              <div className="mt-4 grid gap-3 text-sm">
                <QueueField label="Hidden rule causing risk" value={student.hiddenRule} />
                <QueueField label="Delay risk" value={student.delayRisk} />
                <QueueField label="Suggested outreach message" value={student.suggestedOutreach} />
                <QueueField label="Deadline urgency" value={student.urgency} urgent />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
          <div>
            <h2 className="text-xl font-black text-ua-navy">Student Status Distribution</h2>
            <p className="mt-1 text-sm text-slate-600">Risk groups across the advisor&apos;s assigned student caseload.</p>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={advisorDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={96}
                  innerRadius={58}
                  paddingAngle={4}
                  label={({ percent }) => `${Math.round(percent * 100)}%`}
                  labelLine={false}
                >
                  {advisorDistribution.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2">
            {advisorDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-sm ring-1 ring-slate-100">
                <span className="flex items-center gap-2 font-semibold text-slate-700">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: chartColors[index] }} />
                  {item.name}
                </span>
                <span className="font-black text-slate-950">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-xl font-black text-ua-navy">Student Priority Table</h2>
              <p className="mt-1 text-sm text-slate-600">{filteredStudents.length} students match the current view.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onFilterChange(filter)}
                  className={`focus-ring min-h-9 rounded-md px-3 py-2 text-xs font-black transition active:scale-[0.99] ${
                    activeFilter === filter
                      ? 'bg-ua-navy text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-white hover:text-ua-navy hover:ring-ua-navy/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          {filteredStudents.length > 0 ? (
            <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Student Type</th>
                      <th className="px-4 py-3">Major</th>
                      <th className="px-4 py-3">Hidden Rule Causing Risk</th>
                      <th className="px-4 py-3">Delay Risk</th>
                      <th className="px-4 py-3">Recommended Action</th>
                      <th className="px-4 py-3">Urgency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredStudents.map((student) => (
                      <tr key={student.name} className="transition hover:bg-slate-50">
                        <td className="px-4 py-4 font-black text-slate-950">{student.name}</td>
                        <td className="px-4 py-4 text-slate-600">{student.studentType}</td>
                        <td className="px-4 py-4 text-slate-600">{student.major}</td>
                        <td className="px-4 py-4 text-slate-600">{student.hiddenRule}</td>
                        <td className="px-4 py-4 font-bold text-ua-navy">{student.delayRisk}</td>
                        <td className="px-4 py-4 font-bold text-slate-700">{student.suggestedOutreach}</td>
                        <td className="px-4 py-4 font-bold text-ua-red">{student.urgency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mt-5 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <SearchX className="h-8 w-8 text-slate-400" aria-hidden="true" />
              <h3 className="mt-3 font-black text-ua-navy">No students match this filter</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                Try another advisor segment to continue prioritizing outreach.
              </p>
            </div>
          )}
        </section>
      </div>
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

function QueueField({ label, value, urgent = false }) {
  return (
    <div className="rounded-md bg-white p-3 ring-1 ring-slate-200">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 font-bold leading-5 ${urgent ? 'text-ua-red' : 'text-slate-800'}`}>{value}</p>
    </div>
  );
}

function AlertDetail({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{value}</p>
    </div>
  );
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];

  return (
    <div className="chart-tooltip">
      <p className="font-black text-ua-navy">{item.name}</p>
      <p className="mt-1 font-semibold text-slate-600">{item.value} students</p>
    </div>
  );
}
