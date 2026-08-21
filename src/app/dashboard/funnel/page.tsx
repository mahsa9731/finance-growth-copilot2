'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Search, 
  RefreshCw, 
  X, 
  ArrowDown, 
  Zap, 
  Clock, 
  UserMinus,
  Percent,
  Sparkles
} from 'lucide-react';

interface FunnelStep {
  id: string;
  title: string;
  count: number;
  percentage: number;
  dropPercentage: number;
  color: string;
}

interface ChurnCustomer {
  id: string;
  cardHash: string;
  bankName: string;
  lastPurchaseDate: string;
  daysInactive: number;
  totalHistoricalSpent: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  predictedLoss: number;
}

const FUNNEL_STEPS: FunnelStep[] = [
  {
    id: 'step-1',
    title: 'بازدید از محصولات / صفحه اصلی',
    count: 45200,
    percentage: 100,
    dropPercentage: 0,
    color: 'from-indigo-600 to-blue-600'
  },
  {
    id: 'step-2',
    title: 'افزودن محصول به سبد خرید',
    count: 18080,
    percentage: 40,
    dropPercentage: 60,
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'step-3',
    title: 'ورود به درگاه پرداخت زرین‌پال',
    count: 9040,
    percentage: 20,
    dropPercentage: 50,
    color: 'from-cyan-500 to-amber-500'
  },
  {
    id: 'step-4',
    title: 'تراکنش موفق و تکمیل خرید',
    count: 5876,
    percentage: 13,
    dropPercentage: 35,
    color: 'from-amber-500 to-emerald-500'
  }
];

const AT_RISK_CUSTOMERS: ChurnCustomer[] = [
  {
    id: 'churn-1',
    cardHash: '6104-3378-****-1102',
    bankName: 'ملت',
    lastPurchaseDate: '۴۵ روز پیش',
    daysInactive: 45,
    totalHistoricalSpent: 85000000,
    riskLevel: 'HIGH',
    predictedLoss: 15000000
  },
  {
    id: 'churn-2',
    cardHash: '6219-8610-****-7741',
    bankName: 'سامان',
    lastPurchaseDate: '۳۸ روز پیش',
    daysInactive: 38,
    totalHistoricalSpent: 62000000,
    riskLevel: 'HIGH',
    predictedLoss: 12000000
  },
  {
    id: 'churn-3',
    cardHash: '5892-1012-****-3399',
    bankName: 'سپه',
    lastPurchaseDate: '۲۸ روز پیش',
    daysInactive: 28,
    totalHistoricalSpent: 41000000,
    riskLevel: 'MEDIUM',
    predictedLoss: 8000000
  },
  {
    id: 'churn-4',
    cardHash: '6037-9918-****-5511',
    bankName: 'ملی',
    lastPurchaseDate: '۲۲ روز پیش',
    daysInactive: 22,
    totalHistoricalSpent: 29000000,
    riskLevel: 'MEDIUM',
    predictedLoss: 5000000
  },
  {
    id: 'churn-5',
    cardHash: '5022-2910-****-8822',
    bankName: 'پاسارگاد',
    lastPurchaseDate: '۱۸ روز پیش',
    daysInactive: 18,
    totalHistoricalSpent: 19500000,
    riskLevel: 'LOW',
    predictedLoss: 3000000
  }
];

export default function FunnelPage() {
  const [funnelData] = useState<FunnelStep[]>(FUNNEL_STEPS);
  const [atRiskCustomers] = useState<ChurnCustomer[]>(AT_RISK_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [reengageModal, setReengageModal] = useState<{ isOpen: boolean; customer: ChurnCustomer | null }>({ isOpen: false, customer: null });
  const [offerText, setOfferText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredCustomers = atRiskCustomers.filter((c) => {
    const matchesSearch = c.cardHash.includes(searchQuery) || c.bankName.includes(searchQuery);
    const matchesRisk = selectedRisk === 'ALL' || c.riskLevel === selectedRisk;
    return matchesSearch && matchesRisk;
  });

  const openReengageModal = (customer: ChurnCustomer) => {
    const defaultMsg = `مشتری گرامی، دلتنگ حضور شما هستیم! تخفیف ویژه ۳۰٪ برای بازگشت شما تا ۴۸ ساعت آینده: COMEBACK30`;
    setOfferText(defaultMsg);
    setReengageModal({ isOpen: true, customer });
  };

  const handleSendOffer = async () => {
    if (!offerText.trim()) return;
    setIsSending(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSending(false);
    setReengageModal({ isOpen: false, customer: null });
    setToastMessage(`پیشنهاد بازگشت با موفقیت برای کارت ${reengageModal.customer?.cardHash.slice(-4)} ارسال گردید.`);

    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                <Filter className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                تحلیل قیف تبدیل و خروج (Churn)
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              پایش گام‌به‌گام ریزش کاربران در مسیر خرید و شناسایی مشتریان در خطر ریزش
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-sm">
            <button className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-indigo-600 text-white shadow-md shadow-indigo-200">
              ۳۰ روز گذشته
            </button>
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition">
              ۷ روز گذشته
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 p-4 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-200 stroke-[2.5]" />
                <span className="text-xs md:text-sm font-bold">{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">نرخ تبدیل کل (Overall CR)</span>
              <span className="text-xl font-black text-slate-900">۱۳.۰٪</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mr-1.5 border border-emerald-200">
                +۱.۸٪ بهبود
              </span>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Percent className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">بزرگ‌ترین ریزش (Drop-off)</span>
              <span className="text-xl font-black text-rose-600">۶۰.۰٪</span>
              <span className="text-[10px] font-bold text-slate-500 mr-1.5">گام سبد خرید</span>
            </div>
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <TrendingDown className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">مشتریان در خطر ریزش</span>
              <span className="text-xl font-black text-slate-900">۱۴۲ کارت</span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md mr-1.5 border border-amber-200">
                عدم خرید {'>'} ۳۰ روز
              </span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <UserMinus className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">ارزش فروش تعویق‌افتاده</span>
              <span className="text-xl font-black text-slate-900">۴۳,۰۰۰,۰۰۰</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">تومان</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Zap className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Visual Conversion Funnel Section */}
        <div className="bg-white p-6 md:p-8 rounded-[28px] border border-slate-200/80 shadow-xl mb-10">
          <div className="mb-6">
            <h2 className="text-base md:text-lg font-black text-slate-900 mb-1">
              نمودار بصری مراحل قیف تبدیل
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              بررسی نسبت کاربری که در هر مرحله وارد شده و میزان خروجی تا خرید نهایی
            </p>
          </div>

          <div className="space-y-4">
            {funnelData.map((step, idx) => (
              <div key={step.id} className="relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs md:text-sm font-extrabold text-slate-800">
                      {step.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-black">
                    <span className="text-slate-900">
                      {step.count.toLocaleString('fa-IR')} کاربر
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 rounded-xl text-slate-700">
                      {step.percentage}٪ از کل
                    </span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${step.percentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    className={`h-full rounded-full bg-gradient-to-r ${step.color}`}
                  />
                </div>

                {/* Drop-off connector */}
                {idx < funnelData.length - 1 && (
                  <div className="flex items-center justify-center my-2">
                    <div className="px-3 py-1 bg-rose-50 border border-rose-200/80 rounded-full text-[10px] font-black text-rose-600 flex items-center gap-1 shadow-sm">
                      <ArrowDown className="w-3 h-3" />
                      ریزش: {funnelData[idx + 1].dropPercentage}٪ از این مرحله
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Churn Risk Table Section */}
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-black text-slate-900">
                مشتریان شناسایی‌شده در خطر ریزش (At-Risk)
              </h2>
              <p className="text-xs font-bold text-slate-400 mt-0.5">
                مشتریان با سابقه خرید بالا که اخیراً فعالیتی نداشته‌اند
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجوی کارت یا بانک..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl pr-10 pl-4 py-2 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
                {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setSelectedRisk(risk)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                      selectedRisk === risk
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {risk === 'ALL' ? 'همه' : risk === 'HIGH' ? 'ریسک بالا' : risk === 'MEDIUM' ? 'ریسک متوسط' : 'پایین'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-extrabold">شماره کارت / بانک</th>
                  <th className="p-4 font-extrabold">مدت عدم فعالیت</th>
                  <th className="p-4 font-extrabold">سطح ریسک ریزش</th>
                  <th className="p-4 font-extrabold">کل خریدهای گذشته</th>
                  <th className="p-4 font-extrabold">زیان تقریبی عدم بازگشت</th>
                  <th className="p-4 font-extrabold text-center">اقدام تعاملی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-mono font-black text-slate-800 dir-ltr inline-block">
                        {c.cardHash}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                        بانک {c.bankName}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.lastPurchaseDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black inline-flex items-center gap-1 ${
                        c.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                        c.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        <AlertTriangle className="w-3 h-3" />
                        {c.riskLevel === 'HIGH' ? 'ریسک بالا' : c.riskLevel === 'MEDIUM' ? 'ریسک متوسط' : 'ریسک پایین'}
                      </span>
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      {c.totalHistoricalSpent.toLocaleString('fa-IR')} <span className="text-[10px] font-bold text-slate-400">تومان</span>
                    </td>
                    <td className="p-4 font-black text-rose-600">
                      {c.predictedLoss.toLocaleString('fa-IR')} <span className="text-[10px] font-bold text-slate-400">تومان</span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => openReengageModal(c)}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all shadow-md shadow-indigo-200 inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        ارسال مشوق بازگشت
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Re-engagement Offer */}
        <AnimatePresence>
          {reengageModal.isOpen && reengageModal.customer && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white p-6 rounded-[28px] w-full max-w-lg shadow-2xl border border-slate-100 relative"
              >
                <button
                  onClick={() => setReengageModal({ isOpen: false, customer: null })}
                  className="absolute left-5 top-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
                    <Sparkles className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      ارسال مشوق اختصاصی احیای مشتری
                    </h3>
                    <p className="text-xs font-bold text-slate-400">
                      گیرنده: کارت {reengageModal.customer.cardHash} (بانک {reengageModal.customer.bankName})
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-extrabold text-slate-700 block mb-2">
                    متن پیشنهاد بازگشت:
                  </label>
                  <textarea
                    value={offerText}
                    onChange={(e) => setOfferText(e.target.value)}
                    rows={4}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs md:text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSendOffer}
                    disabled={isSending || !offerText.trim()}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3.5 rounded-2xl text-xs md:text-sm font-black transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <span>در حال ارسال...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        تایید و ارسال پیشنهاد
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setReengageModal({ isOpen: false, customer: null })}
                    className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl text-xs md:text-sm font-bold transition"
                  >
                    انصراف
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}