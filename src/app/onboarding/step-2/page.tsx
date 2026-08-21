'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2, 
  Clock, 
  BarChart2, 
  Bell, 
  Search, 
  Settings, 
  Home, 
  TrendingUp 
} from 'lucide-react';

export default function StepTwoPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionDone, setActionDone] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/analytics/onboarding');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Failed to fetch onboarding analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f8] flex flex-col items-center justify-center text-slate-700 font-sans" dir="rtl">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-600 mb-3" />
        <p className="text-sm font-bold text-slate-700">در حال پردازش اطلاعات...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden font-sans" dir="rtl">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-300/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sky-300/40 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl light-glass rounded-[32px] p-6 md:p-8 text-slate-900 shadow-2xl"
      >
        {/* Top header navigation */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-100/90 text-cyan-800 border border-cyan-300/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 ml-1.5 text-cyan-600" />
              گام ۲ از ۳: ساعات طلایی
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <button className="p-2 rounded-xl hover:bg-white/80 transition-colors"><Search className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:bg-white/80 transition-colors"><Bell className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:bg-white/80 transition-colors"><Settings className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Title and subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
            بازه زمانی بیشترین فروش
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-600">
            تحلیل سری زمانی داده‌های زمان پرداخت جهت شناسایی الگوی خرید
          </p>
        </div>

        {/* Visual widgets */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Histogram card */}
          <div className="md:col-span-7 neon-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <BarChart2 className="w-4 h-4 text-cyan-600" />
                توزیع تراکنش‌ها بر حسب ساعت
              </span>
              <span className="text-xs font-black text-cyan-800 bg-cyan-100 px-2.5 py-1 rounded-full border border-cyan-300/50">
                اوج فروش
              </span>
            </div>

            {/* Custom SVG histogram */}
            <div className="h-20 w-full my-2 flex items-end justify-between gap-1.5 px-1">
              {[25, 40, 30, 65, 95, 80, 50, 35, 20].map((height, i) => (
                <div key={i} className="flex-1 bg-slate-200/80 rounded-t-md h-full flex items-end">
                  <div 
                    className={`w-full rounded-t-md transition-all ${
                      i === 4 ? 'bg-gradient-to-t from-cyan-600 to-sky-400 shadow-md' : 'bg-cyan-300/80'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>

            <p className="text-xs font-bold text-slate-700">
              بازه فعالیت: <span className="font-extrabold text-slate-900 dir-ltr inline-block text-sm">ساعت {data?.peakTime?.peakHourStart || 18}:00 الی {data?.peakTime?.peakHourEnd || 21}:00</span>
            </p>
          </div>

          {/* AOV card */}
          <div className="md:col-span-5 neon-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold block text-slate-900">شاخص AOV</span>
                <span className="text-[10px] font-bold text-slate-500">میانگین ارزش سبد</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-600 block mb-0.5">ارزش هر سفارش</span>
                <span className="text-sm font-black text-slate-900 dir-ltr block text-right">
                  {(data?.peakTime?.aov || 0).toLocaleString()} ریال
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setActionDone(true)}
            disabled={actionDone}
            className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs md:text-sm flex items-center justify-center transition-all shadow-md ${
              actionDone
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-cyan-200'
            }`}
          >
            {actionDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 ml-2 text-emerald-700 stroke-[2.5]" />
                زمان‌بندی هوشمند فعال شد
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 ml-2 stroke-[2.5]" />
                تنظیم زمان‌بندی خودکار کمپین
              </>
            )}
          </button>

          <button
            onClick={() => router.push('/onboarding/step-3')}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300/80 text-xs md:text-sm text-slate-800 font-extrabold flex items-center justify-center transition-colors shadow-sm"
          >
            صفحه بعدی: پیش‌بینی ریزش
            <ArrowLeft className="w-4 h-4 mr-2 stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-around text-slate-500">
          <button className="p-2 hover:text-slate-800"><Home className="w-5 h-5 stroke-[2.5]" /></button>
          <button className="p-2 text-cyan-700 bg-cyan-100/80 rounded-xl"><TrendingUp className="w-5 h-5 stroke-[2.5]" /></button>
          <button className="p-2 hover:text-slate-800"><BarChart2 className="w-5 h-5 stroke-[2.5]" /></button>
        </div>
      </motion.div>
    </div>
  );
}