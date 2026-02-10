import React, { useState, useEffect, useMemo } from 'react';
import { NewsArticle } from './types';
import { RAW_NEWS_DATA } from './data/news';
import NewsCard from './components/NewsCard';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load only the top 5 news articles
    setNews(RAW_NEWS_DATA.slice(0, 5));
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <header className="news-gradient text-white pb-24 pt-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl transform rotate-[-5deg]">
               <i className="fa-solid fa-sun text-4xl text-red-600"></i>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-none">
                Top News in Japan
              </h1>
            </div>
          </div>
          <p className="text-sm font-medium max-w-lg text-slate-300">
            A curated selection of the latest and most important headlines emerging from Japan.
          </p>
        </div>
      </header>

      {/* Content Area */}
      <main className="container mx-auto px-4 -mt-16 relative z-20 pb-24">
        {/* News Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Top Stories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((article) => (
              <NewsCard key={article.article_id || `article-${Math.random()}`} article={article} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="w-10 h-1 bg-red-600 mb-8"></div>
          <h3 className="font-serif text-2xl mb-4 italic tracking-wide">Stay informed. Stay ahead.</h3>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-12">
            Japan Insight • Premium Editorial Aggregator
          </p>
          <div className="flex gap-8 text-slate-500 text-lg mb-12">
            <i className="fa-brands fa-x-twitter hover:text-white transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-instagram hover:text-white transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-linkedin hover:text-white transition-colors cursor-pointer"></i>
          </div>
          <p className="text-slate-600 text-[10px] font-medium tracking-widest">
            &copy; {new Date().getFullYear()} REFINED MEDIA GROUP. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
