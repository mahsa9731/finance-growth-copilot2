'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  CreditCard, 
  HelpCircle, 
  Search, 
  Bell, 
  UserCheck 
} from 'lucide-react';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  { title: 'داشبورد اصلی', href: '/dashboard', icon: LayoutDashboard },
  { title: 'تحلیل فروش و فصول', href: '/dashboard/seasonal', icon: TrendingUp },
  { title: 'مشتریان محبوب (Leaderboard)', href: '/dashboard/customers', icon: Users },
  { title: 'پایداری و سوئیچینگ درگاه', href: '/dashboard/gateways', icon: CreditCard },
  { title: 'شفافیت و راهنما', href: '/dashboard/traceability', icon: HelpCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/20">
            زر
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">داشبورد هوشمند پذیرندگان</span>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جستجو در بینش‌ها و تراکنش‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100/80 border border-slate-200 rounded-lg pr-9 pl-4 py-1.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <button className="relative p-2 rounded-lg bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          <div className="flex items-center gap-3 pr-2 border-r border-slate-200">
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
              پ
            </div>
            <div className="hidden lg:block text-xs">
              <p className="font-semibold text-slate-800">پذیرنده کد M145</p>
              <p className="text-slate-400">صنف دیجیتال</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1">
        {/* Right Sidebar */}
        <aside className="w-64 border-l border-slate-200/80 bg-white/60 backdrop-blur-md p-4 hidden md:flex flex-col gap-2">
          <div className="text-xs font-semibold text-slate-400 px-3 py-2">دسترسی سریع</div>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </aside>

        {/* Content Container */}
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-slate-50 via-slate-100/50 to-blue-50/30">
          {children}
        </main>
      </div>
    </div>
  );
}