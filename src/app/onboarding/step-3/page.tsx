'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2, 
  AlertTriangle, 
  Users, 
  Bell, 
  Search, 
  Settings, 
  Home, 
  PieChart 
} from 'lucide-react';

export default function StepThreePage() {
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
        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-3" />
        <p className="text-sm font-bold text-slate-700">در حال پردازش داده‌های زریـن‌پال...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden font-sans" dir="rtl">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-fuchsia-300/40 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl light-glass rounded-[32px] p-6 md:p-8 text-slate-900 shadow-2xl"
      >
        {/* Top header navigation */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-100/90 text-purple-800 border border-purple-300/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 ml-1.5 text-purple-600" />
              گام ۳ از ۳: تحلیل RFM و ریزش
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
            پیش‌بینی مشتریان در خطر ریزش
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-600">
            شناسایی خریداران فعال سابق با کاهش تواتر تراکنش بر اساس دیتاست
          </p>
        </div>

        {/* Visual widgets */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Gauge card */}
          <div className="md:col-span-7 neon-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                حجم فروش در معرض خطر
              </span>
              <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300/50">
                نیازمند اقدام
              </span>
            </div>

            {/* Risk gauge bar */}
            <div className="my-3 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-bold">سطح ریسک کلی:</span>
                <span className="font-extrabold text-amber-700">متوسط تا بالا</span>
              </div>
              <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/60">
                <div className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-full w-[68%] shadow-sm" />
              </div>
            </div>

            <p className="text-xs font-bold text-slate-700">
              فروش غیرفعال: <span className="font-extrabold text-slate-900 dir-ltr inline-block text-sm">{(data?.rfmRisk?.atRiskRevenue || 0).toLocaleString()} ریال</span>
            </p>
          </div>

          {/* Inactive count card */}
          <div className="md:col-span-5 neon-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold block text-slate-900">کاربران خاموش</span>
                <span className="text-[10px] font-bold text-slate-500">تعداد افراد در خطر</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-600 block mb-0.5">جمعیت هدف</span>
                <span className="text-sm font-black text-purple-900">
                  {data?.rfmRisk?.atRiskCount || 0} خریدار
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
                : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-purple-200'
            }`}
          >
            {actionDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 ml-2 text-emerald-700 stroke-[2.5]" />
                کمپین بازگشت با موفقیت فعال شد
              </>
            ) : (
              <>
                <Send className="w-4 h-4 ml-2 stroke-[2.5]" />
                فعال‌سازی یک‌کلیکه کمپین بازگشت
              </>
            )}
          </button>

          {/* Redirects to dashboard growth route */}
          <button
            onClick={() => router.push('/dashboard/growth')}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-xs md:text-sm text-white font-extrabold flex items-center justify-center transition-colors shadow-md"
          >
            اتمام و ورود به داشبورد رشد
            <ArrowLeft className="w-4 h-4 mr-2 stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-around text-slate-500">
          <button className="p-2 hover:text-slate-800"><Home className="w-5 h-5 stroke-[2.5]" /></button>
          <button className="p-2 hover:text-slate-800"><Users className="w-5 h-5 stroke-[2.5]" /></button>
          <button className="p-2 text-purple-700 bg-purple-100/80 rounded-xl"><PieChart className="w-5 h-5 stroke-[2.5]" /></button>
        </div>
      </motion.div>
    </div>
  );
}