import Image from "next/image";
import { getDepartmentInfo, getDepartmentAuthorities, getItsaExecutives } from "@/lib/data";

export const revalidate = 60;

export default async function AboutPage() {
  const [departmentInfo] = await Promise.all([
    getDepartmentInfo()
  ]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-itsa-navy mb-6">About ITSA-UPSA</h1>
        {departmentInfo?.mission && (
          <p className="text-xl text-itsa-gold-dark font-medium leading-relaxed italic">
            "{departmentInfo.mission}"
          </p>
        )}
      </div>

      <div className="space-y-24">
        {/* Department Info */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 prose prose-lg prose-gray max-w-none">
              <h2 className="text-3xl font-bold text-itsa-navy mb-6 mt-0">The Department</h2>
              <div dangerouslySetInnerHTML={{ __html: departmentInfo?.description || "<p>Information Technology at UPSA...</p>" }} />
            </div>
            <div className="order-1 md:order-2 relative aspect-square md:aspect-auto md:h-full min-h-[300px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center bg-itsa-navy/5">
                <span className="text-itsa-navy/20 font-bold text-4xl font-heading tracking-widest">UPSA</span>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
