
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CVData } from './types';
import CVView from './components/CVView';
import AISettings from './components/AISettings';
import BrandingStudio from './components/BrandingStudio';

const INITIAL_CV_DATA: CVData = {
  name: "PHAM MINH TIEN",
  avatar: "Avatar.png", 
  title: "Software Test Engineer | SDET",
  contact: {
    location: "Hong Kong",
    phone: "+852 5570 6811",
    locationSecondary: "Vietnam",
    phoneSecondary: "+849 3321 6875",
    email: "phamminhtien7693@gmail.com",
    linkedin: "https://www.linkedin.com/in/tienpham93/"
  },
  summary: "Software Quality Engineer with 6 years of experience in automation and manual testing. Strong technical background in software development (OOP) and microservices systems. Proficient in building automation frameworks from scratch using TypeScript (Playwright, Cypress) and Java (Selenium). Experienced in setting up CI pipelines and TestOps workflows using Jenkins, Docker, and Shell Scripting. Currently focusing on AI/LLM evaluation processes with a strong foundation in ISTQB testing standards.",
  skills: [
    { category: "Automation", items: ["Playwright", "Cypress", "Selenium", "WebDriverIO", "Cucumber (BDD)", "Mountebank", "WireMock"] },
    { category: "Languages", items: ["TypeScript", "Python", "Java"] },
    { category: "CI/CD & TestOps", items: ["Jenkins", "Docker", "Shell/Bash Scripting", "Gitlab"] },
    { category: "Cloud Service Experience", items: ["AWS ECS", "AWS EKS", "AWS CloudWatch", "AWS S3", "Google cloud storage"] },
    { category: "Testing Focus", items: ["UI & API Automation", "LLM Evaluation", "System Integration", "Shift-Left Testing"] }
  ],
  experience: [
    {
      company: "TEKsystems",
      location: "Hong Kong",
      role: "Vendor Quality Engineer for Apple",
      period: "Sept 2025 – Present",
      product: "Siri",
      team: "LLM Evaluation",
      onSite: "Apple HK Test House",
      bullets: [
        "Refine and dry-run automation scenarios to generate high-quality contexts used for training LLM agents.",
        "Perform human validation (triaging) and root cause analysis on LLM-executed test results to identify defect patterns.",
        "Manage and provision test devices based on iOS build information and test plan configurations.",
        "Localize and optimize Vietnamese test datasets to ensure accuracy and cultural relevance.",
        "Build and maintain an internal app(Python - UV) to wrap common CLI tools and Apple internal API services into intuitive GUI consoles for manual QA teams. Tech stacks: ",
        "- Frontend: Streamlit dashboard and Backend: Flask",
        "- Dependency Management: UV and Makefile for quick packages installation and custom commands",
        "- AI Integration: Integrated Gemini CLI, authoring GEMINI.md as well as custom other markdown skills."
      ]
    },
    {
      company: "NAB Innovation Centre Vietnam",
      location: "Ho Chi Minh City, Vietnam",
      role: "Quality Engineer",
      period: "Feb 2022 – July 2025",
      bullets: [
        "Maintained and optimized test repositories that under management of my team",
        "Ensured automation coverage for UI and API layers met NAB’s quality standards.",
        "Supported tracing and debugging of incidents across many services, coordinating between Vietnam and offshore teams in Dev, System Integration, and Production environments.",
        "Prepared API collections, test data, and environments for non-functional testing (Performance test)",
        "Researched and implemented technical spikes such as automation frameworks, and stub/mock tools, GenAI...etc",
        "Guided new team members through code reviews as well as provide hand-on automation best practices"
      ]
    },
    {
      company: "NashTech",
      location: "Ho Chi Minh City, Vietnam",
      role: "Automation and Manual QA",
      period: "Feb 2020 – Jan 2022",
      bullets: [
        "Built automation frameworks from scratch using Selenium (Java) following BDD and TDD models",
        "Built API testing collections using Postman and REST-assured.",
        "Applied modern non-selenium tools such as Playwright and Cypress for specific project needs.",
        "Manual Testing: Created and Executed test cases following ISTQB practices"
      ]
    },
    {
      company: "NashTech", 
      location: "Ho Chi Minh City, Vietnam",
      role: "IT Help Desk", 
      period: "Feb 2019 – Feb 2020",
      bullets: [
        "Monitored online services through Nagios and Check_mk systems; performed necessary actions (reboot, network switching) or contacted experts upon alerts.",
        "Performed confidence checks at scheduled times and reported results to managers.",
        "Managed and processed requests in the mailbox and ticket system (Azure DevOps)."
      ]
    },
    {
      company: "Alfatech Viet Nam",
      location: "Ho Chi Minh City, Vietnam",
      role: "CAD Tester",
      period: "June 2017 – Oct 2018",
      bullets: [
        "Tested AutoCAD drawings and the company's internal CAD tools.",
        "Worked closely with the IT department to resolve relevant technical incidents."
      ]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      url: "https://www.credly.com/earner/earned/badge/1447f061-dbec-4226-8277-6bf73a478560"
    },
    {
      name: "AWS Certified Cloud Practitioner",
      url: "https://www.credly.com/badges/4eec87bb-e295-419c-8075-3901054932c0/linked_in_profile"
    },
    {
      name: "ISTQB Certified Tester – Foundation Level",
      url: "https://atsqa.org/certified-testers/profile/10eb104d1cbf4be48b2aa5c121ffeac7"
    },
    {
      name: "ISTQB Certified Tester – AI Testing",
      url: "https://atsqa.org/certified-testers/profile/10eb104d1cbf4be48b2aa5c121ffeac7"
    },
    {
      name: "Selenium Automation with Python",
      note: "University of Science Ho Chi Minh City"
    }
  ],
  personalProjects: [
    {
      name: "AutoAgent: Agentic Automation Framework",
      url: "https://github.com/tienpham93/AutoAgent",
      description: "An agentic automation framework powered by LangChain, LangGraph, and Playwright",
      bullets: [
        "Designed a multi-agent workflow where specialized agents: Architect, AutoBot, Evaluator, and Inspector collaborate to handle different phases of the test automation cycle.",
        "Architect agent: Analyzes raw test basis (Markdown/Feature files), maps proper playwright-cli skills and page knowledges, then finally extracts them into a structured execution plan.",
        "AutoBot agent: with flexible workflow that dynamically scan Element Trees and generate Playwright CLI scripts on-the-fly to automate test steps and self-heal on errors.",
        "Evaluator agent: Uploads the execution video to Google Gemini (Multimodal), watches the playback, and compares visual evidence against the test requirements.",
        "Inspector agent: a system audit layer that collect and analyze agent performance and network health through terminal logs."
      ],
      image: "auto_agent_diagram.png"
    }
  ],
  honorsAndAwards: [
    {
      title: "NAB Vietnam - Star of the year award",
      issuer: "NAB Vietnam",
      date: "Jan 2025",
      association: "NAB Innovation Centre Vietnam",
      description: "The FY24 NAB Vietnam Star of the Year, under the Team Award category. This prestigious recognition highlights Copper team’s exemplary performance, dedication, and significant contributions to NAB Vietnam innovation centre, as well as consistent with NAB values."
    }
  ],
  education: {
    school: "Ton Duc Thang University",
    location: "Vietnam",
    degree: "Bachelor’s Degree in Electrical and Electronics Engineering",
    period: "2012 – 2017"
  }
};

const downloadPDF = (userName: string, setShowPrintModal: (show: boolean) => void) => {
  // Check if we are inside an iframe where print is blocked
  if (window.self !== window.top) {
    setShowPrintModal(true);
    return;
  }
  
  // Use native window.print() for perfect ATS-friendly text PDFs
  // with working hyperlinks and native print CSS page break support.
  window.print();
};

const PrintWarningModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 no-print">
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Print / Save as PDF</h3>
      <p className="text-slate-600 text-sm text-center mb-6">
        To save as a high-quality, ATS-friendly PDF with working links, you must open this app in a <strong>new tab</strong>, then click Print again.
      </p>
      <div className="flex flex-col gap-3">
        <a 
          href={window.location.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors w-full shadow-md"
        >
          <span>Open in New Tab</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <button 
          onClick={onClose}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-6 rounded-lg transition-colors w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const Sidebar = ({ userName, setShowPrintModal }: { userName: string, setShowPrintModal: (show: boolean) => void }) => {
  const location = useLocation();
  const links = [
    { to: "/", label: "Resume View", icon: "📄" },
    { to: "/branding", label: "Branding Studio", icon: "🎨" },
    { to: "/ai-assistant", label: "AI Enhancer", icon: "✨" },
  ];

  const handleDownloadPDF = () => downloadPDF(userName, setShowPrintModal);

  return (
    <nav className="w-64 bg-slate-900 text-white min-h-screen p-6 fixed hidden md:block no-print">
      <div className="mb-10">
        <h1 className="text-xl font-bold tracking-tight">TIEN PHAM</h1>
        <p className="text-xs text-slate-400 uppercase mt-1">Portfolio v2.0</p>
      </div>
      <div className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              location.pathname === link.to
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>{link.icon}</span>
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
        
        <button
          onClick={handleDownloadPDF}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-slate-300 hover:bg-slate-800 mt-4 border border-slate-700/50"
        >
          <span>📥</span>
          <span className="font-medium">Print / Save PDF</span>
        </button>
      </div>
      <div className="absolute bottom-10 left-6 right-6 p-4 bg-slate-800 rounded-xl border border-slate-700">
        <p className="text-xs text-slate-400">AWS Certified</p>
        <div className="flex space-x-1 mt-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
        </div>
      </div>
    </nav>
  );
};

const MobileNav = ({ userName, setShowPrintModal }: { userName: string, setShowPrintModal: (show: boolean) => void }) => {
  const handleDownloadPDF = () => downloadPDF(userName, setShowPrintModal);

  return (
    <nav className="md:hidden bg-slate-900 text-white p-4 sticky top-0 z-50 flex justify-around no-print border-b border-slate-800">
      <Link to="/" className="text-sm font-medium">Resume</Link>
      <Link to="/branding" className="text-sm font-medium">Branding</Link>
      <Link to="/ai-assistant" className="text-sm font-medium">AI Enhancer</Link>
      <button onClick={handleDownloadPDF} className="text-sm font-medium text-blue-400">PDF</button>
    </nav>
  );
};

const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        // @ts-ignore
        const has = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      } else {
        setHasApiKey(true); 
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasApiKey(true); 
    }
  };

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
        {showPrintModal && <PrintWarningModal onClose={() => setShowPrintModal(false)} />}
        <Sidebar userName={cvData.name} setShowPrintModal={setShowPrintModal} />
        <MobileNav userName={cvData.name} setShowPrintModal={setShowPrintModal} />
        <main className="flex-1 md:ml-64 print:ml-0 transition-all duration-300">
          {!hasApiKey && (
            <div className="p-8 bg-amber-50 border-b border-amber-200 no-print flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-amber-800">Advanced AI Features Locked</h3>
                <p className="text-sm text-amber-700">To use high-resolution image generation (2K/4K), please select a paid API key.</p>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-xs underline text-amber-600">Learn about billing</a>
              </div>
              <button 
                onClick={handleSelectKey}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition"
              >
                Select Key
              </button>
            </div>
          )}
          <div className="p-4 md:p-10 print:p-0 print:m-0 print:max-w-none print:w-full mx-auto">
            <Routes>
              <Route path="/" element={<CVView data={cvData} />} />
              <Route path="/branding" element={<BrandingStudio />} />
              <Route path="/ai-assistant" element={<AISettings data={cvData} onUpdate={setCvData} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
