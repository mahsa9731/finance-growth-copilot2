'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Loader2, 
  Clock, 
  BarChart2, 
  Bell, 
  Search, 
  Settings, 
  Home, 
  TrendingUp,
  FastForward,
  Calendar,
  Send,
  X,
  ShieldCheck,
  MessageSquare,
  Users
} from 'lucide-react';
import { processRealDataset } from '@/services/analyticsEngine';

export default function StepTwoPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    peakHourStart: number;
    peakHourEnd: number;
    aovToman: number;
    hourlyDistribution: number[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [actionDone, setActionDone] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('18:30');
  const [discountPercent, setDiscountPercent] = useState('15');
  const [schedulingSms, setSchedulingSms] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/analytics/onboarding');
        const json = await res.json();
        
        let txs = [];
        if (json.success && json.transactions) {
          txs = json.transactions;
        } else if (Array.isArray(json)) {
          txs = json;
        } else if (json.data && Array.isArray(json.data)) {
          txs = json.data;
        }

        if (txs.length > 0) {
          const result = processRealDataset(txs);
          
          const hourlyCounts = new Array(24).fill(0);
          let totalVerifiedAmount = 0;
          let verifiedCount = 0;

          txs.forEach((tx: any) => {
            const isVerified = tx.try_status === 'Verified' || tx.session_status === 'Verified';
            const amount = Number(tx.category_amount) || 0;
            const dateStr = tx.session_created_at || tx.try_created_at;

            if (isVerified && dateStr) {
              const hour = new Date(dateStr).getHours();
              if (!isNaN(hour) && hour >= 0 && hour < 24) {
                hourlyCounts[hour] += 1;
              }
              totalVerifiedAmount += amount;
              verifiedCount += 1;
            }
          });

          let maxCount = 0;
          let peakHour = 18;
          hourlyCounts.forEach((cnt, h) => {
            if (cnt > maxCount) {
              maxCount = cnt;
              peakHour = h;
            }
          });

          const avgToman = verifiedCount > 0 ? Math.round((totalVerifiedAmount / verifiedCount) / 10) : 480000;

          const sampleIndices = [8, 10, 12, 14, 16, 18, 20, 22, 23];
          const sampleValues = sampleIndices.map(idx => hourlyCounts[idx] || 1);
          const maxSample = Math.max(...sampleValues, 1);
          const normalizedHeights = sampleValues.map(v => Math.round((v / maxSample) * 85) + 15);

          setData({
            peakHourStart: peakHour,
            peakHourEnd: (peakHour + 2) % 24,
            aovToman: avgToman,
            hourlyDistribution: normalizedHeights
          });
        } else {
          setData({
            peakHourStart: 18,
            peakHourEnd: 21,
            aovToman: 540000,
            hourlyDistribution: [25, 40, 30, 65, 95, 80, 50, 35, 20]
          });
        }
      } catch (err) {
        console.error('Failed to fetch onboarding analytics:', err);
        setData({
          peakHourStart: 18,
          peakHourEnd: 21,
          aovToman: 540000,
          hourlyDistribution: [25, 40, 30, 65, 95, 80, 50, 35, 20]
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleConfirmSchedule = () => {
    setSchedulingSms(true);
    setTimeout(() => {
      setSchedulingSms(false);
      setIsModalOpen(false);
      setActionDone(true);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f8] flex flex-col items-center justify-center text-slate-700 font-system" dir="rtl">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-600 mb-3" />
        <p className="text-sm font-bold text-slate-700">در حال پردازش سری زمانی تراکنش‌ها...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden font-system" dir="rtl">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-300/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sky-300/40 rounded-full blur-[100px] pointer-events-none" />

      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 z-50 bg-emerald-600 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 font-bold border border-emerald-400"
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
            <span>زمان‌بندی هوشمند ارسال پیامک برای ساعت {scheduledTime} فعال شد!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-[32px] p-6 md:p-8 text-slate-900 shadow-2xl border border-white/60"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-100/90 text-cyan-800 border border-cyan-300/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 ml-1.5 text-cyan-600" />
              گام ۲ از ۳: ساعات طلایی
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.push('/dashboard/growth')}
              className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 rounded-xl text-xs font-black transition-all border border-amber-300/50 flex items-center gap-1 shadow-sm"
            >
              <FastForward className="w-3.5 h-3.5" />
              رد کردن
            </button>
            <button onClick={() => setIsModalOpen(true)} className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-white/80 transition-colors"><Search className="w-4 h-4" /></button>
            <button onClick={() => setIsModalOpen(true)} className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-white/80 transition-colors"><Bell className="w-4 h-4" /></button>
            <button onClick={() => setIsModalOpen(true)} className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-white/80 transition-colors"><Settings className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
            بازه زمانی بیشترین فروش
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-600">
            تحلیل سری زمانی داده‌های زمان پرداخت جهت شناسایی الگوی خرید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-7 bg-white/80 border border-cyan-100 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <BarChart2 className="w-4 h-4 text-cyan-600" />
                توزیع تراکنش‌ها بر حسب ساعت
              </span>
              <span className="text-xs font-black text-cyan-800 bg-cyan-100/90 px-2.5 py-1 rounded-full border border-cyan-300/50">
                اوج فروش
              </span>
            </div>

            <div className="h-20 w-full my-2 flex items-end justify-between gap-1.5 px-1">
              {(data?.hourlyDistribution || [25, 40, 30, 65, 95, 80, 50, 35, 20]).map((height, i) => (
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
              بازه فعالیت: <span className="font-extrabold text-slate-900 dir-ltr inline-block text-sm">ساعت {data?.peakHourStart || 18}:00 الی {data?.peakHourEnd || 21}:00</span>
            </p>
          </div>

          <div className="md:col-span-5 bg-white/80 border border-cyan-100 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
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
                  {(data?.aovToman || 0).toLocaleString()} تومان
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={actionDone}
            className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs md:text-sm flex items-center justify-center transition-all shadow-md ${
              actionDone
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white shadow-cyan-200 active:scale-[0.98]'
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

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/onboarding/step-1')}
              className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300/80 text-xs md:text-sm text-slate-700 font-extrabold flex items-center justify-center transition-colors shadow-sm"
            >
              <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
              گام قبلی
            </button>

            <button
              onClick={() => router.push('/onboarding/step-3')}
              className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300/80 text-xs md:text-sm text-slate-900 font-extrabold flex items-center justify-center transition-colors shadow-sm"
            >
              صفحه بعدی: پیش‌بینی ریزش
              <ArrowLeft className="w-4 h-4 mr-2 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-around text-slate-500">
          <button onClick={() => router.push('/')} className="p-2 hover:text-slate-800"><Home className="w-5 h-5 stroke-[2.5]" /></button>
          <button onClick={() => router.push('/dashboard/growth')} className="p-2 text-cyan-700 bg-cyan-100/80 rounded-xl"><TrendingUp className="w-5 h-5 stroke-[2.5]" /></button>
          <button onClick={() => setIsModalOpen(true)} className="p-2 hover:text-slate-800"><BarChart2 className="w-5 h-5 stroke-[2.5]" /></button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-b from-white to-slate-50 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-white/80 relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 left-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-600 text-white flex items-center justify-center shadow-lg shadow-cyan-200">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">اتوماسیون زمان‌بندی شلیک کمپین</h3>
                  <p className="text-xs font-bold text-cyan-600 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    تنظیم بر اساس پیک خرید مشتریان
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 p-3 bg-cyan-50/50 rounded-2xl border border-cyan-100/60">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">بازه پیک پیشنهادی AI</span>
                  <span className="text-xs font-black text-slate-800 dir-ltr block mt-0.5">
                    {data?.peakHourStart}:00 الی {data?.peakHourEnd}:00
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">میانگین خرید در این ساعت</span>
                  <span className="text-xs font-black text-slate-800 dir-ltr block mt-0.5">
                    {(data?.aovToman || 0).toLocaleString()} تومان
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">ساعت ارسال هوشمند</label>
                    <div className="relative">
                      <input 
                        type="time" 
                        value={scheduledTime} 
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-cyan-500 shadow-sm dir-ltr text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">میزان تخفیف ترغیبی</label>
                    <select 
                      value={discountPercent} 
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-cyan-500 shadow-sm"
                    >
                      <option value="10">۱۰٪ تخفیف</option>
                      <option value="15">۱۵٪ تخفیف (پیشنهادی)</option>
                      <option value="20">۲۰٪ تخفیف ویژه</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl shadow-inner relative">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                    <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> پیش‌نمایش زمان‌بندی SMS
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">ساعت شلیک: {scheduledTime}</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-slate-300">
                    «پیشنهاد محدود ساعات طلایی! فقط تا امشب فرصت دارید از <span className="text-cyan-300 font-bold">{discountPercent}٪ تخفیف</span> خریدهای عصرگاهی استفاده کنید. کد: <span className="text-amber-400 font-bold font-mono">GOLDEN-HOUR</span>»
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleConfirmSchedule}
                  disabled={schedulingSms}
                  className="flex-1 py-3.5 px-4 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-200 active:scale-[0.98]"
                >
                  {schedulingSms ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-white" />
                      تایید و فعال‌سازی زمان‌بندی
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-colors"
                >
                  انصراف
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}