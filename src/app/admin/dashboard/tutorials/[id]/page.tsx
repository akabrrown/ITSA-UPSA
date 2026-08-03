import { use } from 'react';
import { TutorialForm } from '@/components/admin/TutorialForm';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditTutorialPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Tutorials</h1>
        <p className="text-sm text-gray-500 mt-1">Update the details below.</p>
      </div>
      
      {/* Client component to fetch data and render form */}
      <DataFetcher id={resolvedParams.id} />
    </div>
  );
}

// Client wrapper to fetch the data
'use client';
import { useState, useEffect } from 'react';
import { Tutorial } from '@/lib/types';

function DataFetcher({ id }: { id: string }) {
  const [data, setData] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: res } = await supabase.from('tutorials').select('*').eq('id', id).single();
      if (res) setData(res);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <div className="py-12 text-center text-gray-500">Loading data...</div>;
  if (!data) return <div className="py-12 text-center text-red-500">Record not found.</div>;

  return <TutorialForm initialData={data} />;
}
