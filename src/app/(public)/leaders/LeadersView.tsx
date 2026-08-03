'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DepartmentAuthority, ItsaExecutive } from '@/lib/types';

type Leader = DepartmentAuthority | ItsaExecutive;

function isExecutive(leader: Leader): leader is ItsaExecutive {
  return 'position' in leader;
}

export function LeadersView({ authorities, executives }: { authorities: DepartmentAuthority[], executives: ItsaExecutive[] }) {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  const closeModal = () => setSelectedLeader(null);

  const renderSocials = (leader: Leader) => {
    return (
      <div className="flex gap-4 items-center justify-center mt-6 border-t border-gray-100 pt-6">
        {leader.email && (
          <a href={`mailto:${leader.email}`} className="text-gray-400 hover:text-itsa-gold transition-colors" title="Email">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </a>
        )}
        {leader.linkedin_url && (
          <a href={leader.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-itsa-gold transition-colors" title="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        )}
        {leader.twitter_url && (
          <a href={leader.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-itsa-gold transition-colors" title="Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
        )}
        {isExecutive(leader) && leader.instagram_url && (
          <a href={leader.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-itsa-gold transition-colors" title="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-24">
      {/* Department Authorities */}
      {authorities.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-itsa-navy mb-4">Department Leadership</h2>
            <div className="w-16 h-1 bg-itsa-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {authorities.map(authority => (
              <div 
                key={authority.id} 
                onClick={() => setSelectedLeader(authority)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center cursor-pointer group hover:shadow-md hover:border-itsa-gold/30 transition-all"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {authority.photo_url ? (
                    <Image src={authority.photo_url} alt={authority.full_name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-itsa-navy transition-colors">{authority.full_name}</h3>
                <p className="text-itsa-gold-dark font-medium text-sm mb-3">{authority.title}</p>
                <span className="text-xs font-semibold text-itsa-navy/60 uppercase tracking-widest flex items-center gap-1 mt-auto">
                  View Profile <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ITSA Executives */}
      {executives.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-itsa-navy mb-4">ITSA Executives</h2>
            <div className="w-16 h-1 bg-itsa-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map(exec => (
              <div 
                key={exec.id} 
                onClick={() => setSelectedLeader(exec)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:border-itsa-navy cursor-pointer transition-colors flex flex-col"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {exec.photo_url ? (
                    <Image src={exec.photo_url} alt={exec.full_name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-itsa-navy/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="bg-white text-itsa-navy px-4 py-2 rounded-full font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      View Profile
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col items-center text-center">
                  <h3 className="font-bold text-gray-900 mb-1 text-lg leading-tight group-hover:text-itsa-navy transition-colors">{exec.full_name}</h3>
                  <p className="text-itsa-gold-dark font-semibold text-xs uppercase tracking-wider">{exec.position}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leader Profile Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-8">
                <div className="relative w-40 h-40 shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-gray-50">
                  {selectedLeader.photo_url ? (
                    <Image src={selectedLeader.photo_url} alt={selectedLeader.full_name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left flex-1 pt-2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedLeader.full_name}</h2>
                  <p className="text-itsa-gold-dark font-bold tracking-widest uppercase text-sm mb-4">
                    {isExecutive(selectedLeader) ? selectedLeader.position : selectedLeader.title}
                  </p>
                  
                  {renderSocials(selectedLeader)}
                </div>
              </div>

              {selectedLeader.bio ? (
                <div className="prose prose-gray prose-lg max-w-none prose-headings:text-itsa-navy prose-a:text-itsa-gold">
                  <div dangerouslySetInnerHTML={{ __html: selectedLeader.bio }} />
                </div>
              ) : (
                <p className="text-gray-500 italic text-center py-8 bg-gray-50 rounded-xl">No biography provided.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
