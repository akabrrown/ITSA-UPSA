'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudinaryUpload } from './CloudinaryUpload';
import { RichTextEditor } from './RichTextEditor';
import { insertRecord, updateRecord } from '@/lib/admin-actions';

import { Activity } from '@/lib/types';

export function ActivityForm({ initialData }: { initialData?: Partial<Activity> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    cover_image_url: initialData?.cover_image_url || '',
    venue: initialData?.venue || '',
    start_date: initialData?.start_date ? new Date(initialData.start_date).toISOString().slice(0, 16) : '',
    status: initialData?.status || 'upcoming',
    rsvp_link: initialData?.rsvp_link || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateRecord('activities', initialData.id, formData, '/activities');
      } else {
        await insertRecord('activities', formData, '/activities');
      }
      router.push('/admin/dashboard/activities');
    } catch (error) {
      console.error(error);
      alert('Failed to save activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Activity Title *</label>
          <input 
            required 
            type="text" 
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select 
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all bg-white"
            value={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.value as 'upcoming' | 'past'})}
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Start Date & Time *</label>
          <input 
            required 
            type="datetime-local" 
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.start_date} 
            onChange={(e) => setFormData({...formData, start_date: e.target.value})} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Venue</label>
          <input 
            type="text" 
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.venue} 
            onChange={(e) => setFormData({...formData, venue: e.target.value})} 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">RSVP Link (Optional)</label>
        <input 
          type="url" 
          placeholder="https://forms.gle/..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
          value={formData.rsvp_link} 
          onChange={(e) => setFormData({...formData, rsvp_link: e.target.value})} 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Cover Image</label>
        <CloudinaryUpload 
          defaultValue={formData.cover_image_url} 
          onUpload={(url) => setFormData({...formData, cover_image_url: url})} 
          label="Upload Cover Image"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <RichTextEditor 
          value={formData.description} 
          onChange={(val) => setFormData({...formData, description: val})} 
        />
      </div>

      <div className="pt-4 flex justify-end gap-3">
        <button 
          type="button" 
          onClick={() => router.back()} 
          className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="px-5 py-2.5 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-itsa-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? 'Saving...' : (initialData ? 'Save Changes' : 'Create Activity')}
        </button>
      </div>

    </form>
  );
}
