'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudinaryUpload } from './CloudinaryUpload';
import { RichTextEditor } from './RichTextEditor';
import { insertRecord, updateRecord } from '@/lib/admin-actions';
import { NewsPost } from '@/lib/types';

export function NewsForm({ initialData }: { initialData?: Partial<NewsPost> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const isPublished = formData.get('is_published') === 'true';
    
    const data = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      body: formData.get('body'),
      cover_image_url: formData.get('cover_image_url'),
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    if (initialData?.id) {
      await updateRecord('news_posts', initialData.id, data, '/admin/dashboard/news');
    } else {
      await insertRecord('news_posts', data, '/admin/dashboard/news');
    }
    
    router.push('/admin/dashboard/news');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input required type="text" name="title" defaultValue={initialData?.title} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Summary (Short Excerpt)</label>
          <textarea name="summary" defaultValue={initialData?.summary} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Story</label>
          <input type="hidden" id="body" name="body" defaultValue={initialData?.body || ''} />
          <RichTextEditor 
            value={initialData?.body || ''} 
            onChange={(html) => {
              const input = document.getElementById('body') as HTMLInputElement;
              if (input) input.value = html;
            }} 
          />
        </div>
        
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Publish Status</label>
          <select name="is_published" defaultValue={initialData?.is_published ? 'true' : 'false'} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy">
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <CloudinaryUpload
            folder="news"
            defaultValue={initialData?.cover_image_url}
            onUpload={(url) => {
              const input = document.getElementById('cover_image_url') as HTMLInputElement;
              if (input) input.value = url;
            }}
          />
          <input type="hidden" id="cover_image_url" name="cover_image_url" defaultValue={initialData?.cover_image_url} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
}
