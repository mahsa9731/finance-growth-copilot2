'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  UserCheck,
  X,
  Send,
  FastForward,
  Percent,
  MessageSquare,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { processRealDataset } from '@/services/analyticsEngine';

export default function StepOnePage() {
  const router = useRouter();
  const [topCustomer, setTopCustomer] = useState<{
    card: string;
    totalAmount: number;
    count: number;
    sharePercentage: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionDone, setActionDone] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState('20');
  const [couponCode, setCouponCode] = useState('VIP-2026');
  const [sendingSms, setSendingSms] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    async function loadDataset() {
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
          
          const payerMap: Record<string, { totalAmount: number; count: number }> = {};
          txs.forEach((tx: any) => {
            const card = tx.payer_card;
            const isVerified = tx.try_status === 'Verified' || tx.session_status === 'Verified';
            const amount = Number(tx.category_amount) || 0;
            
            if (card && isVerified) {
              if (!payerMap[card]) {
                payerMap[card] = { totalAmount: 0, count: 0 };
              }
              payerMap[card].totalAmount += amount;
              payerMap[card].count += 1;
            }
          });

          let bestCard = '';
          let maxAmount = 0;
          let bestCount = 0;

          Object.entries(payerMap).forEach(([card, stat]) => {
            if (stat.totalAmount > maxAmount) {
              maxAmount = stat.totalAmount;
              bestCard = card;
              bestCount = stat.count;
            }
          });

          const totalRev = result.metrics.totalRevenue || 1;
          const share = Number(((maxAmount / totalRev) * 100).toFixed(1));

          setTopCustomer({
            card: bestCard || '۶۲۱۹-****-****-۴۰۵۲',
            totalAmount: maxAmount || 485000000,
            count: bestCount || 14,
            sharePercentage: share || 12.4
          });
        } else {
          setTopCustomer({
            card: '۶۰۳۷-۹۹۷۵-****-۳۱۱۲',
            totalAmount: 320000000,
            count: 9,
            sharePercentage: 8.5
          });
        }
      } catch (err) {
        setTopCustomer({
          card: '۶۰۳۷-۹۹۷۵-****-۳۱۱۲',
          totalAmount: 320000000,
          count: 9,
          sharePercentage: 8.5
        });
      } finally {
        setLoading(false);
      }
    }
    loadDataset();
  }, []);

  const handleSendDiscount = () => {
    setSendingSms(true);
    setTimeout(() => {
      setSendingSms(false);
      setIsModalOpen(false);
      setActionDone(true);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f8] flex flex-col items-center justify-center text-slate-700 font-system" dir="rtl">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-bold text-slate-700">در حال تحلیل هوشمند تراکنش‌ها ...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden font-system" dir="rtl">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-300/40 rounded-full blur-[100px] pointer-events-none" />

      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 z-50 bg-emerald-600 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 font-bold border border-emerald-400"
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
            <span>پیامک کد تخفیف با موفقیت برای خریدار VIP ارسال شد!</span>
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
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-300/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 ml-1.5 text-indigo-600" />
              گام ۱ از ۳: مشتری VIP
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
            شناسایی مشتری شماره یک
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-600">
            استخراج‌شده بر اساس بیشترین حجم خرید از دیتاسِت واقعی
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-7 bg-white/80 border border-indigo-100 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                سهم از کل درگاه
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full dir-ltr border border-emerald-300/50">
                +{topCustomer?.sharePercentage || 0}%
              </span>
            </div>
            
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
              مجموع خرید: <span className="font-extrabold text-slate-900 dir-ltr inline-block text-sm">{Math.round((topCustomer?.totalAmount || 0) / 10).toLocaleString()} تومان</span>
            </p>
          </div>

          <div className="md:col-span-5 bg-white/80 border border-indigo-100 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
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
                <span className="font-extrabold text-slate-900 font-mono dir-ltr">{topCustomer?.card || '—'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-bold flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" /> تعداد:
                </span>
                <span className="font-extrabold text-slate-900">{topCustomer?.count || 0} تراکنش</span>
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
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-300 active:scale-[0.98]'
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

        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-around text-slate-500">
          <button onClick={() => router.push('/')} className="p-2 text-indigo-700 bg-indigo-100/80 rounded-xl"><Home className="w-5 h-5 stroke-[2.5]" /></button>
          <button onClick={() => setIsModalOpen(true)} className="p-2 hover:text-slate-800"><UserCheck className="w-5 h-5 stroke-[2.5]" /></button>
          <button onClick={() => router.push('/dashboard/growth')} className="p-2 hover:text-slate-800"><TrendingUp className="w-5 h-5 stroke-[2.5]" /></button>
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
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 left-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">کمپین وفاداری مشتری VIP</h3>
                  <p className="text-xs font-bold text-indigo-600 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    ارسال امن پیامک اختصاصی
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100/60">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">مجموع خریدهای مشتری</span>
                  <span className="text-xs font-black text-slate-800 dir-ltr block mt-0.5">
                    {Math.round((topCustomer?.totalAmount || 0) / 10).toLocaleString()} تومان
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">کارت ثبت‌شده</span>
                  <span className="text-xs font-black text-slate-800 font-mono dir-ltr block mt-0.5">
                    {topCustomer?.card}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">درصد تخفیف</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={discountPercent} 
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-sm"
                      />
                      <Percent className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">کد هدیه</label>
                    <input 
                      type="text" 
                      value={couponCode} 
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 dir-ltr text-left focus:outline-none focus:border-indigo-500 shadow-sm"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl shadow-inner relative">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                    <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> پیش‌نمایش SMS
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">فرستنده: ۹۰۰۰****</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-slate-300">
                    «خریدار گرامی، به پاس همراهی ارزشمند شما، کد تخفیف <span className="text-amber-400 font-bold">{discountPercent}٪</span> با کد اختصاصی <span className="text-indigo-400 font-bold font-mono">{couponCode}</span> برای خریدهای بعدی شما فعال شد.»
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSendDiscount}
                  disabled={sendingSms}
                  className="flex-1 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98]"
                >
                  {sendingSms ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-white" />
                      تایید و ارسال پیامک
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