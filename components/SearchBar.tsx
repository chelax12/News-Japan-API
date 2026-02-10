
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative max-w-2xl w-full mx-auto group">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <i className="fa-solid fa-magnifying-glass text-slate-500 group-focus-within:text-red-500 transition-colors"></i>
      </div>
      <input
        type="text"
        className="block w-full pl-14 pr-6 py-5 bg-white text-slate-900 font-medium rounded-2xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500/20 transition-all shadow-2xl"
        placeholder="Enter topics, keywords, or headlines..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest hidden sm:block">
        Live Search
      </div>
    </div>
  );
};

export default SearchBar;
