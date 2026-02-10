
import React from 'react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Recent';
    try {
      const date = new Date(dateStr.replace(' ', 'T'));
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  // Ensure category is always an array for mapping
  const categories = Array.isArray(article.category) ? article.category : [];
  const sourceName = article.source_name || 'News Source';

  return (
    <article className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden flex flex-col border border-slate-100 group h-full">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {article.image_url ? (
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/news/800/600';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-200">
            <i className="fa-solid fa-camera-retro text-6xl"></i>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {categories.map(cat => (
            <span key={cat} className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/20">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-1 bg-slate-50 rounded-lg border border-slate-100">
            <img 
              src={article.source_icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(sourceName)}&background=random`} 
              alt={sourceName}
              className="w-5 h-5 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(sourceName)}&background=random`;
              }}
            />
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-red-600 transition-colors">
            {sourceName}
          </span>
        </div>

        <a 
          href={article.link || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group/title"
        >
          <h2 className="font-serif text-2xl leading-tight text-slate-900 group-hover/title:text-red-700 transition-colors line-clamp-2 mb-4 decoration-red-500 decoration-2 underline-offset-4 hover:underline">
            {article.title || 'Untitled Article'}
          </h2>
        </a>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
          {article.description || 'No description available for this article.'}
        </p>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            <i className="fa-regular fa-clock"></i>
            {formatDate(article.pubDate)}
          </div>
          <a 
            href={article.link || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all group/btn"
          >
            <i className="fa-solid fa-arrow-right text-xs group-hover/btn:translate-x-0.5 transition-transform"></i>
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
