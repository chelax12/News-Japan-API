
import React, { useState, useEffect, useMemo } from 'react';
import { NewsArticle, Category } from './types';
import { RAW_NEWS_DATA } from './data/news';
import NewsCard from './components/NewsCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SourceConfig from './components/SourceConfig';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  useEffect(() => {
    const savedData = localStorage.getItem('accumulated_news_data');
    if (savedData) {
      try {
        setNews(JSON.parse(savedData));
      } catch (e) {
        setNews(RAW_NEWS_DATA);
      }
    } else {
      setNews(RAW_NEWS_DATA);
    }
    setLoading(false);
  }, []);

  const handleAddJson = (jsonStr: string) => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonStr);
      let incomingArticles: NewsArticle[] = [];

      if (Array.isArray(parsed)) {
        incomingArticles = parsed;
      } else if (parsed && typeof parsed === 'object') {
        incomingArticles = [parsed as NewsArticle];
      } else {
        throw new Error("Invalid format. Please provide a news object or an array.");
      }

      setNews(prevNews => {
        const existingIds = new Set(prevNews.map(a => a.article_id));
        const newUniqueArticles = incomingArticles.filter(a => !existingIds.has(a.article_id));
        const updatedNews = [...newUniqueArticles, ...prevNews];
        localStorage.setItem('accumulated_news_data', JSON.stringify(updatedNews));
        return updatedNews;
      });
    } catch (err: any) {
      setError(err.message || 'Failed to parse the provided JSON data.');
    }
  };

  const handleReset = () => {
    if (window.confirm("This will clear all added news and restore the original feed. Continue?")) {
      localStorage.removeItem('accumulated_news_data');
      setNews(RAW_NEWS_DATA);
      setError(null);
    }
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    news.forEach(article => {
      if (article.category && Array.isArray(article.category)) {
        article.category.forEach(cat => cats.add(cat));
      }
    });
    return ['All', ...Array.from(cats)].sort();
  }, [news]);

  const filteredNews = useMemo(() => {
    return news.filter(article => {
      const title = article.title || '';
      const desc = article.description || '';
      const cats = article.category || [];

      const matchesSearch = 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        cats.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [news, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      <SourceConfig 
        onApplyJson={handleAddJson} 
        onReset={handleReset} 
      />

      {/* Hero Header */}
      <header className="news-gradient text-white pb-16 pt-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
               <i className="fa-solid fa-sun text-2xl text-red-600 animate-pulse"></i>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-none mb-1">
                JAPAN <span className="text-red-500">INSIGHT</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 opacity-80">
                Premium News Aggregator • Daily Headlines
              </p>
            </div>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      {/* Content Area */}
      <main className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
        {/* Filters Panel */}
        <section className="bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl shadow-slate-200/50 mb-12 border border-white">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </section>

        {error && (
          <div className="bg-red-900/10 border border-red-200 backdrop-blur-sm rounded-2xl p-6 text-center max-w-md mx-auto mb-10 animate-in slide-in-from-top">
            <i className="fa-solid fa-circle-exclamation text-red-600 text-2xl mb-2"></i>
            <h3 className="text-red-900 font-bold mb-1">Import Error</h3>
            <p className="text-red-700 text-xs">{error}</p>
          </div>
        )}

        {/* News Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Curating latest stories...</p>
          </div>
        ) : (
          <>
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredNews.map((article) => (
                  <NewsCard key={article.article_id || `article-${Math.random()}`} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white/40 border-2 border-dashed border-slate-300 rounded-[3rem] backdrop-blur-sm shadow-inner">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <i className="fa-solid fa-ghost text-slate-300 text-4xl"></i>
                </div>
                <h3 className="text-slate-900 font-serif font-bold text-3xl mb-4 italic">Quiet Newsroom</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium leading-relaxed">
                  We couldn't find any articles matching your search criteria. Try adding fresh JSON data or clearing your filters.
                </p>
                <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="mt-10 bg-slate-900 text-white text-xs font-black uppercase tracking-widest px-10 py-4 rounded-full hover:bg-black transition-all shadow-xl"
                  >
                    Clear All Filters
                </button>
              </div>
            )}
          </>
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
