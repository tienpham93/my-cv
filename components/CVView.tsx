
import React, { useRef, useEffect } from 'react';
import { CVData } from '../types';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#ecf3ff',
    primaryTextColor: '#1e40af',
    primaryBorderColor: '#3b82f6',
    lineColor: '#60a5fa',
    secondaryColor: '#f8fafc',
    tertiaryColor: '#ffffff',
    fontFamily: 'Inter'
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    useMaxWidth: true,
    padding: 20
  }
});

interface Props {
  data: CVData;
}

const MermaidDiagram: React.FC<{ content: string; id: string }> = ({ content, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = `<div class="mermaid">${content}</div>`;
      mermaid.contentLoaded();
    }
  }, [content]);

  return <div ref={containerRef} className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 overflow-x-auto print:overflow-visible print:bg-white print:border-slate-200" id={id} />;
};

const CVView: React.FC<Props> = ({ data }) => {
  const cvRef = useRef<HTMLDivElement>(null);

  const getSkillIcon = (category: string) => {
    const iconClass = "w-4 h-4 text-blue-500 mr-2 flex-shrink-0";
    switch (category.toLowerCase()) {
      case 'automation':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
      case 'languages':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>;
      case 'ci pipelines & testops':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
      case 'cloud & systems':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>;
      case 'testing focus':
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>;
      default:
        return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
    }
  };

  return (
    <div className="cv-container bg-white shadow-xl rounded-none md:rounded-2xl print:rounded-none overflow-hidden print:overflow-visible border border-slate-200 print:shadow-none print:border-none print:m-0 print:p-0">
      <style>{`
        .cert-container {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.25rem;
          transition: all 0.3s ease;
        }
        @media print {
          .cert-container {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          .print-avoid-break {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .force-page-break {
            break-before: page;
            page-break-before: always;
          }
          img {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
        .mermaid svg {
          max-width: 100% !important;
          height: auto !important;
        }
      `}</style>
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 md:p-10 print:p-12 print:bg-slate-900 print:text-white">
        <div className="flex flex-col md:flex-row print:flex-row md:items-center print:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="relative flex-shrink-0 w-16 h-16 md:w-20 print:w-20 md:h-20 print:h-20">
              {data.avatar && (
                <>
                  <img 
                    src={data.avatar}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="hidden"
                    alt="preload"
                  />
                  <div 
                    id="cv-avatar"
                    className="absolute inset-0 w-full h-full rounded-full border-2 border-blue-500/30 shadow-2xl bg-slate-800 z-10 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${data.avatar})` }}
                  />
                </>
              )}
              <div 
                id="cv-avatar-fallback"
                className="absolute inset-0 w-full h-full rounded-full border-2 border-blue-500/30 shadow-2xl bg-slate-800 flex items-center justify-center text-blue-400 font-bold text-xl md:text-2xl"
              >
                {data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-serif font-bold tracking-tight mb-1 uppercase leading-tight text-white">{data.name}</h1>
              <p className="text-blue-400 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">{data.title}</p>
            </div>
          </div>
          <div className="text-slate-400 text-[10px] md:text-xs print:text-xs space-y-1 md:text-right print:text-right font-medium tracking-wide flex-1 min-w-0">
            <p className="flex md:justify-end print:justify-end items-center gap-2 flex-wrap">
               <span className="opacity-60">{data.contact.location}</span>
               <span className="w-1 h-1 bg-slate-700 rounded-full hidden md:block print:block"></span>
               <span>{data.contact.phone}</span>
            </p>
            {data.contact.phoneSecondary && (
              <p className="flex md:justify-end print:justify-end items-center gap-2 flex-wrap mt-0.5">
                 {data.contact.locationSecondary && <span className="opacity-60">{data.contact.locationSecondary}</span>}
                 <span className="w-1 h-1 bg-slate-700 rounded-full hidden md:block print:block"></span>
                 <span>{data.contact.phoneSecondary}</span>
              </p>
            )}
            <p className="text-slate-300 break-all">{data.contact.email}</p>
            <p className="break-all">
              <a 
                href={data.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 hover:underline transition-all"
              >
                {data.contact.linkedin.replace('https://www.', '').replace('https://', '')}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-10 print:p-12 print:space-y-8 block">
        {/* Summary */}
        <section className="break-inside-avoid print-avoid-break">
          <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Professional Summary</h2>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base print:text-base font-light italic">
            {data.summary}
          </p>
        </section>

        {/* Technical Expertise */}
        <section>
          <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-8 md:gap-x-12 print:gap-x-12 gap-y-6 print:gap-y-8">
            <div className="hidden print:block h-[1px] w-full col-span-full"></div>
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="break-inside-avoid print-avoid-break">
                <div className="flex items-center mb-2">
                  {getSkillIcon(skillGroup.category)}
                  <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wide">{skillGroup.category}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {skillGroup.items.join(', ')}
                </p>
              </div>
            ))}
            {/* Integrated Professional Certifications */}
            <div className="md:col-span-1 print:col-span-1 break-inside-avoid print-avoid-break cert-container">
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wide">Professional Certifications</h3>
              </div>
              <ul className="space-y-2.5">
                <li className="hidden print:block h-[1px] w-full"></li>
                {data.certifications.map((cert, idx) => (
                  <li key={idx} className="text-slate-600 text-sm block items-start break-inside-avoid print-avoid-break">
                    <div className="flex items-start w-full group/cert">
                      <span className="text-blue-500 mr-2 mt-1.5 h-1 w-1 rounded-full bg-blue-500 flex-shrink-0 group-hover/cert:scale-125 transition-transform"></span>
                      <div className="flex-1 min-w-0 break-words">
                        {cert.url ? (
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-all font-medium flex items-center gap-1"
                          >
                            <span>{cert.name}</span>
                            <svg className="w-3 h-3 opacity-50 group-hover/cert:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span className="font-medium block">{cert.name}</span>
                        )}
                      </div>
                    </div>
                    {cert.note && (
                      <div className="text-slate-400 text-[10px] ml-3 mt-0.5 italic lowercase">{cert.note}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="space-y-8 print:space-y-6 block">
            {data.experience.map((exp, idx) => (
              <div key={idx} className={`${exp.forcePageBreak ? 'force-page-break' : ''}`}>
                <div className="hidden print:block h-[1px] w-full"></div>
                <div className="group break-inside-avoid print-avoid-break">
                  {idx === 0 && (
                    <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Professional History</h2>
                  )}
                  <div className="flex flex-col md:flex-row print:flex-row justify-between md:items-start print:items-start mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 font-bold text-base break-words">
                        {exp.company} {exp.client && <span className="text-slate-400 font-normal"> (Client: {exp.client})</span>}
                      </h3>
                      <p className="text-blue-600 font-semibold text-xs italic tracking-wide break-words">{exp.role}</p>
                      {exp.product && (
                        <p className="text-slate-500 text-[11px] mt-1 break-words">
                          <span className="font-bold uppercase opacity-70">Product:</span> {exp.product} | <span className="font-bold uppercase opacity-70">Team:</span> {exp.team}
                        </p>
                      )}
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1 md:mt-0 print:mt-0 font-bold uppercase tracking-tighter">
                      {exp.location} • {exp.period}
                    </div>
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  <li className="hidden print:block h-[1px] w-full"></li>
                  {exp.bullets.map((bullet, bIdx) => {
                    const isSubBullet = bullet.trim().startsWith('-');
                    return (
                      <li 
                        key={bIdx} 
                        className={`text-slate-700 text-sm leading-relaxed relative break-inside-avoid print-avoid-break block ${isSubBullet ? 'pl-8 mt-1 text-slate-500 italic' : 'pl-4'}`}
                      >
                        <span className={`absolute top-2 h-1 w-1 rounded-full ${isSubBullet ? 'left-4 bg-slate-300' : 'left-0 bg-blue-500'}`}></span>
                        {isSubBullet ? bullet.trim().substring(1).trim() : bullet}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="break-inside-avoid print-avoid-break mt-10 print:mt-8">
          <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Education</h2>
          <div className="flex flex-col md:flex-row print:flex-row justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wide break-words">{data.education.school}</h3>
              <p className="text-slate-600 text-sm italic mt-1 break-words">{data.education.degree}</p>
            </div>
            <div className="text-slate-400 text-[11px] mt-2 md:mt-0 print:mt-0 font-bold uppercase tracking-tighter text-left md:text-right print:text-right">
              <p>{data.education.location}</p>
              <p>{data.education.period}</p>
            </div>
          </div>
        </section>

        {/* Honors & Awards */}
        {data.honorsAndAwards && data.honorsAndAwards.length > 0 && (
          <section className="mt-10 print:mt-8">
            <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Honors & Awards</h2>
            <div className="space-y-10 print:space-y-8 block">
              {data.honorsAndAwards.map((award, idx) => (
                <div key={idx} className="group break-inside-avoid print-avoid-break border-t border-transparent print:border-slate-100 print:mt-4 print:pt-4">
                  <div className="flex flex-col md:flex-row print:flex-row justify-between md:items-start print:items-start mb-3 gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <h3 className="text-slate-900 font-bold text-base md:text-lg print:text-lg break-words leading-tight">{award.title}</h3>
                      </div>
                      <p className="text-blue-600 font-semibold text-xs italic tracking-wide">{award.issuer}</p>
                      {award.association && (
                        <p className="text-slate-500 text-[11px] mt-1 italic opacity-80">Associated with {award.association}</p>
                      )}
                    </div>
                    <div className="text-slate-400 text-[11px] md:text-right print:text-right font-bold uppercase tracking-tighter whitespace-nowrap">
                      {award.date}
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    {award.description}
                  </p>
                  {award.image && (
                    <div className="md:ml-11 max-w-md group/award-img overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:border-amber-200 hover:shadow-lg">
                      <div className="p-1">
                        <img 
                          src={award.image} 
                          alt={award.title}
                          className="w-full h-auto rounded-lg shadow-sm transition-transform duration-500 group-hover/award-img:scale-[1.01]"
                          onError={(e) => {
                            e.currentTarget.parentElement?.parentElement?.style.setProperty('display', 'none');
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Personal Projects */}
        {data.personalProjects && data.personalProjects.length > 0 && (
          <section className="print:break-before-page">
            <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Personal Projects</h2>
            <div className="space-y-12 print:space-y-10 block">
              {data.personalProjects.map((project, idx) => (
                <div key={idx} className="group border-t border-transparent print:border-slate-100 print:mt-8 print:pt-8">
                  <div className="flex flex-col md:flex-row print:flex-row justify-between md:items-start print:items-start mb-4 gap-4 break-inside-avoid print-avoid-break">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row print:flex-row md:items-center print:items-center justify-between gap-4 mb-2">
                        <h3 className="text-slate-900 font-bold text-lg break-words">
                          {project.name}
                        </h3>
                        {project.url && (
                            <a 
                              href={project.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="github-link inline-flex items-center gap-1.5 md:gap-2 text-white print:text-blue-600 hover:bg-blue-700 print:hover:bg-transparent transition-all font-extrabold print:font-bold text-[10px] print:text-xs bg-blue-600 print:bg-transparent px-3 print:px-0 py-1.5 print:py-0 rounded-lg print:rounded-none border-b-2 border-blue-800 print:border-none shadow-[0_2px_0_rgb(30,58,138),0_4px_10px_rgba(37,99,235,0.2)] print:shadow-none group/link hover:translate-y-[-1px] print:hover:translate-y-0 active:translate-y-[1px] print:active:translate-y-0 active:border-b-[1px] print:active:border-none whitespace-nowrap"
                            >
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
                              <span>VIEW PROJECT ON GITHUB</span>
                              <span className="inline-block transform group-hover/link:translate-x-1 transition-transform">→</span>
                            </a>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-slate-700 text-sm leading-relaxed relative pl-4 break-inside-avoid print-avoid-break block">
                        <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-blue-500"></span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {project.diagram && (
                    <div className="mb-6 group/diagram break-inside-avoid print-avoid-break">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Project Workflow Architecture</p>
                      <div className="relative">
                        <MermaidDiagram content={project.diagram} id={`diagram-${idx}`} />
                        <div className="absolute inset-0 pointer-events-none border border-slate-100 rounded-xl group-hover/diagram:border-blue-100 transition-colors"></div>
                      </div>
                    </div>
                  )}
                  {project.image && (
                    <div className="mb-6 group/image overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all hover:border-blue-200 hover:shadow-xl break-inside-avoid print-avoid-break">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 px-4">Project Architecture Image</p>
                      <div className="p-4 pt-1">
                        <img 
                          src={project.image} 
                          alt={`${project.name} Architecture`}
                          className="w-full h-auto rounded-xl shadow-sm transition-transform duration-500 group-hover/image:scale-[1.02]"
                          onError={(e) => {
                            e.currentTarget.parentElement?.parentElement?.style.setProperty('display', 'none');
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default CVView;
