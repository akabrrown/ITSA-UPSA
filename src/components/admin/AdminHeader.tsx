'use client';

import { Menu, User, Bell, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onMenuClick: () => void;
  userEmail?: string;
}

export function AdminHeader({ onMenuClick, userEmail }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-itsa-navy hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-semibold text-gray-900">Admin Workspace</h2>
          <p className="text-xs text-gray-500">ITSA Operations</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-itsa-navy hover:bg-gray-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900 leading-none mb-1">Administrator</p>
            <p className="text-xs text-gray-500 leading-none">{userEmail || 'admin@itsa.edu'}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-itsa-navy text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
