import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Newspaper, Calendar, PlaySquare, BookOpen, Users, Flag, Megaphone, Info, ShieldAlert } from "lucide-react";

const quickLinks = [
  { name: 'News & Posts', href: '/admin/dashboard/news', icon: Newspaper, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Activities', href: '/admin/dashboard/activities', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { name: 'Tutorials', href: '/admin/dashboard/tutorials', icon: PlaySquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Academic Bank', href: '/admin/dashboard/academic-resources', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Executives', href: '/admin/dashboard/executives', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'Banner Slides', href: '/admin/dashboard/banners', icon: Megaphone, color: 'text-pink-600', bg: 'bg-pink-50' },
  { name: 'Department Info', href: '/admin/dashboard/department-info', icon: Info, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { name: 'User Roles', href: '/admin/dashboard/users', icon: ShieldAlert, color: 'text-slate-700', bg: 'bg-slate-100' },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-itsa-navy via-[#1e3250] to-[#142238] p-8 sm:p-12 shadow-lg">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome back to Command Center
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            You are securely authenticated as <span className="text-white font-medium bg-white/10 px-2 py-0.5 rounded-md ml-1">{user.email}</span>. Use the modules below to manage the ITSA platform content.
          </p>
        </div>
        
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4">
          <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Content Modules</h2>
          <span className="text-sm font-medium text-gray-500">8 Modules Active</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="group block relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-transparent transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${link.bg} ${link.color}`}>
                  <link.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-itsa-navy transition-colors">
                  {link.name}
                </h3>
                
                <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-gray-500 group-hover:text-itsa-navy transition-colors">
                  Manage Content 
                  <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* System Status / Secondary Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">System Overview</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-sm text-gray-500 font-medium mb-1">Platform Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-gray-900">All systems operational</span>
              </div>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-sm text-gray-500 font-medium mb-1">Server Region</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">Vercel (us-east)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-itsa-gold/10 to-itsa-gold/5 rounded-2xl border border-itsa-gold/20 p-6 sm:p-8 flex flex-col justify-center items-center text-center shadow-sm">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-itsa-gold-dark">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600">
            Ensure all uploaded images are high quality. Use the Rich Text Editor to properly format announcements.
          </p>
        </div>
      </div>
    </div>
  );
}
