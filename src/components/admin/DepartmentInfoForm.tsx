'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from './RichTextEditor';
import { insertRecord, updateRecord } from '@/lib/admin-actions';
import { DepartmentInfo } from '@/lib/types';

export function DepartmentInfoForm({ initialData }: { initialData?: Partial<DepartmentInfo> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      description: formData.get('description'),
      mission: formData.get('mission'),
    };

    if (initialData?.id) {
      await updateRecord('department_info', initialData.id, data, '/admin/dashboard/department-info');
    } else {
      await insertRecord('department_info', data, '/admin/dashboard/department-info');
    }
    
    router.push('/admin/dashboard/department-info');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department Description / About</label>
          <input type="hidden" id="description" name="description" defaultValue={initialData?.description || ''} />
          <RichTextEditor 
            value={initialData?.description || ''} 
            onChange={(html) => {
              const input = document.getElementById('description') as HTMLInputElement;
              if (input) input.value = html;
            }} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mission / Vision</label>
          <input type="hidden" id="mission" name="mission" defaultValue={initialData?.mission || ''} />
          <RichTextEditor 
            value={initialData?.mission || ''} 
            onChange={(html) => {
              const input = document.getElementById('mission') as HTMLInputElement;
              if (input) input.value = html;
            }} 
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Info'}
        </button>
      </div>
    </form>
  );
}
