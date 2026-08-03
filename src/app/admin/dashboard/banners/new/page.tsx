import { BannerForm } from '@/components/admin/BannerForm';

export default function NewBannerSlidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Banner Slides</h1>
        <p className="text-sm text-gray-500 mt-1">Fill in the details below.</p>
      </div>
      <BannerForm />
    </div>
  );
}