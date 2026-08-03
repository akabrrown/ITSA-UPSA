import Image from "next/image";
import Link from "next/link";
import { getBannerSlides, getPresidentSpeech, getNewsPosts, getActivities } from "@/lib/data";

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function Home() {
  const [slides, speech, news, activities] = await Promise.all([
    getBannerSlides(),
    getPresidentSpeech(),
    getNewsPosts(6),
    getActivities('upcoming'),
  ]);

  const activeSlide = slides.length > 0 ? slides[0] : null;

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Banner */}
      <section className="relative h-[600px] flex items-center justify-center bg-itsa-navy text-white overflow-hidden">
        {activeSlide ? (
          <div className="absolute inset-0 z-0">
            <Image 
              src={activeSlide.image_url} 
              alt="ITSA Hero Banner" 
              fill 
              className="object-cover opacity-40" 
              priority 
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-itsa-navy to-itsa-navy-dark z-0" />
        )}
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <h1 className="mb-6 text-white drop-shadow-md">
            {activeSlide?.headline || "Empowering Innovations"}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-sm">
            Bridging the gap between academic theory and industry practice for IT students at UPSA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutorials" className="bg-itsa-gold hover:bg-itsa-gold-light text-itsa-navy px-8 py-3 rounded-md font-semibold transition-colors">
              Explore Tutorials
            </Link>
            <Link href="/activities" className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-md font-semibold transition-colors">
              View Activities
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-24">
        {/* President's Speech */}
        {speech && (
          <section className="relative overflow-hidden bg-gradient-to-br from-white to-itsa-offwhite rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-16">
            {/* Decorative Quote Icon */}
            <div className="absolute -top-6 -left-6 text-itsa-gold/10 z-0">
              <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
              <div className="md:w-1/3 shrink-0 flex flex-col items-center text-center">
                <div className="relative w-56 h-64 rounded-2xl overflow-hidden mb-6 shadow-lg shadow-itsa-navy/5 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  {speech.photo_url ? (
                    <Image src={speech.photo_url} alt={speech.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                </div>
                <h3 className="mb-1 text-2xl font-bold text-itsa-navy">{speech.name}</h3>
                <p className="text-itsa-gold font-medium tracking-wide uppercase text-sm">{speech.title}</p>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-itsa-navy">A Message from the President</h2>
                <div 
                  className="prose prose-lg prose-gray max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: speech.message || "" }} 
                />
                <div className="mt-8 pt-8 border-t border-gray-200/60 flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-itsa-gold"></div>
                  <span className="font-heading italic text-gray-500">Committed to your success</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Activities */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
            <h2>Upcoming Activities</h2>
            <Link href="/activities" className="text-itsa-navy font-semibold hover:text-itsa-gold transition-colors">View All &rarr;</Link>
          </div>
          {activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(0, 3).map(activity => (
                <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {activity.cover_image_url ? (
                      <Image src={activity.cover_image_url} alt={activity.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 bg-itsa-navy/5 flex items-center justify-center">
                        <span className="text-itsa-navy/20 font-bold text-2xl">ITSA</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-itsa-gold text-itsa-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Upcoming
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-itsa-grey mb-2 font-medium">
                      {new Date(activity.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-xl mb-3">{activity.title}</h3>
                    <div className="text-gray-600 line-clamp-2 mb-6 flex-1" dangerouslySetInnerHTML={{ __html: activity.description || "" }} />
                    <Link href={`/activities/${activity.id}`} className="text-itsa-navy font-semibold group-hover:text-itsa-gold transition-colors self-start mt-auto">
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-itsa-grey italic bg-itsa-offwhite p-6 rounded-lg text-center">No upcoming activities at the moment. Stay tuned!</p>
          )}
        </section>

        {/* Latest News */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
            <h2>Latest News</h2>
          </div>
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.map(post => (
                <article key={post.id} className="flex gap-6 group">
                  {post.cover_image_url && (
                    <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden hidden sm:block">
                      <Image src={post.cover_image_url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-itsa-grey mb-2 uppercase tracking-wide font-medium">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </p>
                    <h3 className="text-lg mb-2 leading-tight group-hover:text-itsa-gold transition-colors">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{post.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-itsa-grey italic">No news updates available.</p>
          )}
        </section>
      </div>
    </div>
  );
}
