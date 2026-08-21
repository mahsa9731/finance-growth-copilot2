'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  CreditCard, 
  HelpCircle, 
  Search, 
  Bell 
} from 'lucide-react';

const sidebarItems = [
  { title: 'داشبورد اصلی', href: '/dashboard', icon: LayoutDashboard },
  { title: 'تحلیل رشد و فروش', href: '/dashboard/growth', icon: TrendingUp },
  { title: 'مشتریان محبوب', href: '/dashboard/customers', icon: Users },
  { title: 'پایداری درگاه', href: '/dashboard/gateways', icon: CreditCard },
  { title: 'شفافیت و راهنما', href: '/dashboard/traceability', icon: HelpCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      {/* Top Glass Navbar */}
      <header className="h-16 border-b border-white/10 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50 px-6 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30 border border-white/20">
            زر
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">داشبورد هوشمند پذیرندگان</span>
        </div>

        {/* Search & Badges */}
        <div className="flex items-center gap-4">
          <div className="relative w-72 hidden md:block">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جستجو در داده‌ها..."
              className="w-full bg-slate-800/50 border border-white/10 rounded-xl pr-9 pl-4 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-500/80 focus:bg-slate-800/80 backdrop-blur-md transition-all"
            />
          </div>

          <button className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
          </button>

          <div className="flex items-center gap-3 pr-3 border-r border-white/10">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold text-sm">
              پ
            </div>
            <div className="hidden lg:block text-xs">
              <p className="font-bold text-white">پذیرنده M145</p>
              <p className="text-slate-400 text-[10px]">صنف دیجیتال</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Glass Workspace */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-l border-white/10 bg-slate-900/40 backdrop-blur-xl p-4 hidden md:flex flex-col gap-2">
          <div className="text-[11px] font-bold text-slate-400 px-3 py-2">دسترسی سریع</div>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-blue-600/80 text-white border-blue-400/50 shadow-lg shadow-blue-500/25 backdrop-blur-md'
                    : 'text-slate-300 border-transparent hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </aside>

        {/* Content Page Container */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}