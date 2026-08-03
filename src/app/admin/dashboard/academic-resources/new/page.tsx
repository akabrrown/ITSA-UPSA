import { AcademicResourceForm } from "@/components/admin/AcademicResourceForm";
import { createClient } from "@/lib/supabase/server";

export default async function NewResourcePage() {
  const supabase = await createClient();
  const { data } = await supabase.from('academic_resources').select('course');
  
  // Extract unique courses
  const uniqueCourses = Array.from(new Set((data || []).map(r => r.course))).sort();

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Resource</h1>
        <p className="text-sm text-gray-500 mt-1">Add a new lecture slide or past question to the Academic Bank.</p>
      </div>
      <AcademicResourceForm existingCourses={uniqueCourses} />
    </div>
  );
}
