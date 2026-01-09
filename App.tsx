
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CVData } from './types';
import CVView from './components/CVView';
import AISettings from './components/AISettings';
import BrandingStudio from './components/BrandingStudio';

const INITIAL_CV_DATA: CVData = {
  name: "TIEN PHAM MINH",
  avatar: "Avatar.png", 
  title: "Software Quality Engineer | AWS Certified Solutions Architect",
  contact: {
    location: "Hong Kong",
    phone: "+852 5570 6811",
    email: "phamminhtien7693@gmail.com",
    linkedin: "https://www.linkedin.com/in/tienpham93/"
  },
  summary: "Software Quality Engineer with nearly 6 years of experience in automation and manual testing. Strong technical background in software development (OOP) and microservices systems. Proficient in building automation frameworks from scratch using TypeScript (Playwright, Cypress) and Java (Selenium). Experienced in setting up CI pipelines and TestOps workflows using Jenkins, Docker, and Shell Scripting. Currently focusing on AI/LLM evaluation processes with a strong foundation in ISTQB testing standards.",
  skills: [
    { category: "Automation", items: ["Playwright", "Cypress", "Selenium", "WebDriverIO", "Cucumber (BDD)", "Page Object Model (POM)"] },
    { category: "Languages", items: ["TypeScript (Primary)", "Java", "Python"] },
    { category: "CI Pipelines & TestOps", items: ["Jenkins", "Docker", "Shell/Bash Scripting", "Harness", "Gitlab"] },
    { category: "Cloud & Systems", items: ["AWS (Certified Solutions Architect)", "Microservices (Upstream/Downstream data flow)", "ECS", "EKS", "CloudWatch"] },
    { category: "Testing Focus", items: ["UI & API Automation", "LLM Evaluation", "System Integration", "Shift-Left Testing"] }
  ],
  experience: [
    {
      company: "TEKsystems",
      client: "Apple",
      location: "Hong Kong",
      role: "Quality Engineer",
      period: "Sept 2025 – Present",
      product: "Siri (AI-Powered Multilingual iOS Application)",
      team: "LLM Evaluation",
      bullets: [
        "Refine and dry-run automation scenarios to generate high-quality contexts used for training LLM agents.",
        "Apply ISTQB testing principles to perform human validation (triaging) and root cause analysis on LLM-executed test results to identify defect patterns.",
        "Manage and provision test devices based on iOS build information and test plan configurations.",
        "Localize and optimize Vietnamese test datasets to ensure accuracy and cultural relevance."
      ]
    },
    {
      company: "NAB Innovation Centre Vietnam",
      location: "Vietnam",
      role: "Quality Engineer",
      period: "Feb 2022 – July 2025",
      bullets: [
        "Maintained and optimized test repositories (Blackbox, System tests) using Playwright and Cypress, ensuring high stability and reliability.",
        "Ensured automation coverage for UI and API layers met NAB’s quality standards.",
        "Supported tracing and debugging of incidents across microservices systems, coordinating between Vietnam and offshore teams in Dev, System Integration, and Production environments.",
        "Prepared API collections, test data, and environments for non-functional performance testing.",
        "Researched and implemented technical spikes, including setting up CI pipelines (Jenkins, Docker), automation frameworks, and stub/mock tools."
      ]
    },
    {
      company: "NashTech",
      location: "Ho Chi Minh City, Vietnam",
      role: "Automation and Manual QA",
      period: "Feb 2020 – Jan 2022",
      bullets: [
        "Automation Testing: Built automation frameworks from scratch using Selenium (Java) following BDD and TDD models; Built API testing collections using Postman and REST-assured.",
        "Applied modern non-selenium tools such as Playwright and Cypress for specific project needs.",
        "Manual Testing: Executed manual testing following ISTQB practices; Gained domain experience in Marketing & Retail, Recruitment, and Security & Monitoring."
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
      url: "https://www.credly.com/badges/1447f061-dbec-4226-8277-6bf73a478560"
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
  education: {
    school: "Ton Duc Thang University",
    location: "Vietnam",
    degree: "Bachelor’s Degree in Electrical and Electronics Engineering",
    period: "2012 – 2017"
  }
};

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { to: "/", label: "Resume View", icon: "📄" },
    { to: "/branding", label: "Branding Studio", icon: "🎨" },
    { to: "/ai-assistant", label: "AI Enhancer", icon: "✨" },
  ];

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

const MobileNav = () => (
  <nav className="md:hidden bg-slate-900 text-white p-4 sticky top-0_z-50 flex justify-around no-print border-b border-slate-800">
    <Link to="/" className="text-sm font-medium">Resume</Link>
    <Link to="/branding" className="text-sm font-medium">Branding</Link>
    <Link to="/ai-assistant" className="text-sm font-medium">AI Enhancer</Link>
  </nav>
);

const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [hasApiKey, setHasApiKey] = useState(false);

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
        <Sidebar />
        <MobileNav />
        <main className="flex-1 md:ml-64 transition-all duration-300">
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
          <div className="p-4 md:p-10 max-w-5xl mx-auto">
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
