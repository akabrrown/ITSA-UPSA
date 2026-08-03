'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudinaryUpload } from './CloudinaryUpload';
import { insertRecord, updateRecord } from '@/lib/admin-actions';
import { BannerSlide } from '@/lib/types';

export function BannerForm({ initialData }: { initialData?: Partial<BannerSlide> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      image_url: formData.get('image_url'),
      headline: formData.get('headline'),
      link_url: formData.get('link_url'),
      display_order: parseInt(formData.get('display_order') as string || '0', 10),
      is_active: formData.get('is_active') === 'true',
    };

    if (initialData?.id) {
      await updateRecord('banner_slides', initialData.id, data, '/admin/dashboard/banners');
    } else {
      await insertRecord('banner_slides', data, '/admin/dashboard/banners');
    }
    
    router.push('/admin/dashboard/banners');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image (Required)</label>
          <CloudinaryUpload
            folder="banners"
            defaultValue={initialData?.image_url}
            onUpload={(url) => {
              const input = document.getElementById('image_url') as HTMLInputElement;
              if (input) input.value = url;
            }}
          />
          <input required type="hidden" id="image_url" name="image_url" defaultValue={initialData?.image_url} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline Text (Optional)</label>
          <input type="text" name="headline" defaultValue={initialData?.headline} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Call to Action Link (Optional)</label>
          <input type="url" name="link_url" defaultValue={initialData?.link_url} placeholder="e.g. https://..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input type="number" name="display_order" defaultValue={initialData?.display_order ?? 0} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="is_active" defaultValue={initialData?.is_active !== false ? 'true' : 'false'} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy">
            <option value="true">Active (Visible)</option>
            <option value="false">Hidden</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Banner'}
        </button>
      </div>
    </form>
  );
}
