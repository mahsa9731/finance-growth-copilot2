'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowUpLeft, ShieldAlert, Sparkles } from 'lucide-react';

interface HealthStatusProps {
  successRate?: number;
  failedCount?: number;
  totalVolumeToman?: number;
}

export const BusinessHealthStatus: React.FC<HealthStatusProps> = ({
  successRate = 84.2,
  failedCount = 32110,
  totalVolumeToman = 248420000,
}) => {
 
  const estimatedLostRevenue = Math.round(totalVolumeToman * ((100 - successRate) / 100));

  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>ارزیابی سریع وضعیت درگاه و درآمد (چراغ راهنمای کسب‌وکار)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            خلاصه وضعیت درگاه پرداخت شما بدون پیچیدگی‌های فنی
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="glass-panel p-5 rounded-3xl border-r-4 border-r-emerald-500 bg-emerald-500/5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              وضعیت عالی (سبز)
            </span>
            <span className="text-[10px] font-bold text-emerald-800/60">بخش تثبیت‌شده</span>
          </div>

          <h4 className="text-sm font-extrabold text-slate-800">
            نرخ نقدشوندگی و پردازش پایدار
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            <strong>٪{successRate.toLocaleString('fa-IR')}</strong> از خریداران شما بدون هیچ مشکلی پرداخت خود را کامل کرده‌اند. جریان فروش اصلی شما روان است و نیاز به تغییر بنیادی ندارد.
          </p>

          <div className="pt-2 border-t border-emerald-500/20 flex justify-between items-center text-[11px] font-bold text-emerald-800">
            <span>تراکنش‌های موفق:</span>
            <span>عالی و بدون اختلال</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border-r-4 border-r-amber-500 bg-amber-500/5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/20">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              نیازمند توجه (زرد)
            </span>
            <span className="text-[10px] font-bold text-amber-800/60">فرصت افزایش سود</span>
          </div>

          <h4 className="text-sm font-extrabold text-slate-800">
            ریزش مشتریان در مرحله رمز دوم (OTP)
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            حدود <strong>٪۱۵ از مشتریان</strong> هنگام دریافت رمز پویا یا انصراف دستی درگاه را می‌بندند. با فعال‌سازی پیامک بازگشت خرید، می‌توانید نصف این افراد را برگردانید.
          </p>

          <div className="pt-2 border-t border-amber-500/20 flex justify-between items-center text-[11px] font-bold text-amber-800">
            <span>اقدام پیشنهادی:</span>
            <span className="underline cursor-pointer">فعال‌سازی یادآوری خرید</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border-r-4 border-r-rose-500 bg-rose-500/5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-black text-rose-700 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-500/20">
              <XCircle className="w-4 h-4 text-rose-600" />
              بحرانی و زیان‌ده (قرمز)
            </span>
            <span className="text-[10px] font-bold text-rose-800/60">نشتی درآمد</span>
          </div>

          <h4 className="text-sm font-extrabold text-slate-800">
            از دست رفتن {estimatedLostRevenue.toLocaleString('fa-IR')} تومان فروش
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            دقیقاً <strong>{failedCount.toLocaleString('fa-IR')} تراکنش</strong> به دلیل اختلالات زیرساختی بانک‌ها ناموفق شده است. این پول وارد حساب شما نشده و مشتریان ناراضی رفته‌اند!
          </p>

          <div className="pt-2 border-t border-rose-500/20 flex justify-between items-center text-[11px] font-bold text-rose-800">
            <span>راهکار فوری:</span>
            <span className="bg-rose-600 text-white px-2 py-0.5 rounded-md font-extrabold">
              مسیریابی هوشمند سوئیچ
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};