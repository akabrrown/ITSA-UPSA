'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { deleteRecord } from '@/lib/admin-actions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ExecutivesPage() {
  const [executives, setExecutives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExecutives = async () => {
    const { data, error } = await supabase.from('itsa_executives').select('*').order('display_order', { ascending: true });
    if (!error && data) {
      setExecutives(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExecutives();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteRecord('itsa_executives', id, '/about');
      setExecutives(executives.filter(e => e.id !== id));
    } catch (error) {
      alert('Failed to delete executive.');
    }
  };

  const columns = [
    { header: 'Name', accessor: 'full_name' as any },
    { header: 'Position', accessor: 'position' as any },
    { 
      header: 'Photo', 
      accessor: ((item: any) => (
        item.photo_url 
          ? <img src={item.photo_url} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
          : <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">?</div>
      )) as any 
    },
    { header: 'Order', accessor: 'display_order' as any },
  ];

  if (loading) return <div className="p-8 text-center text-gray-500">Loading executives...</div>;

  return (
    <div className="p-4 md:p-8">
      <DataTable 
        title="ITSA Executives"
        description="Manage the current ITSA executive board members."
        data={executives}
        columns={columns}
        createLink="/admin/dashboard/executives/new"
        createText="Add Executive"
        editLinkPrefix="/admin/dashboard/executives"
        onDelete={handleDelete}
      />
    </div>
  );
}
