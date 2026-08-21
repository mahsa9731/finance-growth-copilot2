'use client';

import React, { useState } from 'react';
import { ActionableInsight } from '@/types/transaction';
import { Sparkles, CheckCircle2, X, ShieldAlert, Zap } from 'lucide-react';

interface Props {
  insight: ActionableInsight | null;
  onClose: () => void;
}

export default function InsightActionModal({ insight, onClose }: Props) {
  const [applied, setApplied] = useState(false);

  if (!insight) return null;

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 dir-rtl animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-white border-2 border-slate-200 p-6 shadow-2xl flex flex-col gap-5">
        
        {/* کلید بستن */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* هدر پاپ‌آپ */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
            <Zap className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              اصلاح هوشمند آنلاین
            </span>
            <h3 className="text-base font-black text-slate-900 mt-1">
              {insight.title}
            </h3>
          </div>
        </div>

        {applied ? (
          /* حالت پس از اعمال موفقیت‌آمیز */
          <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-black text-slate-900">تنظیمات با موفقیت اعمال شد!</h4>
            <p className="text-xs font-bold text-slate-600">
              الگوریتم هوشمند درگاه، پایش تراکنش‌های شما را بر اساس این پیشنهاد به‌روزرسانی کرد.
            </p>
          </div>
        ) : (
          /* محتوای پیشنهاد و راهکار */
          <>
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-xs font-extrabold text-slate-700 leading-relaxed">
                  {insight.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-black text-amber-900">راهکار پیشنهادی سیستم:</span>
                  <p className="text-xs font-bold text-amber-800 leading-normal">
                    {typeof insight.explanation === 'string'
                      ? insight.explanation
                      : 'فعال‌سازی سوییچینگ هوشمند برای کاهش لغو تراکنش‌ها'}
                  </p>
                </div>
              </div>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleApply}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-xl transition-all active:scale-95"
              >
                تایید و اعمال خودکار راهکار
              </button>
              <button
                onClick={onClose}
                className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-all"
              >
                انصراف
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}