
import React, { useState } from 'react';

interface SourceConfigProps {
  onApplyJson: (json: string) => void;
  onReset: () => void;
}

const SourceConfig: React.FC<SourceConfigProps> = ({ onApplyJson, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [json, setJson] = useState('');

  const handleSubmit = () => {
    if (!json.trim()) return;
    onApplyJson(json);
    setJson(''); 
    setIsOpen(false); 
  };

  return (
    <div className="bg-slate-900 border-b border-white/5 relative z-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="py-3 text-[9px] font-black text-slate-400 hover:text-red-500 flex items-center gap-3 transition-all mx-auto uppercase tracking-[0.3em] group"
        >
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></span>
          {isOpen ? 'Close Data Terminal' : 'Open Data Terminal • Add News'}
        </button>

        {isOpen && (
          <div className="py-10 border-t border-white/5 animate-in fade-in zoom-in duration-300">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-white font-serif text-xl italic">New Entry Import</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Feed Accumulation System v2.0</p>
                  </div>
                  <span className="text-[9px] text-slate-600 font-mono">Status: Awaiting Input...</span>
                </div>
                
                <textarea 
                  placeholder='Paste valid News JSON object or array here...'
                  className="w-full h-64 p-6 text-xs font-mono border border-white/10 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none bg-slate-950 text-slate-300 shadow-2xl placeholder:text-slate-700"
                  value={json}
                  onChange={(e) => setJson(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleSubmit}
                  className="flex-grow py-4 bg-red-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 active:scale-[0.98]"
                >
                  Merge into Live Feed
                </button>
                <button 
                  onClick={onReset}
                  className="px-8 py-4 border border-white/10 text-slate-400 text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/5 transition-all"
                >
                  Factory Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceConfig;
