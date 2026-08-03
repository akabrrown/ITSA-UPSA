'use client';

import { useEffect, useState, use } from 'react';
import { AuthorityForm } from "@/components/admin/AuthorityForm";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: res } = await supabase.from('department_authorities').select('*').eq('id', resolvedParams.id).single();
      if (res) setData(res);
      setLoading(false);
    };
    fetchData();
  }, [resolvedParams.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading data...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Record not found.</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Department Authorities</h1>
        <p className="text-sm text-gray-500 mt-1">Update the details below.</p>
      </div>
      <AuthorityForm initialData={data} />
    </div>
  );
}
