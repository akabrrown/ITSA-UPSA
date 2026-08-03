'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudinaryUpload } from './CloudinaryUpload';
import { RichTextEditor } from './RichTextEditor';
import { insertRecord, updateRecord } from '@/lib/admin-actions';

export function ExecutiveForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: initialData?.full_name || '',
    position: initialData?.position || '',
    photo_url: initialData?.photo_url || '',
    bio: initialData?.bio || '',
    social_link: initialData?.social_link || '',
    email: initialData?.email || '',
    linkedin_url: initialData?.linkedin_url || '',
    twitter_url: initialData?.twitter_url || '',
    instagram_url: initialData?.instagram_url || '',
    display_order: initialData?.display_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateRecord('itsa_executives', initialData.id, formData, '/about');
      } else {
        await insertRecord('itsa_executives', formData, '/about');
      }
      router.push('/admin/dashboard/executives');
    } catch (error) {
      console.error(error);
      alert('Failed to save executive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name *</label>
          <input 
            required 
            type="text" 
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.full_name} 
            onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Position / Title *</label>
          <input 
            required 
            type="text" 
            placeholder="e.g. President"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.position} 
            onChange={(e) => setFormData({...formData, position: e.target.value})} 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input 
            type="url" 
            placeholder="https://linkedin.com/in/..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.linkedin_url} 
            onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Twitter URL</label>
          <input 
            type="url" 
            placeholder="https://twitter.com/..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.twitter_url} 
            onChange={(e) => setFormData({...formData, twitter_url: e.target.value})} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Instagram URL</label>
          <input 
            type="url" 
            placeholder="https://instagram.com/..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.instagram_url} 
            onChange={(e) => setFormData({...formData, instagram_url: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Display Order</label>
          <input 
            type="number" 
            min="0"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
            value={formData.display_order} 
            onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})} 
          />
          <p className="text-xs text-gray-500">Lower numbers appear first (e.g. 0 for President, 1 for VP)</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Profile Photo</label>
        <CloudinaryUpload 
          defaultValue={formData.photo_url} 
          onUpload={(url) => setFormData({...formData, photo_url: url})} 
          label="Upload Portrait"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Detailed Bio</label>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <RichTextEditor
            content={formData.bio}
            onChange={(html) => setFormData({...formData, bio: html})}
          />
        </div>
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
          {loading ? 'Saving...' : (initialData ? 'Save Changes' : 'Create Executive')}
        </button>
      </div>

    </form>
  );
}
