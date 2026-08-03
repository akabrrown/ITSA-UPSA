'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-itsa-navy/95 backdrop-blur-md border-b border-white/10 shadow-sm py-3' 
          : 'bg-itsa-navy border-b border-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4 z-50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 group-hover:border-itsa-gold transition-colors duration-300">
              <Image 
                src="/logo.png" 
                alt="ITSA Logo" 
                fill
                className="object-contain bg-white p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold text-white tracking-tight leading-none group-hover:text-itsa-gold-light transition-colors">ITSA</span>
              <span className="text-[10px] font-medium text-white/60 tracking-widest uppercase mt-1 hidden sm:block">University of Professional Studies</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white relative group">
            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
            <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-itsa-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/tutorials" className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white relative group">
            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Tutorials
            <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-itsa-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <div className="relative group">
            <button className="text-sm font-medium text-white/80 hover:text-white flex items-center gap-1.5 outline-none focus:outline-none pb-1 transition-colors">
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.254 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              Academic Bank
              <svg className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-56 rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
              <div className="p-2 flex flex-col gap-1" role="menu" aria-orientation="vertical">
                <Link href="/academic-bank/slides" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-itsa-navy transition-colors" role="menuitem">
                  <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.254 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  </div>
                  Lecture Slides
                </Link>
                <Link href="/academic-bank/past-questions" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-itsa-navy transition-colors" role="menuitem">
                  <div className="w-8 h-8 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  Past Questions
                </Link>
              </div>
            </div>
          </div>
          
          <Link href="/activities" className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white relative group">
            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Activities
            <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-itsa-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div className="relative group">
            <button className="text-sm font-medium text-white/80 hover:text-white flex items-center gap-1.5 outline-none focus:outline-none pb-1 transition-colors">
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              About
              <svg className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-56 rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
              <div className="p-2 flex flex-col gap-1" role="menu" aria-orientation="vertical">
                <Link href="/about" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-itsa-navy transition-colors" role="menuitem">
                  <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  About ITSA
                </Link>
                <Link href="/leaders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-itsa-navy transition-colors" role="menuitem">
                  <div className="w-8 h-8 rounded-md bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                  Our Leaders
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">

        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-sm bg-itsa-navy shadow-2xl z-50 flex flex-col pt-24 px-6 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-6 text-xl font-heading font-semibold text-white/90 overflow-y-auto pb-8">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-itsa-gold transition-colors">Home</Link>
          <Link href="/tutorials" onClick={() => setMobileMenuOpen(false)} className="hover:text-itsa-gold transition-colors">Tutorials</Link>
          
          <div className="flex flex-col gap-4 border-l-2 border-white/10 pl-4 py-2 mt-2 mb-2">
            <span className="text-sm font-medium text-white/50 uppercase tracking-widest">Academic Bank</span>
            <Link href="/academic-bank/slides" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-itsa-gold transition-colors">Lecture Slides</Link>
            <Link href="/academic-bank/past-questions" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-itsa-gold transition-colors">Past Questions</Link>
          </div>

          <Link href="/activities" onClick={() => setMobileMenuOpen(false)} className="hover:text-itsa-gold transition-colors">Activities</Link>
          <div className="flex flex-col gap-4 border-l-2 border-white/10 pl-4 py-2 mt-2 mb-2">
            <span className="text-sm font-medium text-white/50 uppercase tracking-widest">About</span>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-itsa-gold transition-colors">About ITSA</Link>
            <Link href="/leaders" onClick={() => setMobileMenuOpen(false)} className="text-lg hover:text-itsa-gold transition-colors">Our Leaders</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
