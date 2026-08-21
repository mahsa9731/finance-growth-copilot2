'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Bot, 
  Users, 
  CreditCard, 
  HelpCircle, 
  Search, 
  Bell, 
  ChevronRight,
  Filter,
  Sparkles,
  Gift,
  ShieldAlert,
  BookOpen,
  PieChart,
  Target,
  ShoppingBag,
  Sliders,
  Tag,
  Menu,
  X
} from 'lucide-react';

const sidebarItems = [
  { title: 'تحلیل رشد و فروش', href: '/dashboard/growth', icon: TrendingUp },
  { title: 'دستیار هوش مصنوعی', href: '/dashboard', icon: Bot },
  { title: 'مشتریان محبوب', href: '/dashboard/customers', icon: Users },
  { title: 'قیف تبدیل و خروج مشتریان', href: '/dashboard/funnel', icon: Filter },
  { title: 'پایداری درگاه', href: '/dashboard/gateways', icon: CreditCard },
  { title: 'پیش‌بینی هوشمند فروش', href: '/dashboard/forecasting', icon: Sparkles },
  { title: 'مدیریت وفاداری و پاداش', href: '/dashboard/loyalty', icon: Gift },
  { title: 'مدیریت تخفیف‌ها و کوپن‌ها', href: '/dashboard/coupons', icon: Tag },
  { title: 'تحلیل ریسک و بازگشت وجه', href: '/dashboard/risk-analysis', icon: ShieldAlert },
  { title: 'اهداف و تارگت‌های مالی', href: '/dashboard/targets', icon: Target },
  { title: 'تحلیل محصولات پرفروش', href: '/dashboard/top-products', icon: ShoppingBag },
  { title: 'گزارش‌های سهم بازار', href: '/dashboard/market-share', icon: PieChart },
  { title: 'تنظیمات پیشرفته', href: '/dashboard/settings', icon: Sliders },
  { title: 'مقالات کسب و کار', href: '/dashboard/articles', icon: BookOpen },
  { title: 'شفافیت و راهنما', href: '/dashboard/traceability', icon: HelpCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans bg-slate-900/10">
      {/* Header */}
      <header className="h-16 border-b border-slate-700/40 bg-slate-900/40 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 hover:bg-slate-800 transition"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 border border-white/20">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <span className="font-extrabold text-sm md:text-base text-white tracking-tight">داشبورد هوشمند پذیرندگان</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-72 hidden md:block">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/70" />
            <input
              type="text"
              placeholder="جستجو در داده‌ها..."
              className="w-full bg-blue-950/30 border border-blue-500/30 rounded-xl pr-9 pl-4 py-1.5 text-xs text-white placeholder-blue-300/50 outline-none focus:border-blue-400 focus:bg-blue-900/40 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-md transition-all shadow-inner"
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

      <div className="flex flex-1 relative p-2 md:p-4 gap-4">
        
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 260 : 80 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="border border-white/10 bg-slate-900/40 backdrop-blur-2xl p-3.5 hidden md:flex flex-col gap-1.5 relative shadow-2xl shadow-blue-950/20 rounded-3xl overflow-y-auto max-h-[calc(100vh-6rem)] custom-scrollbar"
        >
         
          <div className="flex items-center justify-between px-2 py-1.5 mb-1 bg-slate-800/30 rounded-2xl border border-slate-700/30">
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-black text-blue-300 tracking-wide whitespace-nowrap"
                >
                  دسترسی سریع
                </motion.span>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 text-slate-200 transition shadow-sm mx-auto"
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
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 border whitespace-nowrap overflow-hidden ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400/50 shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 border-transparent hover:bg-white/5 hover:text-white hover:border-white/10'
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

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/30 backdrop-blur-md z-40 md:hidden"
              />

              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-3 right-3 bottom-3 w-72 bg-white/70 backdrop-blur-2xl z-50 p-4 border border-white/80 rounded-3xl flex flex-col gap-2 overflow-y-auto md:hidden shadow-2xl shadow-slate-900/30"
              >
                <div className="flex items-center justify-between pb-3 mb-1 border-b border-slate-200/60">
                  <span className="text-xs font-black text-slate-900">منوی دسترسی داشبورد</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-xl bg-white/80 text-slate-600 hover:text-slate-900 transition shadow-sm border border-slate-200/50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 border ${
                        isActive
                          ? 'bg-blue-600/90 text-white border-blue-500 shadow-md shadow-blue-500/30 backdrop-blur-sm'
                          : 'text-slate-800 border-transparent hover:bg-white/60 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}