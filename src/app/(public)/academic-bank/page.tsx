import Link from "next/link";

export default function AcademicBankIndexPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-itsa-navy mb-6">Welcome to the Academic Bank</h1>
      <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
        Your central repository for study materials. Choose a category below to browse the available resources.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Link href="/academic-bank/slides" className="group block bg-white rounded-2xl shadow-sm border border-gray-100 p-10 hover:shadow-md hover:border-itsa-navy transition-all text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.254 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div className="w-16 h-16 rounded-xl bg-itsa-navy/10 flex items-center justify-center text-itsa-navy mb-6 relative z-10">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.254 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">Lecture Slides</h2>
          <p className="text-gray-600 mb-6 relative z-10">Browse and download lecture slides for your courses across all levels.</p>
          <span className="inline-flex items-center text-itsa-navy font-semibold group-hover:text-itsa-gold transition-colors relative z-10">
            Browse Slides &rarr;
          </span>
        </Link>

        <Link href="/academic-bank/past-questions" className="group block bg-white rounded-2xl shadow-sm border border-gray-100 p-10 hover:shadow-md hover:border-itsa-gold transition-all text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500 text-itsa-gold-dark">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="w-16 h-16 rounded-xl bg-itsa-gold/20 flex items-center justify-center text-itsa-gold-dark mb-6 relative z-10">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">Past Questions</h2>
          <p className="text-gray-600 mb-6 relative z-10">Access past examination questions to help you prepare for upcoming exams.</p>
          <span className="inline-flex items-center text-itsa-gold-dark font-semibold group-hover:text-itsa-navy transition-colors relative z-10">
            Browse Questions &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
