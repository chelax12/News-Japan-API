
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onSelect: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar px-2 sm:justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
            whitespace-nowrap px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300
            ${selectedCategory === cat 
              ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105' 
              : 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
