import { getAcademicResources } from "@/lib/data";
import { FolderView } from "../FolderView";

export const revalidate = 60;

export default async function PastQuestionsPage() {
  const resources = await getAcademicResources();
  const pastQuestions = resources.filter(r => r.resource_type === 'past_question');

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold text-itsa-navy mb-4">Past Questions</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Access past examination questions to help you prepare for your exams. Select a course folder below.
        </p>
      </div>

      <section>
        {pastQuestions.length > 0 ? (
          <FolderView resources={pastQuestions} theme="gold" />
        ) : (
          <p className="text-gray-500 italic bg-gray-50 p-6 rounded-lg text-center">No past questions available yet.</p>
        )}
      </section>
    </div>
  );
}
