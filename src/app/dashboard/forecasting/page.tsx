'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Sparkles, 
  Target, 
  Lightbulb, 
  ArrowUpRight, 
  PieChart, 
  Zap, 
  ShoppingBag, 
  Sliders 
} from 'lucide-react';

interface ForecastMonth {
  monthName: string;
  realistic: number;
  optimistic: number;
  pessimistic: number;
  growthRate: number;
}

const FORECAST_DATA: ForecastMonth[] = [
  {
    monthName: 'شهریور ۱۴۰۵',
    realistic: 1850000000,
    optimistic: 2100000000,
    pessimistic: 1600000000,
    growthRate: 12.5
  },
  {
    monthName: 'مهر ۱۴۰۵',
    realistic: 2200000000,
    optimistic: 2550000000,
    pessimistic: 1900000000,
    growthRate: 18.9
  },
  {
    monthName: 'آبان ۱۴۰۵',
    realistic: 2600000000,
    optimistic: 3100000000,
    pessimistic: 2200000000,
    growthRate: 18.1
  }
];

export default function ForecastingPage() {
  const [selectedScenario, setSelectedScenario] = useState<'realistic' | 'optimistic' | 'pessimistic'>('realistic');

  const totalProjected = FORECAST_DATA.reduce((acc, item) => acc + item[selectedScenario], 0);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                پیش‌بینی هوشمند فروش و تحلیل آینده
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              تخمین درآمد، بررسی سناریوهای مالی و توصیه‌های راهبردی بر اساس تحلیل داده‌های قبلی
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-sm flex items-center gap-1">
            <button
              onClick={() => setSelectedScenario('pessimistic')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                selectedScenario === 'pessimistic' ? 'bg-rose-100 text-rose-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              بدبینانه
            </button>
            <button
              onClick={() => setSelectedScenario('realistic')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                selectedScenario === 'realistic' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              واقع‌بینانه (پایه)
            </button>
            <button
              onClick={() => setSelectedScenario('optimistic')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                selectedScenario === 'optimistic' ? 'bg-emerald-100 text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              خوش‌بینانه
            </button>
          </div>
        </div>

        {/* Projected Value Header Card */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-[32px] p-6 md:p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-indigo-200 text-xs md:text-sm font-bold flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-indigo-400" />
                مجموع فروش پیش‌بینی‌شده پاییز (۳ ماه آینده)
              </span>
              <div className="text-3xl md:text-5xl font-black tracking-tight text-white flex items-baseline gap-2">
                {totalProjected.toLocaleString('fa-IR')}
                <span className="text-base md:text-lg font-extrabold text-indigo-300">تومان</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] text-slate-300 block font-semibold">نرخ رشد میانگین پیش‌بینی‌شده</span>
                <span className="text-lg font-black text-emerald-400">+۱۶.۵٪ نسبت به تابستان</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Projection Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {FORECAST_DATA.map((item, idx) => {
            const currentValue = item[selectedScenario];
            return (
              <motion.div
                key={item.monthName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[28px] border border-slate-200/80 p-6 shadow-xl relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                    {item.monthName}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                    {item.growthRate}%
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-400 block mb-1">پیش‌بینی فروش این ماه</span>
                <div className="text-xl font-black text-slate-900 mb-4">
                  {currentValue.toLocaleString('fa-IR')} <span className="text-xs text-slate-400 font-bold">تومان</span>
                </div>

                {/* Scenario details small bar */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-[11px] font-bold">
                  <div className="flex justify-between text-slate-500">
                    <span>حالت بدبینانه:</span>
                    <span className="text-rose-600">{item.pessimistic.toLocaleString('fa-IR')}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>حالت خوش‌بینانه:</span>
                    <span className="text-emerald-600">{item.optimistic.toLocaleString('fa-IR')}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Friendly AI Advice & Strategy Section */}
        <div className="bg-white rounded-[28px] border border-slate-200/80 p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
              <Lightbulb className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-black text-slate-900">
                توصیه‌ها و چشم‌انداز راهبردی (تولیدشده توسط سیستم تحلیل هوشمند)
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                اقدامات عملی پیشنهادی برای محقق شدن سناریوی خوش‌بینانه در پاییز
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl mt-1">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                  تامین موجودی انبار برای مهرماه (شروع مدارس/دانشگاه‌ها)
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  طبق الگوی سال گذشته، در انتهای شهریور و اوایل مهر شاهد پرش ۳۰ درصدی تراکنش‌ها خواهیم بود. پیشنهاد می‌شود موجودی کالاهای پرفروش حداقل از ۲۰ شهریور تکمیل شده باشد تا با ریسک اتمام موجودی (Out of Stock) مواجه نشوید.
                </p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl mt-1">
                <Zap className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                  کمپین بازگشت مشتریان در خطر ریزش در آبان
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  برای آبان‌ماه، تخفیف‌های پله‌ای (Tiered Discount) روی لیست مشتریان وفاداری که بیش از ۴۰ روز خرید نداشته‌اند تنظیم کنید. این اقدام می‌تواند سناریوی فروش آبان را از حالت واقع‌بینانه به خوش‌بینانه شیفت دهد.
                </p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl mt-1">
                <Sliders className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                  پایداری درگاه در ساعات پیک خرید
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  با توجه به افزایش حجم تراکنش‌ها در مهر و آبان، تنظیمات سویچینگ هوشمند بین زرین‌پال و درگاه‌های مستقیم بانک سامان/ملت را حتما فعال نگه دارید تا ریزش ناشی از قطعی شبکه بانکی به حداقل برسد.
                </p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl mt-1">
                <PieChart className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                  بهینه‌سازی سبد خرید (Cross-selling)
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  افزایش میانگین ارزش هر سفارش (AOV) از طریق پیشنهاد مکمل محصولات در مرحله افزودن به سبد خرید، آسان‌ترین راه برای تحقق سناریوی خوش‌بینانه بدون نیاز به افزایش ورودی کل سایت است.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}