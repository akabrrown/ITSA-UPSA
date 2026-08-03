import Image from "next/image";
import Link from "next/link";
import { getActivities } from "@/lib/data";

export const revalidate = 60;

export default async function ActivitiesPage() {
  const activities = await getActivities();

  const upcoming = activities.filter(a => a.status === 'upcoming');
  const past = activities.filter(a => a.status === 'past');

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold text-itsa-navy mb-4">Activities & Events</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Discover our upcoming workshops, seminars, and networking events designed to elevate your IT journey.
        </p>
      </div>

      {upcoming.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcoming.map(activity => (
              <div key={activity.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group relative">
                <div className="absolute top-4 right-4 z-10 bg-itsa-gold text-itsa-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Upcoming
                </div>
                <div className="relative h-64 bg-itsa-navy overflow-hidden">
                  {activity.cover_image_url ? (
                    <Image src={activity.cover_image_url} alt={activity.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-itsa-navy to-itsa-navy-dark" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 leading-tight">{activity.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80 font-medium">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {new Date(activity.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      {activity.venue && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          {activity.venue}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-gray-600 mb-6 flex-1" dangerouslySetInnerHTML={{ __html: activity.description || "" }} />
                  {activity.rsvp_link ? (
                    <a href={activity.rsvp_link} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-itsa-navy hover:bg-itsa-navy-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                      RSVP Now
                    </a>
                  ) : (
                    <div className="block w-full text-center bg-gray-100 text-gray-500 font-semibold py-3 px-4 rounded-lg cursor-not-allowed">
                      RSVP Opening Soon
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Past Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {past.map(activity => (
              <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="relative h-48 bg-gray-100">
                  {activity.cover_image_url ? (
                    <Image src={activity.cover_image_url} alt={activity.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">
                    {new Date(activity.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h3 className="font-bold text-gray-900 mb-3 leading-tight">{activity.title}</h3>
                  <div className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1" dangerouslySetInnerHTML={{ __html: activity.description || "" }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {upcoming.length === 0 && past.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No activities recorded yet.</p>
        </div>
      )}
    </div>
  );
}
