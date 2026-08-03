'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { deleteRecord } from '@/lib/admin-actions';
import { createClient } from '@supabase/supabase-js';
import { NewsPost } from '@/lib/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function NewsPostPage() {
  const [data, setData] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data: res } = await supabase.from('news_posts').select('*').order('created_at', { ascending: false }).limit(100);
    if (res) setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this?')) {
      await deleteRecord('news_posts', id, '/admin/dashboard/news');
      fetchData();
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' as const },
    { header: 'Status', accessor: ((item: NewsPost) => item.is_published ? 'Published' : 'Draft') },
  ];

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">News & Posts</h1>
        <Link 
          href="/admin/dashboard/news/new" 
          className="px-4 py-2 bg-itsa-navy text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable 
          data={data as any} 
          columns={columns as any} 
          onDelete={handleDelete}
          editLinkPrefix="/admin/dashboard/news"
        />
      </div>
    </div>
  );
}