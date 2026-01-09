
import React, { useState } from 'react';
import { generateProfessionalImage } from '../geminiService';
import { ImageSize } from '../types';

const BrandingStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('A sleek, futuristic workspace with multiple monitors displaying automation code, subtle blue lighting, minimalist aesthetic');
  const [size, setSize] = useState<ImageSize>('1K');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await generateProfessionalImage(prompt, size);
      setImageUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate image. Ensure your API key has enough quota.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Portfolio Branding Studio</h2>
        <p className="text-slate-500 mb-6">Create stunning, high-resolution header images for your personal website or LinkedIn profile using Gemini 3 Pro Image.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Creative Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition min-h-[100px]"
              placeholder="Describe the aesthetic you want..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Image Resolution</label>
              <div className="flex space-x-2">
                {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      size === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`mt-6 px-8 py-3 rounded-xl font-bold transition flex items-center space-x-2 ${
                loading ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-slate-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Generating {size}...</span>
                </>
              ) : (
                <span>Generate Professional Asset</span>
              )}
            </button>
          </div>
          
          {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}
        </div>
      </div>

      {imageUrl && (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 animate-in fade-in duration-500">
          <img src={imageUrl} alt="Generated Asset" className="w-full rounded-xl" />
          <div className="mt-4 flex justify-between items-center px-2">
            <div>
              <p className="text-sm font-bold text-slate-900">Generated {size} Asset</p>
              <p className="text-xs text-slate-500">Optimized for Professional Portfolios</p>
            </div>
            <a 
              href={imageUrl} 
              download={`branding-${size.toLowerCase()}.png`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Download PNG
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandingStudio;
