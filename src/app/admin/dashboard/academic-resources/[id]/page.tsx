'use client';

import { useEffect, useState, use } from 'react';
import { AcademicResourceForm } from "@/components/admin/AcademicResourceForm";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [resource, setResource] = useState<any>(null);
  const [existingCourses, setExistingCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [resourceRes, coursesRes] = await Promise.all([
        supabase.from('academic_resources').select('*').eq('id', resolvedParams.id).single(),
        supabase.from('academic_resources').select('course')
      ]);

      if (!resourceRes.error && resourceRes.data) {
        setResource(resourceRes.data);
      }
      
      if (!coursesRes.error && coursesRes.data) {
        const unique = Array.from(new Set(coursesRes.data.map(r => r.course))).sort();
        setExistingCourses(unique);
      }

      setLoading(false);
    };
    fetchData();
  }, [resolvedParams.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading resource data...</div>;
  if (!resource) return <div className="p-8 text-center text-red-500">Resource not found.</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Resource</h1>
        <p className="text-sm text-gray-500 mt-1">Update the details for this academic resource.</p>
      </div>
      <AcademicResourceForm initialData={resource} existingCourses={existingCourses} />
    </div>
  );
}
