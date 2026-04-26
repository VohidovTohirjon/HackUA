import { useState } from 'react';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import StudentView from './components/StudentView';
import AdvisorView from './components/AdvisorView';
import AdminView from './components/AdminView';
import DemoStory from './components/DemoStory';
import { riskAnalysis, studentProfile } from './data/mockData';

const tabs = ['Student View', 'Advisor View', 'Admin View', 'Demo Story'];

const demoSteps = [
  {
    tab: 'Student View',
    label: 'Sofia’s Story',
    title: 'Sofia thought she was on track.',
    instruction: 'Start here. This shows the student-life problem: a student can feel confident while hidden requirements still create risk.',
  },
  {
    tab: 'Student View',
    label: 'Graduation GPS',
    title: 'BearPath finds hidden rules.',
    instruction: 'Point to Credits, Prerequisites, Course Availability, and Advisor Review.',
  },
  {
    tab: 'Student View',
    label: 'Hidden Rules Explainer',
    title: 'BearPath explains confusing degree language.',
    instruction: 'Click Prerequisites, Electives, or Transfer Credit to show plain-language explanations.',
  },
  {
    tab: 'Student View',
    label: 'Rescue Plan',
    title: 'One click creates a rescue route.',
    instruction: 'Click “Check My Graduation Risk” and show the hidden risks + next steps.',
  },
  {
    tab: 'Student View',
    label: 'Send to Advisor',
    title: 'Risk becomes action.',
    instruction: 'Click “Send to Advisor” so the alert appears in the Advisor View.',
  },
  {
    tab: 'Advisor View',
    label: 'Advisor View',
    title: 'Advisors see who needs help first.',
    instruction: 'Show Sofia’s alert and generate the outreach draft.',
  },
  {
    tab: 'Admin View',
    label: 'Admin View',
    title: 'Leadership sees system blockers.',
    instruction: 'Show CSC 245 bottleneck and advising gaps as system-level issues.',
  },
  {
    tab: 'Demo Story',
    label: 'Demo Story',
    title: 'Why this fits the hackathon.',
    instruction: 'Show problem insight, vibe, iteration, and what comes next.',
  },
];

const sofiaAdvisorAlert = {
  studentName: studentProfile.name,
  riskLevel: riskAnalysis.level,
  potentialDelayAvoided: '1 semester',
  hiddenRisk: 'Credits + CSC 245 prerequisite chain',
  topRiskReasons: riskAnalysis.reasons.slice(0, 3),
  recommendedAdvisorAction: 'Review course sequence and upper-division elective before registration',
  suggestedMeetingTopic: 'Credit gap + CSC 245 prerequisite sequence planning',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Student View');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [advisorFilter, setAdvisorFilter] = useState('All');
  const [outreachOpen, setOutreachOpen] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [advisorAlert, setAdvisorAlert] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);

  function handleCheckRisk() {
    setShowAnalysis(true);
  }

  function handleSendAdvisor() {
    setSendSuccess(true);
    setShowAnalysis(true);
    setAdvisorAlert(sofiaAdvisorAlert);
  }

  function startDemo() {
    setDemoMode(true);
    setDemoStepIndex(0);
    setActiveTab(demoSteps[0].tab);
  }

  function goToDemoStep(index) {
    const nextIndex = Math.min(Math.max(index, 0), demoSteps.length - 1);
    setDemoStepIndex(nextIndex);
    setActiveTab(demoSteps[nextIndex].tab);
  }

  // Mock regeneration resets the visible analysis so the demo can run the check again.
  function handleRegenerate() {
    setShowAnalysis(false);
    setSendSuccess(false);
    setAdvisorAlert(null);
  }

  function renderActiveView() {
    if (activeTab === 'Student View') {
      return (
        <StudentView
          showAnalysis={showAnalysis}
          sendSuccess={sendSuccess}
          onCheckRisk={handleCheckRisk}
          onSendAdvisor={handleSendAdvisor}
          onRegenerate={handleRegenerate}
          advisorAlert={advisorAlert}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
        />
      );
    }

    if (activeTab === 'Advisor View') {
      return (
        <AdvisorView
          activeFilter={advisorFilter}
          onFilterChange={setAdvisorFilter}
          outreachOpen={outreachOpen}
          onOpenOutreach={() => setOutreachOpen(true)}
          advisorAlert={advisorAlert}
        />
      );
    }

    if (activeTab === 'Admin View') {
      return <AdminView exportSuccess={exportSuccess} onExportReport={() => setExportSuccess(true)} />;
    }

    return <DemoStory />;
  }

  return (
    <div className="min-h-screen bg-ua-bg">
      <Header onStartDemo={startDemo} demoMode={demoMode} />
      <NavigationTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} demoMode={demoMode} />
      <main className="mx-auto max-w-7xl px-5 py-6 lg:py-8">{renderActiveView()}</main>
      {demoMode ? (
        <DemoModePanel
          step={demoSteps[demoStepIndex]}
          stepIndex={demoStepIndex}
          totalSteps={demoSteps.length}
          onBack={() => goToDemoStep(demoStepIndex - 1)}
          onNext={() => goToDemoStep(demoStepIndex + 1)}
          onGoToView={() => setActiveTab(demoSteps[demoStepIndex].tab)}
          onExit={() => setDemoMode(false)}
        />
      ) : null}
    </div>
  );
}

function DemoModePanel({ step, stepIndex, totalSteps, onBack, onNext, onGoToView, onExit }) {
  return (
    <aside className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-md rounded-lg bg-white p-4 shadow-2xl ring-2 ring-ua-red/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-ua-red">
            Demo Mode · Step {stepIndex + 1} of {totalSteps}
          </p>
          <h2 className="mt-1 text-lg font-black text-ua-navy">{step.title}</h2>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="focus-ring rounded-md px-2 py-1 text-xs font-black text-slate-500 hover:bg-slate-50 hover:text-ua-red"
        >
          Exit Demo
        </button>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{step.instruction}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          disabled={stepIndex === 0}
          className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={stepIndex === totalSteps - 1}
          className="focus-ring rounded-md bg-ua-red px-3 py-2 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
        <button
          type="button"
          onClick={onGoToView}
          className="focus-ring rounded-md bg-ua-navy px-3 py-2 text-sm font-black text-white transition hover:bg-slate-900"
        >
          Go to {step.tab}
        </button>
      </div>
    </aside>
  );
}
