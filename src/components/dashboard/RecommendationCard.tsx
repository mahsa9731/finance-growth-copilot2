'use client';

import React from 'react';
import { ActionableInsight } from '@/types/transaction';
import { AlertTriangle, ArrowLeft, Flame, Sparkles, Zap } from 'lucide-react';

interface Props {
  insight?: ActionableInsight | null;
  onExecuteAction?: (insight: ActionableInsight) => void;
}

export default function RecommendationCard({ insight, onExecuteAction }: Props) {
  if (!insight) return null;

  const getConfig = () => {
    switch (insight.type) {
      case 'CRITICAL':
        return {
          cardBg: 'bg-gradient-to-br from-rose-50 via-white to-rose-100/40 border-rose-300',
          badgeBg: 'bg-rose-600 text-white shadow-rose-200 shadow-md',
          accentText: 'text-rose-700',
          buttonBg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-300',
          tag: '🚨 فوری / اصطکاک پرداخت',
          icon: AlertTriangle,
        };
      case 'WARNING':
        return {
          cardBg: 'bg-gradient-to-br from-amber-50 via-white to-amber-100/40 border-amber-300',
          badgeBg: 'bg-amber-600 text-white shadow-amber-200 shadow-md',
          accentText: 'text-amber-800',
          buttonBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-300',
          tag: '⚠️ کیفیت فنی درگاه‌ها',
          icon: Flame,
        };
      case 'OPPORTUNITY':
      default:
        return {
          cardBg: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100/40 border-emerald-300',
          badgeBg: 'bg-emerald-600 text-white shadow-emerald-200 shadow-md',
          accentText: 'text-emerald-800',
          buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-300',
          tag: '💡 تحلیل صنف و کارمزد',
          icon: Zap,
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className={`relative overflow-hidden rounded-3xl border-2 ${config.cardBg} p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between gap-5 dir-rtl`}>
      
      {/* هدر کارت */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
        <span className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black ${config.badgeBg}`}>
          <Icon className="h-4 w-4 animate-bounce" />
          <span>{config.tag}</span>
        </span>
        
        {insight.formattedImpact && (
          <span className={`text-xs font-black ${config.accentText} bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs`}>
            {insight.formattedImpact}
          </span>
        )}
      </div>

      {/* تیتر و توضیحات */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-lg font-black text-slate-950 leading-snug">
          {insight.title}
        </h4>
        <p className="text-sm font-bold text-slate-800 leading-relaxed">
          {insight.description}
        </p>
      </div>

      {/* ردپای داده‌ها */}
      {insight.explanation?.formula && (
        <div className="rounded-2xl bg-white/90 backdrop-blur-md p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 mb-1.5 text-slate-900 text-xs font-black">
            <Sparkles className="h-4 w-4 text-amber-500 fill-amber-400" />
            <span>فرمول و مبنای محاسبه:</span>
          </div>
          <p className="text-xs font-bold text-slate-700 leading-relaxed">
            {insight.explanation.formula}
          </p>
        </div>
      )}

      {/* دکمه اقدام */}
      {insight.actionText && (
        <button
          onClick={() => onExecuteAction && onExecuteAction(insight)}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-black text-white shadow-lg transition-all active:scale-95 ${config.buttonBg}`}
        >
          <span>{insight.actionText}</span>
          <ArrowLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}