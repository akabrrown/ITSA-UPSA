'use client';

import { useState } from 'react';
import { AcademicResource } from '@/lib/types';
import { Folder, ChevronLeft, FileText } from 'lucide-react';

interface FolderViewProps {
  resources: AcademicResource[];
  theme: 'navy' | 'gold'; // To style differently for slides vs past questions
}

export function FolderView({ resources, theme }: FolderViewProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Group resources by course name (case-insensitive trim)
  const groupedResources = resources.reduce((acc, resource) => {
    const courseName = (resource.course || 'Uncategorized').trim().toUpperCase();
    if (!acc[courseName]) {
      acc[courseName] = [];
    }
    acc[courseName].push(resource);
    return acc;
  }, {} as Record<string, AcademicResource[]>);

  const courses = Object.keys(groupedResources).sort();

  const themeColors = {
    navy: {
      folderBg: 'bg-itsa-navy/5',
      folderText: 'text-itsa-navy',
      hoverBorder: 'hover:border-itsa-navy',
      iconHover: 'group-hover:text-itsa-navy',
      badgeBg: 'bg-itsa-navy/10',
    },
    gold: {
      folderBg: 'bg-itsa-gold/10',
      folderText: 'text-itsa-gold-dark',
      hoverBorder: 'hover:border-itsa-gold',
      iconHover: 'group-hover:text-itsa-gold-dark',
      badgeBg: 'bg-itsa-gold/20',
    }
  };

  const currentTheme = themeColors[theme];

  if (selectedCourse) {
    const files = groupedResources[selectedCourse];
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Folders
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentTheme.folderBg} ${currentTheme.folderText}`}>
            <Folder className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedCourse}</h2>
            <p className="text-sm text-gray-500">{files.length} {files.length === 1 ? 'file' : 'files'} available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map(resource => (
            <a 
              key={resource.id} 
              href={resource.file_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`group block bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all ${currentTheme.hoverBorder}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentTheme.folderBg} ${currentTheme.folderText}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span className={`text-gray-300 transition-colors ${currentTheme.iconHover}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{resource.title}</h3>
              <div className="flex gap-4 text-xs text-gray-500 font-medium mt-auto pt-4">
                <span>Level {resource.level}</span>
                {resource.file_size_kb && (
                  <>
                    <span>•</span>
                    <span>{Math.round(resource.file_size_kb / 1024)} MB</span>
                  </>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-300">
      {courses.map(course => {
        const fileCount = groupedResources[course].length;
        return (
          <button
            key={course}
            onClick={() => setSelectedCourse(course)}
            className={`group text-left bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all ${currentTheme.hoverBorder}`}
          >
            <div className="flex justify-between items-start mb-4">
              <Folder className={`w-10 h-10 ${currentTheme.folderText} fill-current/20 group-hover:fill-current/40 transition-colors`} />
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${currentTheme.badgeBg} ${currentTheme.folderText}`}>
                {fileCount} {fileCount === 1 ? 'file' : 'files'}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 truncate">{course}</h3>
          </button>
        );
      })}
    </div>
  );
}
