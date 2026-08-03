'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudinaryUpload } from './CloudinaryUpload';
import { insertRecord, updateRecord } from '@/lib/admin-actions';
import { DepartmentAuthority } from '@/lib/types';
import { RichTextEditor } from './RichTextEditor';

export function AuthorityForm({ initialData }: { initialData?: Partial<DepartmentAuthority> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get('full_name'),
      title: formData.get('title'),
      photo_url: formData.get('photo_url'),
      bio: formData.get('bio'),
      email: formData.get('email'),
      linkedin_url: formData.get('linkedin_url'),
      twitter_url: formData.get('twitter_url'),
      display_order: parseInt(formData.get('display_order') as string || '0', 10),
    };

    if (initialData?.id) {
      await updateRecord('department_authorities', initialData.id, data, '/admin/dashboard/authorities');
    } else {
      await insertRecord('department_authorities', data, '/admin/dashboard/authorities');
    }
    
    router.push('/admin/dashboard/authorities');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input required type="text" name="full_name" defaultValue={initialData?.full_name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title / Position</label>
          <input required type="text" name="title" defaultValue={initialData?.title} placeholder="e.g. Head of Department" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input type="number" name="display_order" defaultValue={initialData?.display_order ?? 0} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Optional)</label>
          <CloudinaryUpload
            folder="authorities"
            defaultValue={initialData?.photo_url ?? undefined}
            onUpload={(url) => {
              const input = document.getElementById('photo_url') as HTMLInputElement;
              if (input) input.value = url;
            }}
          />
          <input type="hidden" id="photo_url" name="photo_url" defaultValue={initialData?.photo_url ?? undefined} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" defaultValue={(initialData as any)?.email ?? undefined} placeholder="john@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
          <input type="url" name="linkedin_url" defaultValue={(initialData as any)?.linkedin_url ?? undefined} placeholder="https://linkedin.com/in/..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
          <input type="url" name="twitter_url" defaultValue={(initialData as any)?.twitter_url ?? undefined} placeholder="https://twitter.com/..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-itsa-navy" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Rich Text)</label>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <RichTextEditor
            value={(initialData as any)?.bio ?? ''}
            onChange={(html) => {
              const input = document.getElementById('bio') as HTMLInputElement;
              if (input) input.value = html;
            }}
          />
          <input type="hidden" id="bio" name="bio" defaultValue={(initialData as any)?.bio ?? ''} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Authority'}
        </button>
      </div>
    </form>
  );
}
