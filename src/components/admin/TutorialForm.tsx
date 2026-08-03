'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudinaryUpload } from './CloudinaryUpload';
import { insertRecord, updateRecord } from '@/lib/admin-actions';
import { Tutorial } from '@/lib/types';
import { Layers, FileText, Plus, Trash2 } from 'lucide-react';

interface BulkVideo {
  title: string;
  video_url: string;
}

export function TutorialForm({ initialData }: { initialData?: Partial<Tutorial> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  
  const [bulkVideos, setBulkVideos] = useState<BulkVideo[]>([
    { title: '', video_url: '' }
  ]);

  const addBulkRow = () => {
    setBulkVideos([...bulkVideos, { title: '', video_url: '' }]);
  };

  const removeBulkRow = (index: number) => {
    setBulkVideos(bulkVideos.filter((_, i) => i !== index));
  };

  const updateBulkRow = (index: number, field: keyof BulkVideo, value: string) => {
    const newVideos = [...bulkVideos];
    newVideos[index][field] = value;
    setBulkVideos(newVideos);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const sharedData = {
      course: formData.get('course'),
      level: formData.get('level'),
      lecturer_name: formData.get('lecturer_name'),
      is_published: formData.get('is_published') === 'true',
    };

    try {
      if (isBulkMode) {
        // Validate bulk videos
        const validVideos = bulkVideos.filter(v => v.title && v.video_url);
        if (validVideos.length === 0) {
          alert("Please add at least one valid video with a title and URL.");
          setLoading(false);
          return;
        }
        
        const promises = validVideos.map(video => {
          return insertRecord('tutorials', {
            ...sharedData,
            title: video.title,
            video_url: video.video_url,
          }, '/admin/dashboard/tutorials');
        });
        
        await Promise.all(promises);
      } else {
        const data = {
          ...sharedData,
          title: formData.get('title'),
          description: formData.get('description'),
          video_url: formData.get('video_url'),
          thumbnail_url: formData.get('thumbnail_url'),
        };

        if (initialData?.id) {
          await updateRecord('tutorials', initialData.id, data, '/admin/dashboard/tutorials');
        } else {
          await insertRecord('tutorials', data, '/admin/dashboard/tutorials');
        }
      }
      
      router.push('/admin/dashboard/tutorials');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to save tutorial(s)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      
      {/* Mode Toggle */}
      {!initialData?.id && (
        <div className="flex p-1 bg-gray-100 rounded-lg w-fit mb-6">
          <button
            type="button"
            onClick={() => setIsBulkMode(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              !isBulkMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-4 h-4" /> Single Entry
          </button>
          <button
            type="button"
            onClick={() => setIsBulkMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              isBulkMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Layers className="w-4 h-4" /> Bulk Entry
          </button>
        </div>
      )}

      {isBulkMode && (
        <div className="bg-blue-50/50 border border-blue-100 text-blue-800 p-4 rounded-xl text-sm mb-6">
          <strong>Bulk Entry Mode Active:</strong> Add multiple YouTube links at once. Shared fields (Course, Level, Lecturer) will be applied to all uploaded videos.
        </div>
      )}

      {/* Shared Fields Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-gray-50/50 rounded-xl border border-gray-100 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Code (Optional)</label>
          <input type="text" name="course" defaultValue={initialData?.course} className="w-full px-4 py-2 border border-gray-200 bg-white rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level (Optional)</label>
          <input type="text" name="level" defaultValue={initialData?.level} placeholder="e.g. 100" className="w-full px-4 py-2 border border-gray-200 bg-white rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer Name (Optional)</label>
          <input type="text" name="lecturer_name" defaultValue={initialData?.lecturer_name} className="w-full px-4 py-2 border border-gray-200 bg-white rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publish Status</label>
          <select name="is_published" defaultValue={initialData?.is_published !== false ? 'true' : 'false'} className="w-full px-4 py-2 border border-gray-200 bg-white rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none">
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
      </div>

      {isBulkMode ? (
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-900 mb-2">Video Links</label>
          {bulkVideos.map((video, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="w-6 h-6 bg-itsa-navy text-white text-xs font-bold flex items-center justify-center rounded-full shrink-0">
                {idx + 1}
              </span>
              <input 
                type="text" 
                placeholder="Video Title *" 
                required 
                className="w-full sm:w-1/3 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-itsa-navy"
                value={video.title}
                onChange={(e) => updateBulkRow(idx, 'title', e.target.value)}
              />
              <input 
                type="url" 
                placeholder="YouTube URL *" 
                required 
                className="w-full flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-itsa-navy"
                value={video.video_url}
                onChange={(e) => updateBulkRow(idx, 'video_url', e.target.value)}
              />
              {bulkVideos.length > 1 && (
                <button type="button" onClick={() => removeBulkRow(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={addBulkRow}
            className="flex items-center gap-2 text-sm font-medium text-itsa-navy hover:text-itsa-navy-dark mt-2 px-2 py-1 rounded-md hover:bg-itsa-navy/5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Another Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input required type="text" name="title" defaultValue={initialData?.title} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" defaultValue={initialData?.description} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube/Vimeo) *</label>
            <input required type="url" name="video_url" defaultValue={initialData?.video_url} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Custom Thumbnail (Optional)</label>
            <CloudinaryUpload
              folder="tutorials"
              defaultValue={initialData?.thumbnail_url}
              onUpload={(url) => {
                const input = document.getElementById('thumbnail_url') as HTMLInputElement;
                if (input) input.value = url;
              }}
            />
            <input type="hidden" id="thumbnail_url" name="thumbnail_url" defaultValue={initialData?.thumbnail_url} />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2.5 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 shadow-sm">
          {loading ? 'Saving...' : (isBulkMode ? `Save ${bulkVideos.length} Videos` : 'Save Tutorial')}
        </button>
      </div>
    </form>
  );
}
