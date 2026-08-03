'use client';

import { useEffect, useState, use } from 'react';
import { ExecutiveForm } from "@/components/admin/ExecutiveForm";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditExecutivePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [executive, setExecutive] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExecutive = async () => {
      const { data, error } = await supabase.from('itsa_executives').select('*').eq('id', resolvedParams.id).single();
      if (!error && data) {
        setExecutive(data);
      }
      setLoading(false);
    };
    fetchExecutive();
  }, [resolvedParams.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading executive data...</div>;
  if (!executive) return <div className="p-8 text-center text-red-500">Executive not found.</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Executive</h1>
        <p className="text-sm text-gray-500 mt-1">Update the details for this ITSA executive.</p>
      </div>
      <ExecutiveForm initialData={executive} />
    </div>
  );
}
