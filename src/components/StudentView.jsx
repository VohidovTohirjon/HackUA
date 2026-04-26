import { useState } from 'react';
import { ArrowRight, CheckCircle2, Compass, Info, LifeBuoy, MapPinned, Route, XCircle } from 'lucide-react';
import { degreeProgress, gpsCheckpoints, hiddenRules, semesters, studentProfile } from '../data/mockData';
import GraduationRiskCard from './GraduationRiskCard';

const whatChangedBefore = [
  'Student thinks they are on track',
  'Missing 7 credits is hidden',
  'CSC 245 bottleneck is not obvious',
  'Advisor intervention happens late',
];

const whatChangedAfter = [
  'Risk is detected immediately',
  'Missing credits are explained',
  'Bottleneck course is flagged',
  'Advisor receives a clear action summary',
];

export default function StudentView({
  showAnalysis,
  sendSuccess,
  onCheckRisk,
  onSendAdvisor,
  onRegenerate,
  advisorAlert,
  selectedCourse,
  onSelectCourse,
}) {
  const [selectedRule, setSelectedRule] = useState(hiddenRules[2]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg bg-ua-navy shadow-soft">
        <div className="grid gap-7 p-5 text-white sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-red-100 ring-1 ring-white/15">
              <LifeBuoy className="h-4 w-4" aria-hidden="true" />
              Sofia&apos;s Story
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">Sofia thought she was on track.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50">
              Her major courses looked almost complete, but BearPath found hidden rules that could delay graduation.
            </p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <StoryFact label="Student" value={studentProfile.name} />
              <StoryFact label="Context" value="International student" />
              <StoryFact label="Major" value={studentProfile.major} />
              <StoryFact label="Expected graduation" value={studentProfile.estimatedGraduation} />
              <StoryFact label="Current planned credits" value={`${degreeProgress.plannedCredits} / ${degreeProgress.requiredCredits}`} wide />
            </dl>
          </div>

          <div className="rounded-lg bg-white p-5 text-slate-950 shadow-lg">
            <p className="text-sm font-black uppercase tracking-wide text-ua-red">What Sofia said</p>
            <div className="mt-4 grid gap-3">
              {['I thought electives were optional.', 'I did not know CSC 245 blocks CSC 335.', 'I did not realize 113 credits was not enough.'].map((item) => (
                <div key={item} className="rounded-lg bg-slate-50 p-4 text-sm font-black leading-6 text-ua-navy ring-1 ring-slate-200">
                  &quot;{item}&quot;
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm font-black leading-6 text-red-800 ring-1 ring-red-100">
              BearPath turns these hidden rules into visible next steps.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-4 shadow-soft ring-1 ring-slate-200/70 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {[
            'Sofia thought she was on track',
            'Hidden rules could delay her',
            'BearPath found the issue',
            'Rescue route created',
            'Advisor + leadership can act',
          ].map((step, index) => (
            <div key={step} className="contents">
              <div className={`rounded-lg p-4 ring-1 ${index === 3 ? 'bg-ua-navy text-white ring-ua-navy' : 'bg-slate-50 text-slate-800 ring-slate-200'}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${index === 3 ? 'bg-white text-ua-navy' : 'bg-ua-red text-white'}`}>
                  {index + 1}
                </span>
                <p className={`mt-3 text-sm font-black leading-5 ${index === 3 ? 'text-white' : 'text-slate-800'}`}>{step}</p>
              </div>
              {index < 4 ? <ArrowRight className="mx-auto hidden h-5 w-5 self-center text-ua-red lg:block" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-slate-200/70">
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-ua-red ring-1 ring-red-100">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Graduation GPS
            </div>
            <h2 className="mt-4 text-3xl font-black text-ua-navy">Graduation GPS</h2>
            <p className="mt-3 max-w-xl text-base font-semibold leading-7 text-slate-700">
              Not just what classes you picked — what hidden rules could delay you.
            </p>
            <div className="mt-5 grid gap-3">
              <HeroSignal label="Student starts with" value="I thought I was on track" light />
              <HeroSignal label="BearPath finds" value="Hidden rule risks" light />
              <HeroSignal label="Student gets" value="A rescue route" light />
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-5 ring-1 ring-slate-200">
            <div className="flex items-center gap-2">
              <MapPinned className="h-5 w-5 text-ua-red" aria-hidden="true" />
              <p className="text-sm font-black uppercase tracking-wide text-ua-red">Route check</p>
            </div>
            <div className="mt-5 space-y-4">
              {gpsCheckpoints.map((checkpoint, index) => (
                <GpsCheckpoint key={checkpoint.label} checkpoint={checkpoint} isLast={index === gpsCheckpoints.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-ua-red">Hidden Rules That Delay Graduation</p>
            <h2 className="mt-1 text-2xl font-black text-ua-navy">Plain-language explanations for the rules students miss.</h2>
          </div>
          <div className="rounded-md bg-slate-50 px-3 py-2 text-xs font-black text-slate-600 ring-1 ring-slate-200">Click a rule</div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {hiddenRules.map((rule) => (
            <button
              key={rule.name}
              type="button"
              onClick={() => setSelectedRule(rule)}
              className={`focus-ring rounded-full px-4 py-2 text-sm font-black transition active:scale-[0.99] ${
                selectedRule.name === rule.name
                  ? 'bg-ua-red text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-white hover:text-ua-navy'
              }`}
            >
              {rule.name}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          <RuleDetail label="What it means" value={selectedRule.explanation} />
          <RuleDetail label="Why students miss it" value={selectedRule.whyMissed} />
          <RuleDetail label="How it can delay graduation" value={selectedRule.delayRisk} />
          <RuleDetail label="What BearPath does" value={selectedRule.action} highlight />
        </div>
      </section>

      <GraduationRiskCard
        showAnalysis={showAnalysis}
        sendSuccess={sendSuccess}
        onCheckRisk={onCheckRisk}
        onSendAdvisor={onSendAdvisor}
        onRegenerate={onRegenerate}
        advisorAlert={advisorAlert}
      />

      {showAnalysis ? <WhatChangedFeature /> : null}

      <section className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-slate-200/70 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-ua-navy">Semester Plan</h2>
              <p className="mt-1 text-sm text-slate-600">The rescue route lands here: click a course to see the hidden rule behind it.</p>
            </div>
            <div className="rounded-md bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
              Spring 2027 target
            </div>
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {semesters.map((semester) => (
              <div key={semester.term} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-black text-ua-navy">{semester.term}</h3>
                <div className="mt-3 space-y-3">
                  {semester.courses.map((course) => (
                    <button
                      key={course.code}
                      type="button"
                      onClick={() => onSelectCourse(course)}
                      className="focus-ring w-full rounded-md bg-white p-3 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-black text-slate-950">{course.code}</p>
                          <p className="text-sm text-slate-600">{course.name}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{course.credits} cr</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-ua-navy px-2.5 py-1 text-xs font-bold text-white">{course.type}</span>
                        {course.risk ? (
                          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 ring-1 ring-red-200">
                            {course.risk}
                          </span>
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {selectedCourse ? (
            <div className="mt-5 rounded-lg bg-ua-navy p-4 text-white">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" aria-hidden="true" />
                <h3 className="font-black">{selectedCourse.code} selected</h3>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <CourseDetail label="Why this course matters" value={selectedCourse.note} />
                <CourseDetail label="Requirement it satisfies" value={selectedCourse.requirement} />
                <CourseDetail label="Risk if delayed" value={selectedCourse.riskIfDelayed} />
              </div>
            </div>
          ) : null}
      </section>
    </div>
  );
}

function StoryFact({ label, value, wide = false }) {
  return (
    <div className={`rounded-lg bg-white/10 p-4 ring-1 ring-white/15 ${wide ? 'sm:col-span-2' : ''}`}>
      <dt className="text-xs font-black uppercase tracking-wide text-red-100">{label}</dt>
      <dd className="mt-2 font-black text-white">{value}</dd>
    </div>
  );
}

function HeroSignal({ label, value, light = false }) {
  return (
    <div className={`rounded-lg p-4 ring-1 ${light ? 'bg-slate-50 ring-slate-200' : 'bg-white/10 ring-white/15'}`}>
      <p className={`text-xs font-black uppercase tracking-wide ${light ? 'text-ua-red' : 'text-red-100'}`}>{label}</p>
      <p className={`mt-2 text-lg font-black ${light ? 'text-ua-navy' : 'text-white'}`}>{value}</p>
    </div>
  );
}

function CourseDetail({ label, value }) {
  return (
    <div className="rounded-md bg-white/10 p-3 ring-1 ring-white/15">
      <p className="text-xs font-black uppercase tracking-wide text-red-200">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-blue-50">{value}</p>
    </div>
  );
}

function GpsCheckpoint({ checkpoint, isLast }) {
  const tone = {
    green: 'bg-emerald-500 text-emerald-700 ring-emerald-200',
    yellow: 'bg-amber-500 text-amber-700 ring-amber-200',
    red: 'bg-ua-red text-red-700 ring-red-200',
  }[checkpoint.color];

  return (
    <div className="relative flex gap-4">
      {!isLast ? <div className="absolute left-[15px] top-9 h-[calc(100%+1rem)] w-0.5 bg-slate-200" /> : null}
      <div className={`relative z-10 mt-1 h-8 w-8 shrink-0 rounded-full ${tone.split(' ')[0]} ring-4 ring-white`} />
      <div className="min-w-0 flex-1 rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-black text-ua-navy">{checkpoint.label}</p>
          <span className={`rounded-full bg-white px-2.5 py-1 text-xs font-black capitalize ring-1 ${tone.split(' ').slice(1).join(' ')}`}>
            {checkpoint.status}
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-600">{checkpoint.detail}</p>
      </div>
    </div>
  );
}

function RuleDetail({ label, value, highlight = false }) {
  return (
    <div className={`rounded-lg p-4 ring-1 ${highlight ? 'bg-ua-navy text-white ring-ua-navy' : 'bg-slate-50 text-slate-800 ring-slate-200'}`}>
      <p className={`text-xs font-black uppercase tracking-wide ${highlight ? 'text-red-200' : 'text-slate-500'}`}>{label}</p>
      <p className={`mt-3 text-sm font-bold leading-6 ${highlight ? 'text-white' : 'text-slate-700'}`}>{value}</p>
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

function BeforeAfterCard({ label, title, items, tone }) {
  const isAfter = tone === 'after';

  return (
    <article className={`rounded-lg p-5 shadow-soft ring-1 ${isAfter ? 'bg-white ring-emerald-200' : 'bg-white ring-red-200'}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-sm font-black uppercase tracking-wide ${isAfter ? 'text-emerald-700' : 'text-ua-red'}`}>{label}</p>
          <h2 className="mt-1 text-xl font-black text-ua-navy">{title}</h2>
        </div>
        <div className={`rounded-full p-2 ${isAfter ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-ua-red'}`}>
          {isAfter ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <XCircle className="h-5 w-5" aria-hidden="true" />}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm text-slate-700">
            <ArrowRight className={`mt-0.5 h-4 w-4 shrink-0 ${isAfter ? 'text-emerald-600' : 'text-ua-red'}`} aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function WhatChangedFeature() {
  return (
    <section className="overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-slate-200/70">
      <div className="bg-ua-navy px-5 py-5 text-white sm:px-6">
        <p className="text-sm font-black uppercase tracking-wide text-red-200">What Changed?</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">The same plan becomes actionable in 10 seconds.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-50">
              BearPath turns uncertainty into a visible risk summary, a clear explanation, and advisor action before delay happens.
            </p>
          </div>
          <div className="rounded-md bg-white px-4 py-3 text-sm font-black text-ua-navy shadow-sm">Hidden risk → visible action</div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_auto_1fr]">
        <ChangeColumn title="Before BearPath" tone="before" items={whatChangedBefore} />
        <div className="hidden w-px bg-slate-200 lg:block" />
        <ChangeColumn title="After BearPath" tone="after" items={whatChangedAfter} />
      </div>
    </section>
  );
}

function ChangeColumn({ title, tone, items }) {
  const isAfter = tone === 'after';

  return (
    <div className={`p-5 sm:p-6 ${isAfter ? 'bg-emerald-50/60' : 'bg-red-50/60'}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className={`text-xl font-black ${isAfter ? 'text-emerald-900' : 'text-red-950'}`}>{title}</h3>
        <div className={`rounded-full p-2 ${isAfter ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-ua-red'}`}>
          {isAfter ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <XCircle className="h-5 w-5" aria-hidden="true" />}
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
            <span
              className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${isAfter ? 'bg-emerald-500' : 'bg-ua-red'}`}
              aria-hidden="true"
            />
            <p className="text-sm font-bold leading-6 text-slate-800">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreditStat({ label, value }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase text-slate-500">{label} credits</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
    </div>
  );
}
