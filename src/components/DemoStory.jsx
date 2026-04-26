import { ArrowRight, GitBranch, Globe2, Lightbulb, Route, Sparkles } from 'lucide-react';

const storySections = [
  {
    title: 'Problem Insight',
    body: 'Many students do not fail because they do not care. They get delayed because the rules are hidden.',
  },
  {
    title: 'The Vibe',
    body: 'I thought I was on track… until I learned too late that my elective did not count, my prerequisite sequence was wrong, or my required class was not available.',
  },
  {
    title: 'Why this matters for international, transfer, and first-generation students',
    body: 'They are learning the degree system while also navigating new terminology, new advising expectations, and unfamiliar academic rules.',
  },
  {
    title: 'Our Solution',
    body: 'BearPath is a graduation GPS that turns hidden academic rules into visible action.',
  },
  {
    title: 'What makes it creative',
    body: 'It connects the student’s plan, advisor intervention, and university-level blockers in one loop.',
  },
];

const demoFlow = [
  'Student sees Sofia’s story',
  'Graduation GPS finds hidden risk',
  'Hidden Rule Explainer teaches the rule',
  'Rescue Plan gives next steps',
  'Advisor receives alert',
  'Admin sees system blockers',
];

const iterationSteps = [
  { label: 'Started with', value: 'degree planning is confusing' },
  { label: 'Built first', value: 'three role-based views' },
  { label: 'Learned', value: 'dashboards are not enough' },
  { label: 'Iterated into', value: 'Graduation GPS + hidden-rule explainer + rescue route' },
  { label: 'Final version', value: 'student confusion becomes visible action' },
];

const nextSteps = [
  'integrate real degree audit data',
  'connect advisor scheduling',
  'add real prerequisite validation',
  'include course availability prediction',
  'pilot with international/transfer student groups',
];

const judgingFit = [
  { label: 'Problem Insight', value: 'hidden degree rules delay real students' },
  { label: 'Creativity', value: 'graduation GPS instead of dashboard' },
  { label: 'Execution', value: 'working student → advisor → admin loop' },
  { label: 'Iteration', value: 'rebuilt around student confusion' },
  { label: 'Presentation', value: '30-second Sofia story' },
];

export default function DemoStory() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg bg-ua-navy shadow-soft">
        <div className="grid gap-6 p-5 text-white sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-red-200">Final Judging Pitch</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
              In three minutes: hidden rules become visible action.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50">
              Problem, vibe, innovation, iteration, and next steps all come from one student story: Sofia thought she was on track.
            </p>
          </div>
          <div className="rounded-lg bg-white p-5 text-ua-navy shadow-lg">
            <Globe2 className="h-6 w-6 text-ua-red" aria-hidden="true" />
            <p className="mt-4 text-xl font-black leading-8">
              Built for students navigating unfamiliar systems, transfer rules, and advising expectations.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <p className="text-sm font-black uppercase tracking-wide text-ua-red">Why this fits the hackathon</p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {judgingFit.map((item) => (
            <div key={item.label} className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-wide text-ua-red">{item.label}</p>
              <p className="mt-2 text-sm font-black leading-5 text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {storySections.map((section) => (
          <article key={section.title} className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-red-50 p-2 text-ua-red ring-1 ring-red-100">
                <Lightbulb className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-black text-ua-navy">{section.title}</h3>
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex items-center gap-3">
          <Route className="h-6 w-6 text-ua-red" aria-hidden="true" />
          <h2 className="text-xl font-black text-ua-navy">Working prototype demo flow</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {demoFlow.map((step, index) => (
            <div key={step} className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ua-navy text-sm font-black text-white">{index + 1}</span>
              <p className="mt-4 text-sm font-black leading-5 text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex items-center gap-3">
          <GitBranch className="h-6 w-6 text-ua-red" aria-hidden="true" />
          <h2 className="text-xl font-black text-ua-navy">Vibe Coding / Iteration</h2>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-5">
          {iterationSteps.map((step, index) => (
            <div key={step.label} className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ua-red text-sm font-black text-white">{index + 1}</span>
              <p className="mt-4 text-xs font-black uppercase tracking-wide text-ua-red">{step.label}</p>
              <p className="mt-2 text-sm font-black leading-5 text-slate-800">“{step.value}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-ua-red" aria-hidden="true" />
          <h2 className="text-xl font-black text-ua-navy">What comes next</h2>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {nextSteps.map((step) => (
            <div key={step} className="flex min-h-24 flex-col justify-between rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-black leading-5 text-slate-800">{step}</p>
              <ArrowRight className="mt-4 h-4 w-4 text-ua-red" aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-ua-red p-6 text-center text-white shadow-soft">
        <p className="text-xl font-black leading-8 sm:text-2xl">
          No student should miss their expected graduation year because the rules were hidden.
        </p>
      </section>
    </div>
  );
}
