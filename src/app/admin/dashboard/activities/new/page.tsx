import { ActivityForm } from "@/components/admin/ActivityForm";

export default function NewActivityPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Activity</h1>
        <p className="text-sm text-gray-500 mt-1">Fill out the details below to add a new event or activity.</p>
      </div>
      <ActivityForm />
    </div>
  );
}
