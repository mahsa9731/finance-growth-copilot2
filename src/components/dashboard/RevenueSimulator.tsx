'use client';

import React, { useState } from 'react';
import {
  Sliders,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

interface RevenueSimulatorProps {
  totalVolumeToman?: number;
  overallSuccessRate?: number;
}

export const RevenueSimulator: React.FC<RevenueSimulatorProps> = ({
  totalVolumeToman = 248420000,
  overallSuccessRate = 84.2,
}) => {
  const [conversionBoost, setConversionBoost] = useState<number>(3.5);
  const [smartRoutingActive, setSmartRoutingActive] = useState<boolean>(true);
  const [otpRecoveryActive, setOtpRecoveryActive] = useState<boolean>(true);

  const calculatedBoost =
    conversionBoost + (smartRoutingActive ? 1.2 : 0) + (otpRecoveryActive ? 0.8 : 0);

  const monthlyExtraRevenue = Math.round(totalVolumeToman * (calculatedBoost / 100));
  const yearlyExtraRevenue = monthlyExtraRevenue * 12;

  const getStatusBadge = () => {
    if (calculatedBoost < 3) {
      return {
        label: 'بهبود معمولی (زرد)',
        color: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
        text: 'حداقل تغییر برای جبران ریزش‌های جزئی',
      };
    }
    return {
      label: 'رشد جهشی سود (سبز)',
      color: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
      text: 'بازگردانی حداکثری مشتریان منصرف‌شده و رشد مستقیم درآمد',
    };
  };

  const status = getStatusBadge();

  return (
    <div className="glass-panel p-6 lg:p-8 rounded-3xl space-y-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black text-slate-800">
              شبیه‌ساز سود: چقدر پول روی زمین افتاده است؟
            </h3>
            <span className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full border ${status.color}`}>
              {status.label}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            با اصلاح خطاهای درگاه، این مقدار پول نقد مستقیماً به حساب شما اضافه می‌شود.
          </p>
        </div>

        <div className="bg-white/80 px-4 py-2 rounded-2xl border border-white font-bold text-xs text-slate-700 shadow-sm">
          فروش فعلی شما: <span className="text-indigo-900 font-black">{totalVolumeToman.toLocaleString('fa-IR')}</span> تومان/ماه
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white/60 p-4 rounded-2xl border border-white space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-800">
              <span>میزان بهبود هدف‌گذاری شده:</span>
              <span className="text-sm font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
                ٪{conversionBoost.toLocaleString('fa-IR')}+ افزایش فروش
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={conversionBoost}
              onChange={(e) => setConversionBoost(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setSmartRoutingActive(!smartRoutingActive)}
              className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                smartRoutingActive
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 font-bold'
                  : 'bg-white/40 border-white/60 text-slate-400'
              }`}
            >
              <div>
                <p className="text-xs">حل اختلال بانک‌ها (مسیریابی)</p>
                <span className="text-[10px] text-emerald-700 font-normal">+۱.۲٪ افزایش سود</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                {smartRoutingActive ? 'فعال' : 'غیرفعال'}
              </span>
            </button>

            <button
              onClick={() => setOtpRecoveryActive(!otpRecoveryActive)}
              className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                otpRecoveryActive
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 font-bold'
                  : 'bg-white/40 border-white/60 text-slate-400'
              }`}
            >
              <div>
                <p className="text-xs">پیامک بازگشت خریداران منصرف</p>
                <span className="text-[10px] text-emerald-700 font-normal">+۰.۸٪ افزایش سود</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                {otpRecoveryActive ? 'فعال' : 'غیرفعال'}
              </span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-3xl space-y-4 shadow-xl">
          <span className="text-xs text-emerald-100 font-bold block">
            💵 سود اضافی که ماهانه به حسابتان می‌آید:
          </span>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black">
              +{monthlyExtraRevenue.toLocaleString('fa-IR')}
            </span>
            <span className="text-xs font-bold text-emerald-200">تومان در ماه</span>
          </div>

          <div className="pt-3 border-t border-white/20 flex justify-between items-center text-xs text-emerald-100">
            <span>درآمد اضافه در سال:</span>
            <strong className="text-white text-sm font-black">
              +{yearlyExtraRevenue.toLocaleString('fa-IR')} تومان
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};