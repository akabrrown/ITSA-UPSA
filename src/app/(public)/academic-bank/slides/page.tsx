import { getAcademicResources } from "@/lib/data";
import { FolderView } from "../FolderView";

export const revalidate = 60;

export default async function SlidesPage() {
  const resources = await getAcademicResources();
  const slides = resources.filter(r => r.resource_type === 'slide');

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold text-itsa-navy mb-4">Lecture Slides</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Browse and download lecture slides for your courses. Select a course folder below to view its slides.
        </p>
      </div>

      <section>
        {slides.length > 0 ? (
          <FolderView resources={slides as any} theme="navy" />
        ) : (
          <p className="text-gray-500 italic bg-gray-50 p-6 rounded-lg text-center">No lecture slides available yet.</p>
        )}
      </section>
    </div>
  );
}
