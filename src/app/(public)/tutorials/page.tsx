import { getTutorials } from "@/lib/data";
import { TutorialsView } from "./TutorialsView";

export const revalidate = 60;

export default async function TutorialsPage() {
  const tutorials = await getTutorials();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold text-itsa-navy mb-4">Tutorials & Lectures</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Access our library of recorded sessions, tutorials, and deep dives into IT concepts and programming languages.
        </p>
      </div>

      {tutorials.length > 0 ? (
        <TutorialsView tutorials={tutorials as any} />
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No tutorials available at the moment. Check back later!</p>
        </div>
      )}
    </div>
  );
}
