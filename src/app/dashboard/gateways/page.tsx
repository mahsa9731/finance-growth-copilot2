'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  AlertOctagon, 
  CheckCircle2, 
  RefreshCw, 
  X, 
  Zap, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  Server,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface Gateway {
  id: string;
  name: string;
  provider: string;
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  successRate: number;
  avgLatencyMs: number;
  totalTransactions: number;
  failedTransactions: number;
  isActive: boolean;
}

const INITIAL_GATEWAYS: Gateway[] = [
  {
    id: 'gw-1',
    name: 'زرین‌پال (ZarinPal)',
    provider: 'زرین‌پال',
    status: 'HEALTHY',
    successRate: 98.4,
    avgLatencyMs: 320,
    totalTransactions: 14200,
    failedTransactions: 227,
    isActive: true
  },
  {
    id: 'gw-2',
    name: 'درگاه مستقیم بانک سامان (SEP)',
    provider: 'بانک سامان',
    status: 'HEALTHY',
    successRate: 96.1,
    avgLatencyMs: 410,
    totalTransactions: 9800,
    failedTransactions: 382,
    isActive: true
  },
  {
    id: 'gw-3',
    name: 'درگاه مستقیم به پرداخت ملت',
    provider: 'بانک ملت',
    status: 'DEGRADED',
    successRate: 81.5,
    avgLatencyMs: 1250,
    totalTransactions: 6100,
    failedTransactions: 1128,
    isActive: false
  }
];

export default function GatewaysPage() {
  const [gateways, setGateways] = useState<Gateway[]>(INITIAL_GATEWAYS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleGateway = (id: string) => {
    setGateways(prev => prev.map(gw => {
      if (gw.id === id) {
        const nextState = !gw.isActive;
        setToastMessage(`وضعیت ${gw.name} به ${nextState ? 'فعال' : 'غیرفعال'} تغییر یافت.`);
        return { ...gw, isActive: nextState };
      }
      return gw;
    }));

    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                پایش پایداری درگاه‌های پرداخت (Gateways Uptime)
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              تحلیل زنده درصد موفقیت (Success Rate)، زمان پاسخ‌دهی و مدیریت هوشمند سویچینگ درگاه‌ها
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-emerald-800">سیستم مسیریابی هوشمند درگاه: فعال</span>
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 p-4 bg-slate-900 text-white rounded-2xl shadow-lg flex items-center justify-between"
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

        {/* Stat KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">مجموع تراکنش‌های ۲۴ ساعت</span>
              <span className="text-xl font-black text-slate-900">۳۰,۱۰_۰</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">تراکنش</span>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Server className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">میانگین نرخ موفقیت کل</span>
              <span className="text-xl font-black text-emerald-600">۹۴.۲٪</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mr-1.5 border border-emerald-200">
                عالی
              </span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">میانگین زمان پاسخ‌دهی (Latency)</span>
              <span className="text-xl font-black text-slate-900">۴۸۰</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">میلی‌ثانیه</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Gateways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {gateways.map((gw) => (
            <div
              key={gw.id}
              className={`bg-white rounded-[28px] border p-6 transition-all shadow-xl relative overflow-hidden ${
                gw.status === 'HEALTHY' ? 'border-slate-200/80 shadow-slate-500/5' :
                gw.status === 'DEGRADED' ? 'border-amber-300 shadow-amber-500/5' :
                'border-rose-300 shadow-rose-500/5'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-base text-slate-900">{gw.name}</h3>
                  <span className="text-[11px] font-bold text-slate-400 block mt-0.5">ارائه‌دهنده: {gw.provider}</span>
                </div>
                
                <button 
                  onClick={() => toggleGateway(gw.id)}
                  className="text-indigo-600 hover:text-indigo-800 transition"
                >
                  {gw.isActive ? (
                    <ToggleRight className="w-8 h-8 text-indigo-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-300" />
                  )}
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-6 flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black inline-flex items-center gap-1 ${
                  gw.status === 'HEALTHY' ? 'bg-emerald-100 text-emerald-700' :
                  gw.status === 'DEGRADED' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {gw.status === 'HEALTHY' && <CheckCircle2 className="w-3 h-3" />}
                  {gw.status === 'DEGRADED' && <AlertOctagon className="w-3 h-3" />}
                  {gw.status === 'HEALTHY' ? 'پایدار و عالی' : gw.status === 'DEGRADED' ? 'کندی / خطای نسبی' : 'قطعی کامل'}
                </span>
                
                {!gw.isActive && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-extrabold">
                    خارج از مدار پرداخت
                  </span>
                )}
              </div>

              {/* Metrics */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-500">نرخ موفقیت (Success Rate):</span>
                  <span className={`font-black ${gw.successRate >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {gw.successRate}٪
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-500">زمان تاخیر (Latency):</span>
                  <span className="font-black text-slate-800 font-mono">{gw.avgLatencyMs} ms</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-500">کل تراکنش‌ها:</span>
                  <span className="font-black text-slate-800">{gw.totalTransactions.toLocaleString('fa-IR')}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-500">تراکنش ناموفق:</span>
                  <span className="font-black text-rose-600">{gw.failedTransactions.toLocaleString('fa-IR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Error Breakdown Section */}
        <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl">
          <div className="mb-6">
            <h2 className="text-base font-black text-slate-900">تحلیل علت تراکنش‌های ناموفق (Payment Failure Reasons)</h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              تفکیک انصراف کاربر، خطای شبکه بانکی و عدم موجودی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs font-extrabold text-slate-400 block mb-1">انصراف توسط کاربر</span>
              <span className="text-lg font-black text-slate-800">۵۲٪</span>
              <p className="text-[11px] font-bold text-slate-400 mt-1">بستن درگاه یا پشیمانی از خرید</p>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
              <span className="text-xs font-extrabold text-amber-700 block mb-1">موجودی کافی نیست / رمز اشتباه</span>
              <span className="text-lg font-black text-amber-900">۳۴٪</span>
              <p className="text-[11px] font-bold text-amber-600 mt-1">خطاهای مربوط به کارت خریدار</p>
            </div>

            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
              <span className="text-xs font-extrabold text-rose-700 block mb-1">قطعی شاپرک / سرور بانک</span>
              <span className="text-lg font-black text-rose-900">۱۴٪</span>
              <p className="text-[11px] font-bold text-rose-600 mt-1">خطای مستقیم شبکه زیرساخت پرداخت</p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}