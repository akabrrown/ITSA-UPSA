'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { AdminHeader } from './AdminHeader';

export function AdminLayoutClient({ children, userEmail }: { children: React.ReactNode, userEmail?: string }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isAuthPage = 
    pathname === '/admin/login' || 
    pathname === '/login' || 
    pathname === '/admin/change-password' || 
    pathname === '/change-password';

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-itsa-navy/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar Container */}
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'
          }`}
        >
          <Sidebar onClose={() => setIsMobileOpen(false)} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <AdminHeader onMenuClick={() => setIsMobileOpen(true)} userEmail={userEmail} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
