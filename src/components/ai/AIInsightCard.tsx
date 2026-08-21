"use client";

import { Sparkles, ArrowLeft } from "lucide-react";

interface AIInsightCardProps {
  insight?: {
    type: string;
    title: string;
    description: string;
    formattedImpact: string;
    actionText: string;
  };
}

export default function AIInsightCard({ insight }: AIInsightCardProps) {
  if (!insight) {
    return (
      <div className="w-full bg-white rounded-3xl border border-blue-100 p-6 shadow-[0_15px_50px_rgba(37,99,235,0.06)] dir-rtl">
        <h3 className="text-sm font-black text-blue-950">بینش هوشمند</h3>
        <p className="text-xs font-bold text-blue-800 mt-2 leading-6">
          در حال حاضر بینش مهمی برای نمایش وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl border border-blue-100 p-6 shadow-[0_15px_50px_rgba(37,99,235,0.08)] relative overflow-hidden dir-rtl">
      <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-blue-100/70 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-blue-950">بینش امروز</h3>
              <p className="text-[11px] font-bold text-blue-800 mt-0.5">
                تحلیل هوشمند کسب‌وکار
              </p>
            </div>
          </div>

          <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-100">
            AI INSIGHT
          </span>
        </div>

        <h2 className="text-base font-black text-blue-950 leading-7">
          {insight.title}
        </h2>

        <p className="text-base font-extrabold text-blue-950 leading-8 mt-3">
          {insight.description}
        </p>

        {insight.formattedImpact && (
          <div className="mt-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-xs text-blue-800 font-bold mb-1">
              تأثیر احتمالی
            </p>
            <p className="text-lg font-black text-blue-900">
              {insight.formattedImpact}
            </p>
          </div>
        )}

        {insight.actionText && (
          <button className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2">
            <span>{insight.actionText}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}