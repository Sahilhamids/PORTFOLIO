import * as cheerio from 'cheerio';
import { ArrowUpRight } from 'lucide-react';

interface LinkPreviewProps {
  url: string;
}

export default async function LinkPreview({ url }: LinkPreviewProps) {
  let metadata = {
    title: '',
    description: '',
    image: '',
    domain: '',
  };

  try {
    metadata.domain = new URL(url).hostname;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      
      metadata.title = $('meta[property="og:title"]').attr('content') || $('title').text() || metadata.domain;
      metadata.description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
      metadata.image = $('meta[property="og:image"]').attr('content') || '';
    }
  } catch (error) {
    console.error('Failed to fetch link preview metadata for:', url);
    metadata.domain = url;
  }

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block overflow-hidden bg-[#0a0a0f]/60 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 relative max-w-md w-full transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {metadata.image ? (
        <div className="relative h-40 w-full overflow-hidden border-b border-white/10 bg-black/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={metadata.image} 
            alt={metadata.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      ) : (
        <div className="h-1 w-full bg-cyan-500/30" />
      )}
      
      <div className="p-5 relative z-10">
        <h4 className="font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
          {metadata.title || "External Link"}
          <div className="overflow-hidden relative w-5 h-5 text-cyan-400 ml-2 flex-shrink-0">
             {/* Brutalist Diagonal Arrow Animation */}
             <ArrowUpRight className="w-5 h-5 absolute group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-300 ease-in-out" />
             <ArrowUpRight className="w-5 h-5 absolute -translate-x-5 translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </div>
        </h4>
        {metadata.description && (
          <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">{metadata.description}</p>
        )}
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">
          {metadata.domain}
        </div>
      </div>
    </a>
  );
}
