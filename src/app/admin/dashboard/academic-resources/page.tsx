'use client';

import { useEffect, useState } from 'react';
import { deleteRecord } from '@/lib/admin-actions';
import { createClient } from '@supabase/supabase-js';
import { Folder, FileText, ChevronLeft, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AcademicResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const fetchResources = async () => {
    const { data, error } = await supabase.from('academic_resources').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setResources(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    try {
      await deleteRecord('academic_resources', id, '/academic-bank');
      setResources(resources.filter(r => r.id !== id));
      
      // If folder becomes empty, close it
      const remainingInFolder = resources.filter(r => r.id !== id && r.course === selectedFolder);
      if (remainingInFolder.length === 0) {
        setSelectedFolder(null);
      }
    } catch (error) {
      alert('Failed to delete resource.');
    }
  };

  // Group by folder (course)
  const grouped = resources.reduce((acc, r) => {
    const folder = (r.course || 'Uncategorized').trim();
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(r);
    return acc;
  }, {} as Record<string, any[]>);

  const folders = Object.keys(grouped).sort();

  if (loading) return <div className="p-8 text-center text-gray-500">Loading resources...</div>;

  if (selectedFolder) {
    const files = grouped[selectedFolder] || [];
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button 
              onClick={() => setSelectedFolder(null)}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Folders
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-itsa-navy/10 flex items-center justify-center text-itsa-navy">
                <Folder className="w-5 h-5 fill-current" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedFolder}</h1>
            </div>
            <p className="text-sm text-gray-500 mt-2 ml-14">{files.length} {files.length === 1 ? 'file' : 'files'} in this folder</p>
          </div>
          <Link 
            href="/admin/dashboard/academic-resources/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-itsa-navy-dark transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Files to Folder
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-900">
              <tr>
                <th className="px-6 py-4 font-semibold">File Name</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Level</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {files.map((file: any) => (
                <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-900 line-clamp-1">{file.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${file.resource_type === 'slide' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {file.resource_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">Level {file.level}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-itsa-navy hover:underline">View</a>
                    <Link href={`/admin/dashboard/academic-resources/${file.id}/edit`} className="text-sm font-medium text-itsa-navy hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(file.id)} className="text-sm font-medium text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Bank Folders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage course materials by folder. Click a folder to edit or delete files.</p>
        </div>
        <Link 
          href="/admin/dashboard/academic-resources/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-itsa-navy rounded-lg hover:bg-itsa-navy-dark transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create / Upload
        </Link>
      </div>

      {folders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map(folder => {
            const count = grouped[folder].length;
            return (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className="group text-left bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-itsa-navy transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <Folder className="w-10 h-10 text-itsa-navy fill-current/10 group-hover:fill-current/30 transition-colors" />
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-itsa-navy/10 group-hover:text-itsa-navy transition-colors">
                    {count} {count === 1 ? 'file' : 'files'}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 truncate" title={folder}>{folder}</h3>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-12 text-center border border-gray-100">
          <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No folders yet</h3>
          <p className="text-gray-500 mb-6">Upload some academic resources to automatically generate course folders.</p>
          <Link 
            href="/admin/dashboard/academic-resources/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-itsa-navy bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
