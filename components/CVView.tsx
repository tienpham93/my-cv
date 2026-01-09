
import React from 'react';
import { CVData } from '../types';

interface Props {
  data: CVData;
}

const CVView: React.FC<Props> = ({ data }) => {
  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

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
    <div className="cv-container bg-white shadow-xl rounded-none md:rounded-2xl overflow-hidden print:overflow-visible border border-slate-200 print:shadow-none print:border-none print:m-0">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 md:p-10 print:p-12 print:bg-slate-900 print:text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            {data.avatar && (
              <div className="flex-shrink-0">
                <img 
                  src={data.avatar} 
                  alt={data.name} 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-blue-500/30 shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('ui-avatars')) {
                       target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=1e293b&color=3b82f6&bold=true`;
                    }
                  }}
                />
              </div>
            )}
            <div>
              <h1 className="text-lg md:text-xl font-serif font-bold tracking-tight mb-1 uppercase leading-tight text-white">{data.name}</h1>
              <p className="text-blue-400 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">{data.title}</p>
            </div>
          </div>
          <div className="text-slate-400 text-[10px] md:text-xs space-y-1 md:text-right font-medium tracking-wide">
            <p className="flex md:justify-end items-center gap-2">
               <span className="opacity-60">{data.contact.location}</span>
               <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
               <span>{data.contact.phone}</span>
            </p>
            <p className="text-slate-300">{data.contact.email}</p>
            <p>
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

      <div className="p-8 md:p-12 space-y-10 print:p-12 print:space-y-8">
        {/* Summary */}
        <section>
          <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Professional Summary</h2>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base font-light italic">
            {data.summary}
          </p>
        </section>

        {/* Technical Expertise */}
        <section>
          <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="print:break-inside-avoid">
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
            <div className="md:col-span-1 print:break-inside-avoid">
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wide">Professional Certifications</h3>
              </div>
              <ul className="space-y-2.5">
                {data.certifications.map((cert, idx) => (
                  <li key={idx} className="text-slate-600 text-sm flex flex-col items-start">
                    <div className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1.5 h-1 w-1 rounded-full bg-blue-500 flex-shrink-0"></span>
                      {cert.url ? (
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-all font-medium"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        <span className="font-medium">{cert.name}</span>
                      )}
                    </div>
                    {cert.note && (
                      <span className="text-slate-400 text-[10px] ml-3 mt-0.5 italic">{cert.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Professional History</h2>
          <div className="space-y-8 print:space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="group print:break-inside-avoid">
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-slate-900 font-bold text-base">
                      {exp.company} {exp.client && <span className="text-slate-400 font-normal"> (Client: {exp.client})</span>}
                    </h3>
                    <p className="text-blue-600 font-semibold text-xs italic tracking-wide">{exp.role}</p>
                    {exp.product && (
                      <p className="text-slate-500 text-[11px] mt-1">
                        <span className="font-bold uppercase opacity-70">Product:</span> {exp.product} | <span className="font-bold uppercase opacity-70">Team:</span> {exp.team}
                      </p>
                    )}
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1 md:mt-0 font-bold uppercase tracking-tighter">
                    {exp.location} • {exp.period}
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-slate-700 text-sm leading-relaxed flex items-start">
                      <span className="text-blue-500 mr-2 mt-1.5 h-1 w-1 rounded-full bg-blue-500 flex-shrink-0"></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="print:break-inside-avoid">
          <h2 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-slate-100 pb-2 mb-4 print:border-slate-200">Education</h2>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wide">{data.education.school}</h3>
              <p className="text-slate-600 text-sm italic mt-1">{data.education.degree}</p>
            </div>
            <div className="text-slate-400 text-[11px] mt-2 md:mt-0 font-bold uppercase tracking-tighter text-left md:text-right">
              <p>{data.education.location}</p>
              <p>{data.education.period}</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="bg-slate-50 p-6 text-center no-print border-t border-slate-100">
         <button 
           onClick={handlePrint}
           className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition flex items-center mx-auto space-x-2 text-sm font-bold shadow-lg shadow-slate-200 group"
         >
           <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
           </svg>
           <span>Download PDF</span>
         </button>
         <p className="mt-3 text-[10px] text-slate-400 uppercase tracking-widest">Select "Save as PDF" in the destination</p>
      </div>
    </div>
  );
};

export default CVView;
