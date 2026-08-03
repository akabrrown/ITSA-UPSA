import { getDepartmentAuthorities, getItsaExecutives } from "@/lib/data";
import { LeadersView } from "./LeadersView";

export const revalidate = 60;

export default async function LeadersPage() {
  const [authorities, executives] = await Promise.all([
    getDepartmentAuthorities(),
    getItsaExecutives()
  ]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-itsa-navy mb-6">Our Leaders</h1>
        <p className="text-xl text-itsa-gold-dark font-medium leading-relaxed italic">
          Meet the dedicated individuals driving excellence in the Department of Information Technology.
        </p>
      </div>

      <LeadersView authorities={authorities as any} executives={executives as any} />
    </div>
  );
}
