'use client';

import { useEffect, useState, use } from 'react';
import { ActivityForm } from "@/components/admin/ActivityForm";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      const { data, error } = await supabase.from('activities').select('*').eq('id', resolvedParams.id).single();
      if (!error && data) {
        setActivity(data);
      }
      setLoading(false);
    };
    fetchActivity();
  }, [resolvedParams.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading activity data...</div>;
  if (!activity) return <div className="p-8 text-center text-red-500">Activity not found.</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Activity</h1>
        <p className="text-sm text-gray-500 mt-1">Update the details for this event or activity.</p>
      </div>
      <ActivityForm initialData={activity} />
    </div>
  );
}
