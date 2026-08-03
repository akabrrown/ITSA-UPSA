'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tutorial } from '@/lib/types';
import { Play, X } from 'lucide-react';

export function TutorialsView({ tutorials }: { tutorials: Tutorial[] }) {
  const [activeVideo, setActiveVideo] = useState<Tutorial | null>(null);

  // Helper to extract YouTube video ID and convert to embed URL
  const getEmbedUrl = (url: string) => {
    let videoId = '';
    try {
      if (url.includes('youtube.com/watch')) {
        videoId = new URL(url).searchParams.get('v') || '';
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url; // Fallback if not standard YT
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorials.map((tutorial) => (
          <button 
            key={tutorial.id} 
            onClick={() => setActiveVideo(tutorial)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group text-left w-full h-full"
          >
            <div className="relative aspect-video bg-gray-100 w-full">
              {tutorial.thumbnail_url ? (
                <Image 
                  src={tutorial.thumbnail_url} 
                  alt={tutorial.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-itsa-navy/5">
                  <Play className="w-12 h-12 text-itsa-navy/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-itsa-navy ml-1" />
                </div>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 w-full">
              <div className="flex gap-2 mb-3 flex-wrap">
                {tutorial.course && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-itsa-navy bg-itsa-navy/5 px-2 py-1 rounded">
                    {tutorial.course}
                  </span>
                )}
                {tutorial.level && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-itsa-gold-dark bg-itsa-gold/10 px-2 py-1 rounded">
                    Level {tutorial.level}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{tutorial.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 w-full">
                <span className="text-xs text-gray-500 font-medium">{tutorial.lecturer_name || "Guest Lecturer"}</span>
                <span className="text-sm font-semibold text-itsa-navy group-hover:text-itsa-gold transition-colors flex items-center gap-1">
                  Watch now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10 pointer-events-none">
              <h3 className="text-white font-medium text-lg drop-shadow-md truncate pr-12">{activeVideo.title}</h3>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-colors pointer-events-auto"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="w-full aspect-video bg-black flex-shrink-0 relative">
              <iframe 
                src={getEmbedUrl(activeVideo.video_url)} 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Footer / Description */}
            <div className="p-4 sm:p-6 bg-gray-900 overflow-y-auto pointer-events-auto shrink-0 border-t border-white/10">
              <div className="flex gap-2 mb-2">
                {activeVideo.course && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                    {activeVideo.course}
                  </span>
                )}
                {activeVideo.level && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
                    Level {activeVideo.level}
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm">{activeVideo.description || 'No description provided.'}</p>
              {activeVideo.lecturer_name && (
                <p className="text-gray-400 text-xs mt-3">Instructor: {activeVideo.lecturer_name}</p>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
