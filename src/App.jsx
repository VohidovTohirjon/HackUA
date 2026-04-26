import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AIPipeline from "./components/AIPipeline";
import ApiArchitecture from "./components/ApiArchitecture";
import CareBridgeDifference from "./components/CareBridgeDifference";
import PatientCheckInSimulator from "./components/PatientCheckInSimulator";
import Dashboard from "./components/Dashboard";
import PatientDetail from "./components/PatientDetail";
import CHWCopilot from "./components/CHWCopilot";
import ProviderSummary from "./components/ProviderSummary";
import RuralReality from "./components/RuralReality";
import EthicsSafety from "./components/EthicsSafety";
import AISafetyComparison from "./components/AISafetyComparison";
import ImplementationPlan from "./components/ImplementationPlan";
import IntegrationRealism from "./components/IntegrationRealism";
import MetricsPanel from "./components/MetricsPanel";
import EquityTrustSection from "./components/EquityTrustSection";
import NotChatbot from "./components/NotChatbot";
import Footer from "./components/Footer";
import { Card, SectionHeader } from "./components/Card";
import { demoScenarios } from "./data/demoScenarios";
import { patients as fallbackPatients } from "./data/patients";
import { analyzePatientMessage } from "./utils/analyzePatientMessage";
import { createCheckin, fetchPatients } from "./api/client";

const mariaScenario = demoScenarios.find((scenario) => scenario.id === "maria");

export default function App() {
  const [message, setMessage] = useState(mariaScenario.message);
  const [analysis, setAnalysis] = useState(() => analyzePatientMessage(mariaScenario.message));
  const [patients, setPatients] = useState(fallbackPatients);
  const [selectedPatient, setSelectedPatient] = useState(fallbackPatients[0]);
  const [dashboardFilter, setDashboardFilter] = useState("All");
  const [activeScenario, setActiveScenario] = useState(mariaScenario);
  const [demoActive, setDemoActive] = useState(false);
  const [apiNotice, setApiNotice] = useState("Connecting to the care coordination service...");
  const [apiOnline, setApiOnline] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastCheckin, setLastCheckin] = useState(null);

  const selectedAnalysis = useMemo(
    () => analyzePatientMessage(selectedPatient.lastCheckIn),
    [selectedPatient]
  );

  useEffect(() => {
    fetchPatients(fallbackPatients).then((result) => {
      setPatients(result.data);
      const selected = result.data.find((patient) => patient.id === selectedPatient.id) || result.data[0];
      setSelectedPatient(selected);
      setApiOnline(result.source === "api");
      setApiNotice(
        result.source === "api"
          ? "Care coordination service is connected."
          : "Care coordination service is offline. This check-in can still be reviewed locally."
      );
    });
  }, []);

  async function analyzeCurrentMessage(event) {
    event.preventDefault();
    setIsAnalyzing(true);
    const result = await createCheckin({
      patientId: selectedPatient.id,
      channel: "sms",
      message
    });
    setAnalysis(result.data.analysis);
    setApiOnline(result.apiOnline);
    setApiNotice(
      result.apiOnline
        ? "Check-in received and saved for the care team."
        : "Check-in analyzed locally. Start the care coordination service to save messages."
    );
    setLastCheckin({
      id: result.data.checkinId,
      status: result.data.status,
      channel: "sms"
    });
    setDemoActive(false);
    setIsAnalyzing(false);
  }

  async function selectScenario(scenario, fromDemo = false) {
    const patient = patients.find((item) => item.id === scenario.patientId) || patients[0];
    setMessage(scenario.message);
    setSelectedPatient(patient);
    setDashboardFilter("All");
    setActiveScenario(scenario);
    setDemoActive(fromDemo);
    setLastCheckin(null);

    if (!fromDemo) {
      setAnalysis({
        ...analyzePatientMessage(scenario.message),
        source: "draft preview"
      });
      setApiNotice("Message loaded. Review or edit it, then send the check-in for care team review.");
      return;
    }

    setIsAnalyzing(true);
    const result = await createCheckin({
      patientId: patient.id,
      channel: "sms",
      message: scenario.message
    });
    setAnalysis(result.data.analysis);
    setApiOnline(result.apiOnline);
    setApiNotice(
      result.apiOnline
        ? "Guided check-in received and saved for the care team."
        : "Guided check-in analyzed locally. Start the care coordination service to save messages."
    );
    setLastCheckin({
      id: result.data.checkinId,
      status: result.data.status,
      channel: "sms"
    });
    setIsAnalyzing(false);
  }

  function runGuidedDemo() {
    selectScenario(mariaScenario, true);
    window.setTimeout(() => {
      document.getElementById("checkin")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="min-h-screen bg-[#f7fbfc] text-care-ink">
      <Header />
      <main>
        <Hero onRunDemo={runGuidedDemo} />
        <CareBridgeDifference />
        <AIPipeline />
        <ApiArchitecture apiOnline={apiOnline} analysisSource={analysis.source} />
        <PatientCheckInSimulator
          message={message}
          setMessage={setMessage}
          analysis={analysis}
          onAnalyze={analyzeCurrentMessage}
          onSelectScenario={selectScenario}
          activeScenario={activeScenario}
          demoActive={demoActive}
          apiNotice={apiNotice}
          apiOnline={apiOnline}
          isAnalyzing={isAnalyzing}
          lastCheckin={lastCheckin}
        />
        <Dashboard
          patients={patients}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          filter={dashboardFilter}
          setFilter={setDashboardFilter}
          demoActive={demoActive}
        />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Patient Workflow"
            title="From patient message to prepared human follow-up"
            description="Selecting a patient updates the profile, copilot, provider note, and resource suggestions so the demo feels like a connected product."
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <PatientDetail patient={selectedPatient} />
            <div className="space-y-6">
              <ProviderSummary patient={selectedPatient} demoActive={demoActive} />
              <Card className="p-5">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-care-cyan">
                  Selected Patient AI Signals
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <MiniSignal label="Risk" value={selectedAnalysis.riskLevel} />
                  <MiniSignal label="Score" value={selectedAnalysis.score} />
                  <MiniSignal label="Confidence" value={selectedAnalysis.confidence} />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{selectedAnalysis.reason}</p>
              </Card>
            </div>
          </div>
        </section>
        <CHWCopilot patient={selectedPatient} demoActive={demoActive} />
        <NotChatbot />
        <RuralReality />
        <EquityTrustSection />
        <AISafetyComparison />
        <EthicsSafety />
        <MetricsPanel />
        <IntegrationRealism />
        <ImplementationPlan />
      </main>
      <Footer />
    </div>
  );
}

function MiniSignal({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-black text-care-navy">{value}</p>
    </div>
  );
}
