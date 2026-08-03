import { DepartmentInfoForm } from '@/components/admin/DepartmentInfoForm';

export default function NewDepartmentInfoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Department Info</h1>
        <p className="text-sm text-gray-500 mt-1">Fill in the details below.</p>
      </div>
      <DepartmentInfoForm />
    </div>
  );
}