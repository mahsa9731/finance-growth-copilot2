'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Compass, Sparkles, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-emerald-50 relative flex items-center justify-center p-4 overflow-hidden font-system selection:bg-purple-500/20 selection:text-purple-900"
      dir="rtl"
    >
      
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-200/30 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-white/60 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 text-center text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/90"
      >
       
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-purple-100/80 text-purple-800 border border-purple-200/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 ml-1.5 text-purple-600 animate-spin" style={{ animationDuration: '6s' }} />
            خطای آدرس‌دهی شبکه
          </span>
        </div>

        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-purple-200/60 rotate-3">
            <Compass className="w-12 h-12 animate-pulse" />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-2xl shadow-md border-2 border-white">
            <AlertCircle className="w-5 h-5" />
          </span>
        </div>

        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-slate-800 tracking-tight mb-2">
          ۴۰۴
        </h1>

        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3">
          صفحه مورد نظر پیدا نشد!
        </h2>
        <p className="text-xs md:text-sm font-semibold text-slate-600 leading-relaxed mb-8 max-w-sm mx-auto">
          آدرسی که وارد کرده‌اید وجود ندارد یا منتقل شده است. می‌توانید به داشبورد اصلی بازگردید.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs md:text-sm transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            بازگشت به داشبورد
          </Link>

          <button
            onClick={() => window.history.back()}
            className="py-3.5 px-6 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/90 text-xs md:text-sm text-slate-700 font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
          >
            <ArrowRight className="w-4 h-4" />
            صفحه قبلی
          </button>
        </div>
      </motion.div>
    </div>
  );
}