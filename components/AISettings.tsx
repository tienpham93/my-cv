
import React, { useState } from 'react';
import { CVData } from '../types';
import { refineSummary } from '../geminiService';

interface Props {
  data: CVData;
  onUpdate: (data: CVData) => void;
}

const AISettings: React.FC<Props> = ({ data, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [diff, setDiff] = useState<string | null>(null);

  const handleRefineSummary = async () => {
    setLoading(true);
    try {
      const refined = await refineSummary(data.summary);
      setDiff(refined);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applySummary = () => {
    if (diff) {
      onUpdate({ ...data, summary: diff });
      setDiff(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Content Enhancer</h2>
        <p className="text-slate-500 mb-8">Polishing your professional content with Gemini to ensure maximum impact for high-end recruiters.</p>
        
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Professional Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Current Version</span>
                <p className="text-sm text-slate-600 leading-relaxed">{data.summary}</p>
              </div>
              
              <div className="space-y-2 relative">
                <span className="text-xs font-semibold text-blue-400 uppercase">AI Suggestion</span>
                <div className={`min-h-[100px] p-4 rounded-lg transition-all ${diff ? 'bg-blue-50 border border-blue-100' : 'bg-slate-100/50 flex items-center justify-center'}`}>
                  {diff ? (
                    <p className="text-sm text-slate-800 leading-relaxed italic">"{diff}"</p>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No suggestion yet. Click "Enhance" to start.</p>
                  )}
                </div>
                {diff && (
                  <button 
                    onClick={applySummary}
                    className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition uppercase"
                  >
                    Apply Changes →
                  </button>
                )}
              </div>
            </div>
            
            <button
              onClick={handleRefineSummary}
              disabled={loading}
              className={`mt-6 w-full py-3 rounded-xl font-bold transition ${
                loading ? 'bg-slate-200 text-slate-500' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {loading ? 'Processing with Gemini...' : 'Enhance Summary'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Ready to finalize?</h3>
          <p className="text-blue-200 text-sm mt-1">Changes applied here are reflected in the Resume View.</p>
        </div>
        <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition">
          <a href="#/">View Updated Resume</a>
        </button>
      </div>
    </div>
  );
};

export default AISettings;
