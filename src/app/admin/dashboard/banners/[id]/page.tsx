import { use } from 'react';
import { BannerForm } from '@/components/admin/BannerForm';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditBannerSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Banner Slides</h1>
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
import { BannerSlide } from '@/lib/types';

function DataFetcher({ id }: { id: string }) {
  const [data, setData] = useState<BannerSlide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: res } = await supabase.from('banner_slides').select('*').eq('id', id).single();
      if (res) setData(res);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <div className="py-12 text-center text-gray-500">Loading data...</div>;
  if (!data) return <div className="py-12 text-center text-red-500">Record not found.</div>;

  return <BannerForm initialData={data} />;
}
