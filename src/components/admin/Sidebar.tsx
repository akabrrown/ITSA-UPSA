'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Activities & Events', href: '/admin/dashboard/activities', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'Academic Bank', href: '/admin/dashboard/academic-resources', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.254 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { name: 'Tutorials', href: '/admin/dashboard/tutorials', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  { name: 'ITSA Executives', href: '/admin/dashboard/executives', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'News & Posts', href: '/admin/dashboard/news', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14' },
  { name: 'Department Authorities', href: '/admin/dashboard/authorities', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Banner Slides', href: '/admin/dashboard/banners', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'President Speech', href: '/admin/dashboard/speech', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
  { name: 'Department Info', href: '/admin/dashboard/department-info', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'User Roles', href: '/admin/dashboard/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-full overflow-hidden">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100/50 bg-white shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="ITSA Logo" 
            width={32} 
            height={32} 
            className="rounded-full bg-white object-contain shadow-sm"
          />
          <span className="font-bold text-gray-900 tracking-wide text-sm">ADMINISTRATION</span>
        </Link>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Content Modules</p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin/dashboard');
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                isActive 
                  ? 'text-itsa-navy bg-itsa-navy/5' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-itsa-navy'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-itsa-navy rounded-r-full" />
              )}
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'text-itsa-navy scale-110' : 'text-gray-400 group-hover:scale-110 group-hover:text-itsa-navy'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.5" : "2"} d={item.icon}></path>
              </svg>
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer / Sign Out */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
        <form action="/auth/signout" method="post">
          <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-red-100/50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </div>
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
