import { useState } from 'react';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import StudentView from './components/StudentView';
import AdvisorView from './components/AdvisorView';
import AdminView from './components/AdminView';
import DemoStory from './components/DemoStory';
import { riskAnalysis, studentProfile } from './data/mockData';

const tabs = ['Student View', 'Advisor View', 'Admin View', 'Demo Story'];

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

  function handleCheckRisk() {
    setShowAnalysis(true);
  }

  function handleSendAdvisor() {
    setSendSuccess(true);
    setShowAnalysis(true);
    setAdvisorAlert(sofiaAdvisorAlert);
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
      <Header />
      <NavigationTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <main className="mx-auto max-w-7xl px-5 py-6 lg:py-8">{renderActiveView()}</main>
    </div>
  );
}
