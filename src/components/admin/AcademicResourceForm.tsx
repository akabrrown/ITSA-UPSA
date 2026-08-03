'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudinaryUpload, UploadedFile } from './CloudinaryUpload';
import { insertRecord, updateRecord } from '@/lib/admin-actions';
import { Layers, FileText } from 'lucide-react';

export function AcademicResourceForm({ initialData, existingCourses = [] }: { initialData?: any, existingCourses?: string[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  // Parse existing course string (e.g. "IT 101 - Introduction to IT")
  const initialCourseStr = initialData?.course || '';
  const parts = initialCourseStr.split(' - ');
  const initialCode = parts[0] || '';
  const initialTitle = parts.length > 1 ? parts.slice(1).join(' - ') : '';
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    resource_type: initialData?.resource_type || 'slide',
    courseCode: initialCode,
    courseTitle: initialTitle,
    level: initialData?.level || '100',
    file_url: initialData?.file_url || '',
  });

  const handleSelectExistingCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;
    const parts = val.split(' - ');
    setFormData({
      ...formData,
      courseCode: parts[0] || '',
      courseTitle: parts.length > 1 ? parts.slice(1).join(' - ') : ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBulkMode) {
      if (uploadedFiles.length === 0) {
        alert("Please upload at least one file for bulk upload.");
        return;
      }
    } else {
      if (!formData.file_url) {
        alert("Please upload a file.");
        return;
      }
    }
    
    setLoading(true);
    
    const combinedCourse = `${formData.courseCode.trim()} - ${formData.courseTitle.trim()}`;
    
    try {
      if (isBulkMode) {
        // Bulk Insert
        const promises = uploadedFiles.map(file => {
          return insertRecord('academic_resources', {
            title: file.original_filename, 
            resource_type: formData.resource_type,
            course: combinedCourse,
            level: formData.level,
            file_url: file.url,
          }, '/academic-bank');
        });
        await Promise.all(promises);
      } else {
        // Single Insert / Update
        const submitData = {
          title: formData.title,
          resource_type: formData.resource_type,
          course: combinedCourse,
          level: formData.level,
          file_url: formData.file_url,
        };
        
        if (initialData?.id) {
          await updateRecord('academic_resources', initialData.id, submitData, '/academic-bank');
        } else {
          await insertRecord('academic_resources', submitData, '/academic-bank');
        }
      }
      
      router.push('/admin/dashboard/academic-resources');
    } catch (error) {
      console.error(error);
      alert('Failed to save resource(s)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
      
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
            <FileText className="w-4 h-4" /> Single Upload
          </button>
          <button
            type="button"
            onClick={() => setIsBulkMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              isBulkMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Layers className="w-4 h-4" /> Bulk Upload
          </button>
        </div>
      )}

      {isBulkMode && (
        <div className="bg-blue-50/50 border border-blue-100 text-blue-800 p-4 rounded-xl text-sm mb-6">
          <strong>Bulk Upload Mode Active:</strong> You can select multiple documents at once. The system will automatically use the original filename as the document title for each record.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {!isBulkMode && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">File Name (Resource Title) *</label>
            <input 
              required={!isBulkMode} 
              type="text" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all"
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Resource Type *</label>
          <select 
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy focus:border-transparent outline-none transition-all bg-white"
            value={formData.resource_type} 
            onChange={(e) => setFormData({...formData, resource_type: e.target.value})}
          >
            <option value="slide">Lecture Slide</option>
            <option value="past_question">Past Question</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 mt-4">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Course Details (Folder Name)</h3>
        
        {existingCourses.length > 0 && (
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Quick Select Existing Folder</label>
            <select 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none bg-gray-50 text-gray-600"
              onChange={handleSelectExistingCourse}
              defaultValue=""
            >
              <option value="" disabled>-- Select a folder to auto-fill --</option>
              {existingCourses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Course Code *</label>
            <input 
              required
              type="text" 
              placeholder="e.g. IT 101"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none transition-all"
              value={formData.courseCode} 
              onChange={(e) => setFormData({...formData, courseCode: e.target.value})} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Course Title *</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Intro to IT"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none transition-all"
              value={formData.courseTitle} 
              onChange={(e) => setFormData({...formData, courseTitle: e.target.value})} 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Level *</label>
            <select 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-itsa-navy outline-none transition-all bg-white"
              value={formData.level} 
              onChange={(e) => setFormData({...formData, level: e.target.value})}
            >
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-6 border-t border-gray-100">
        <label className="text-sm font-medium text-gray-700">
          {isBulkMode ? 'Resource Files (PDF/Doc/PPT) *' : 'Resource File (PDF/Doc/PPT) *'}
        </label>
        <CloudinaryUpload 
          defaultValue={formData.file_url} 
          onUpload={(url) => setFormData({...formData, file_url: url})} 
          onUploadMultiple={(files) => setUploadedFiles(files)}
          label={isBulkMode ? "Select Multiple Files" : "Upload Document"}
          isPdf={true}
          multiple={isBulkMode}
        />
      </div>

      <div className="pt-6 flex justify-end gap-3 border-t border-gray-100 mt-6">
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
          {loading ? 'Saving...' : (isBulkMode ? `Upload ${uploadedFiles.length} Resources` : (initialData ? 'Save Changes' : 'Upload Resource'))}
        </button>
      </div>

    </form>
  );
}
