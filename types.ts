
export interface NewsArticle {
  article_id: string;
  link: string;
  title: string;
  description: string;
  content: string;
  keywords: string[];
  creator: string[];
  language: string;
  country: string[];
  category: string[];
  datatype: string;
  pubDate: string;
  pubDateTZ: string;
  fetched_at: string;
  image_url: string | null;
  video_url: string | null;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  source_icon: string;
}

export type Category = 'All' | string;
