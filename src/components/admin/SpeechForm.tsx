'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudinaryUpload } from './CloudinaryUpload';
import { RichTextEditor } from './RichTextEditor';
import { insertRecord, updateRecord } from '@/lib/admin-actions';
import { PresidentSpeech } from '@/lib/types';

export function SpeechForm({ initialData }: { initialData?: Partial<PresidentSpeech> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      title: formData.get('title'),
      message: formData.get('message'),
      video_url: formData.get('video_url'),
      photo_url: formData.get('photo_url'),
    };

    if (initialData?.id) {
      await updateRecord('president_speech', initialData.id, data, '/admin/dashboard/speech');
    } else {
      await insertRecord('president_speech', data, '/admin/dashboard/speech');
    }
    
    router.push('/admin/dashboard/speech');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">President Name</label>
          <input required type="text" name="name" defaultValue={initialData?.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input required type="text" name="title" defaultValue={initialData?.title} placeholder="e.g. ITSA President 2026/2027" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">President Photo</label>
          <CloudinaryUpload
            folder="speech"
            defaultValue={initialData?.photo_url}
            onUpload={(url) => {
              const input = document.getElementById('photo_url') as HTMLInputElement;
              if (input) input.value = url;
            }}
          />
          <input type="hidden" id="photo_url" name="photo_url" defaultValue={initialData?.photo_url} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Speech Message (Rich Text)</label>
          <input type="hidden" id="message" name="message" defaultValue={initialData?.message || ''} />
          <RichTextEditor 
            content={initialData?.message || ''} 
            onChange={(html) => {
              const input = document.getElementById('message') as HTMLInputElement;
              if (input) input.value = html;
            }} 
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Video Speech URL (Optional)</label>
          <input type="url" name="video_url" defaultValue={initialData?.video_url} placeholder="YouTube/Vimeo link" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Speech'}
        </button>
      </div>
    </form>
  );
}
