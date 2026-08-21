'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  RotateCcw, 
  AlertTriangle, 
  TrendingDown, 
  Search, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Info,
  ShieldCheck,
  Eye,
  Filter
} from 'lucide-react';

interface RiskTransaction {
  id: string;
  orderId: string;
  amount: number;
  customer: string;
  riskScore: number; // 0 to 100
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  refundReason: string;
  gateway: string;
  date: string;
  status: 'PENDING_REVIEW' | 'REFUNDED' | 'REJECTED';
}

const INITIAL_RISK_DATA: RiskTransaction[] = [
  {
    id: 'risk-101',
    orderId: 'ORD-9821',
    amount: 14500000,
    customer: '۶۱۰۴-۳۳۷۸-****-۹۰۱۲',
    riskScore: 88,
    riskLevel: 'HIGH',
    refundReason: 'خرید مکرر ناموفق با IP مشکوک',
    gateway: 'سامان',
    date: 'امروز - ۱۴:۲۰',
    status: 'PENDING_REVIEW'
  },
  {
    id: 'risk-102',
    orderId: 'ORD-9780',
    amount: 2800000,
    customer: '۶۲۱۹-۸۶۱۰-****-۴۴۱۰',
    riskScore: 45,
    riskLevel: 'MEDIUM',
    refundReason: 'عدم تطابق نام دارنده کارت و حساب',
    gateway: 'زرین‌پال',
    date: 'امروز - ۱۱:۰۵',
    status: 'REFUNDED'
  },
  {
    id: 'risk-103',
    orderId: 'ORD-9654',
    amount: 32000000,
    customer: '۵۸۹۲-۱۰۱۲-****-۱۱۸۸',
    riskScore: 92,
    riskLevel: 'HIGH',
    refundReason: 'درخواست عودت وجه توسط مشتری (انصراف)',
    gateway: 'ملت',
    date: 'دیروز - ۱۸:۴۵',
    status: 'PENDING_REVIEW'
  },
  {
    id: 'risk-104',
    orderId: 'ORD-9510',
    amount: 850000,
    customer: '۶۰۳۷-۹۹۱۸-****-۳۳۲۱',
    riskScore: 15,
    riskLevel: 'LOW',
    refundReason: 'خطای سیستمی کسر مضاعف',
    gateway: 'سامان',
    date: '۲ روز پیش',
    status: 'REJECTED'
  }
];

export default function RiskAnalysisPage() {
  const [transactions, setTransactions] = useState<RiskTransaction[]>(INITIAL_RISK_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'HIGH' | 'PENDING'>('ALL');
  const [selectedTx, setSelectedTx] = useState<RiskTransaction | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredData = transactions.filter((item) => {
    const matchesSearch = item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) || item.customer.includes(searchQuery);
    if (selectedFilter === 'HIGH') return matchesSearch && item.riskLevel === 'HIGH';
    if (selectedFilter === 'PENDING') return matchesSearch && item.status === 'PENDING_REVIEW';
    return matchesSearch;
  });

  const handleAction = (id: string, newStatus: 'REFUNDED' | 'REJECTED') => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    setSelectedTx(null);
    setToastMessage(newStatus === 'REFUNDED' ? 'بازگشت وجه با موفقیت تایید و اعمال شد.' : 'درخواست بازگشت وجه رد شد.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                تحلیل ریسک و مدیریت بازگشت وجه
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              پایش کشف کلاهبرداری، تراکنش‌های مشکوک و رسیدگی به استرداد اموال (Chargeback)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl text-xs font-black flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              ۲ تراکنش نیازمند بررسی فوری
            </span>
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 p-4 bg-blue-900 text-white rounded-2xl shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                <span className="text-xs md:text-sm font-bold">{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">نرخ بازگشت وجه (Chargeback Rate)</span>
              <span className="text-xl font-black text-slate-900">۰.۴۲٪</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mr-1.5 border border-emerald-200">
                محدوده امن
              </span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">تراکنش‌های پرریسک شناسایی‌شده</span>
              <span className="text-xl font-black text-rose-600">۱۲ مورد</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">این ماه</span>
            </div>
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">مبلغ استرداد شده</span>
              <span className="text-xl font-black text-slate-900">۴۲,۸۰۰,۰۰۰</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">تومان</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <TrendingDown className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">امتیاز سلامت امنیتی درگاه</span>
              <span className="text-xl font-black text-emerald-600">۹۴ از ۱۰۰</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Filters and Table */}
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="جستجوی شماره سفارش یا شماره کارت..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-10 pl-4 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              <button
                onClick={() => setSelectedFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                  selectedFilter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                همه موارد
              </button>
              <button
                onClick={() => setSelectedFilter('HIGH')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                  selectedFilter === 'HIGH' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ریسک بالا
              </button>
              <button
                onClick={() => setSelectedFilter('PENDING')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                  selectedFilter === 'PENDING' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                در انتظار بررسی
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-extrabold">کد سفارش</th>
                  <th className="p-4 font-extrabold">مبلغ</th>
                  <th className="p-4 font-extrabold">کارت / کاربر</th>
                  <th className="p-4 font-extrabold">شاخص ریسک (Fraud Score)</th>
                  <th className="p-4 font-extrabold">دلیل استرداد / هشدار</th>
                  <th className="p-4 font-extrabold">وضعیت</th>
                  <th className="p-4 font-extrabold text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-black text-slate-900 dir-ltr text-right">
                      {tx.orderId}
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      {tx.amount.toLocaleString('fa-IR')} <span className="text-[10px] font-bold text-slate-400">تومان</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-600 dir-ltr text-right">
                      {tx.customer}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                          tx.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-700' :
                          tx.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {tx.riskScore}٪
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-600">{tx.refundReason}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black ${
                        tx.status === 'PENDING_REVIEW' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        tx.status === 'REFUNDED' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                        'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {tx.status === 'PENDING_REVIEW' ? 'در انتظار بررسی' :
                         tx.status === 'REFUNDED' ? 'مسترد شده' : 'رد شده'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="p-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-xl transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail & Action */}
        <AnimatePresence>
          {selectedTx && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white p-6 rounded-[28px] w-full max-w-lg shadow-2xl border border-slate-100 relative"
              >
                <button
                  onClick={() => setSelectedTx(null)}
                  className="absolute left-5 top-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl">
                    <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">جزئیات بررسی ریسک سفارش</h3>
                    <p className="text-xs font-bold text-slate-400">کد سفارش: {selectedTx.orderId}</p>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-extrabold text-slate-700 mb-6">
                  <div className="flex justify-between">
                    <span>مبلغ تراکنش:</span>
                    <span className="text-slate-900">{selectedTx.amount.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span>درگاه پرداخت:</span>
                    <span className="text-slate-900">{selectedTx.gateway}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>شماره کارت:</span>
                    <span className="text-slate-900 font-mono dir-ltr">{selectedTx.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>علت مشکوک بودن:</span>
                    <span className="text-rose-600">{selectedTx.refundReason}</span>
                  </div>
                </div>

                {selectedTx.status === 'PENDING_REVIEW' ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction(selectedTx.id, 'REFUNDED')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-xs font-black transition-all shadow-md shadow-blue-200"
                    >
                      تایید استرداد وجه (Refund)
                    </button>
                    <button
                      onClick={() => handleAction(selectedTx.id, 'REJECTED')}
                      className="px-4 bg-slate-100 text-slate-700 py-3 rounded-2xl text-xs font-bold hover:bg-slate-200 transition"
                    >
                      رد درخواست
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs font-bold text-slate-400 bg-slate-100 rounded-2xl">
                    این تراکنش تعیین تکلیف شده است.
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}