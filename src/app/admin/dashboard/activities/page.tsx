'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { deleteRecord } from '@/lib/admin-actions';
import { createClient } from '@supabase/supabase-js';

import { Activity } from '@/lib/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    const { data, error } = await supabase.from('activities').select('*').order('start_date', { ascending: false });
    if (!error && data) {
      setActivities(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteRecord('activities', id, '/activities');
      setActivities(activities.filter(a => a.id !== id));
    } catch (error) {
      alert('Failed to delete activity.');
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' as const },
    { 
      header: 'Date', 
      accessor: ((item: Activity) => new Date(item.start_date).toLocaleDateString())
    },
    { 
      header: 'Status', 
      accessor: ((item: Activity) => (
        <span className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${item.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {item.status}
        </span>
      ))
    },
    { header: 'Venue', accessor: 'venue' as const },
  ];

  if (loading) return <div className="p-8 text-center text-gray-500">Loading activities...</div>;

  return (
    <div className="p-4 md:p-8">
      <DataTable 
        title="Activities & Events"
        description="Manage all ITSA events, workshops, and seminars."
        data={activities}
        columns={columns as any}
        createLink="/admin/dashboard/activities/new"
        createText="Add Activity"
        editLinkPrefix="/admin/dashboard/activities"
        onDelete={handleDelete}
      />
    </div>
  );
}
