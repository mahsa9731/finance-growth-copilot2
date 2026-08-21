'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2, 
  TrendingUp, 
  CreditCard, 
  ShoppingBag,
  Bell,
  Search,
  Settings,
  Home,
  UserCheck
} from 'lucide-react';

export default function StepOnePage() {
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
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-bold text-slate-700">در حال پردازش اطلاعات ...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden font-sans" dir="rtl">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-300/40 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl light-glass rounded-[32px] p-6 md:p-8 text-slate-900 shadow-2xl"
      >
        {/* Top header navigation */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-300/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 ml-1.5 text-indigo-600" />
              گام ۱ از ۳: مشتری VIP
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <button className="p-2 rounded-xl hover:bg-white/80 transition-colors"><Search className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:bg-white/80 transition-colors"><Bell className="w-4 h-4" /></button>
            <button className="p-2 rounded-xl hover:bg-white/80 transition-colors"><Settings className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Title and subtitle with bold weights */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
            شناسایی مشتری شماره یک
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-600">
            استخراج‌شده بر اساس بیشترین حجم خرید از دیتاست زرین‌پال
          </p>
        </div>

        {/* Visual widgets */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Chart card */}
          <div className="md:col-span-7 neon-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                سهم از کل درگاه
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full dir-ltr border border-emerald-300/50">
                +{data?.topCustomer?.sharePercentage || 0}%
              </span>
            </div>
            
            {/* SVG line chart */}
            <div className="h-20 w-full my-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 45 Q 40 10, 80 35 T 160 15 T 200 25 L 200 60 L 0 60 Z"
                  fill="url(#gradient1)"
                />
                <path
                  d="M0 45 Q 40 10, 80 35 T 160 15 T 200 25"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="text-xs font-bold text-slate-700">
              مجموع خرید: <span className="font-extrabold text-slate-900 dir-ltr inline-block text-sm">{(data?.topCustomer?.totalAmount || 0).toLocaleString()} ریال</span>
            </p>
          </div>

          {/* Customer info card */}
          <div className="md:col-span-5 neon-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-indigo-200">
                VIP
              </div>
              <div>
                <span className="text-xs font-extrabold block text-slate-900">مشتری برتر</span>
                <span className="text-[10px] font-bold text-slate-500">شناسه کارت بانکی</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-bold flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-indigo-600" /> کارت:
                </span>
                <span className="font-extrabold text-slate-900 font-mono dir-ltr">{data?.topCustomer?.card || '—'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-bold flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" /> تعداد:
                </span>
                <span className="font-extrabold text-slate-900">{data?.topCustomer?.count || 0} تراکنش</span>
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
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-300'
            }`}
          >
            {actionDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 ml-2 text-emerald-700 stroke-[2.5]" />
                کد تخفیف اختصاصی ارسال شد
              </>
            ) : (
              <>
                <Gift className="w-4 h-4 ml-2 stroke-[2.5]" />
                ارسال کد تخفیف قدردانی اختصاصی
              </>
            )}
          </button>

          <button
            onClick={() => router.push('/onboarding/step-2')}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300/80 text-xs md:text-sm text-slate-800 font-extrabold flex items-center justify-center transition-colors shadow-sm"
          >
            صفحه بعدی: تحلیل ساعات طلایی
            <ArrowLeft className="w-4 h-4 mr-2 stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-around text-slate-500">
          <button className="p-2 text-indigo-700 bg-indigo-100/80 rounded-xl"><Home className="w-5 h-5 stroke-[2.5]" /></button>
          <button className="p-2 hover:text-slate-800"><UserCheck className="w-5 h-5 stroke-[2.5]" /></button>
          <button className="p-2 hover:text-slate-800"><TrendingUp className="w-5 h-5 stroke-[2.5]" /></button>
        </div>
      </motion.div>
    </div>
  );
}