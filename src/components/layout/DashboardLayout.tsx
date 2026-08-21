'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  CreditCard, 
  HelpCircle, 
  Search, 
  Bell, 
  ChevronRight 
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans bg-slate-900/10">
      <header className="h-16 border-b border-gradient-r from-transparent via-slate-700/40 to-transparent bg-slate-900/40 backdrop-blur-xl sticky top-0 z-50 px-6 flex items-center justify-between shadow-sm [border-image:linear-gradient(to_right,transparent,rgba(51,65,85,0.4),transparent)_1]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 border border-white/20">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <span className="font-extrabold text-base text-white tracking-tight">داشبورد هوشمند پذیرندگان</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-72 hidden md:block">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جستجو در داده‌ها..."
              className="w-full bg-slate-800/40 border border-slate-700/40 rounded-xl pr-9 pl-4 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-slate-800/80 backdrop-blur-md transition-all"
            />
          </div>

          <button className="relative p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 text-slate-300 transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
          </button>

          <div className="flex items-center gap-3 pr-3 border-r border-slate-700/40">
            <img 
              src="/avatar/upload.png" 
              alt="پروفایل" 
              className="w-9 h-9 rounded-xl border border-slate-700/50 object-cover shadow-sm"
            />
            <div className="hidden lg:block text-xs">
              <p className="font-bold text-white">پذیرنده M145</p>
              <p className="text-slate-400 text-[10px]">صنف دیجیتال</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 256 : 80 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="border-l border-b-0 bg-slate-900/30 backdrop-blur-2xl p-4 hidden md:flex flex-col gap-2 relative shadow-sm overflow-hidden [border-image:linear-gradient(to_bottom,transparent,rgba(51,65,85,0.4),transparent)_1]"
        >
          <div className="flex items-center justify-between px-2 py-1 mb-2">
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] font-bold text-slate-400 whitespace-nowrap"
                >
                  دسترسی سریع
                </motion.span>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 transition shadow-sm mx-auto"
            >
              <motion.div animate={{ rotate: isSidebarOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </button>
          </div>

          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 border whitespace-nowrap overflow-hidden ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 border-transparent hover:bg-slate-800/40 hover:border-slate-700/40'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </motion.aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}