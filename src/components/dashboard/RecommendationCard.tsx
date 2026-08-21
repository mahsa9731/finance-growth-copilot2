'use client';

import React from 'react';
import { ActionableInsight } from '@/types/transaction';
import { AlertCircle, ArrowUpRight, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

interface Props {
  insight: ActionableInsight;
  onExecuteAction?: (id: string) => void;
}

export default function RecommendationCard({ insight, onExecuteAction }: Props) {
  const getBadgeStyle = () => {
    switch (insight.type) {
      case 'CRITICAL':
        return { bg: 'bg-rose-50 border-rose-200 text-rose-700', icon: AlertCircle };
      case 'WARNING':
        return { bg: 'bg-amber-50 border-amber-200 text-amber-700', icon: RefreshCw };
      case 'OPPORTUNITY':
        return { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: Zap };
      default:
        return { bg: 'bg-blue-50 border-blue-200 text-blue-700', icon: CheckCircle2 };
    }
  };

  const badge = getBadgeStyle();
  const Icon = badge.icon;

  return (
    <div className="p-5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 ${badge.bg}`}>
            <Icon className="w-3.5 h-3.5" />
            <span>{insight.formattedImpact}</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">شناسه: {insight.id}</span>
        </div>

        <h4 className="font-bold text-slate-900 text-sm mb-1">{insight.title}</h4>
        <p className="text-xs text-slate-600 leading-relaxed">{insight.description}</p>
      </div>

      {/* Traceability / Formula Accordion */}
      <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-[11px] text-slate-500 font-mono dir-ltr text-right">
        <span className="text-slate-400 block font-sans mb-0.5 dir-rtl">منبع و نحوه محاسبه:</span>
        <code>{insight.explanation.formula}</code>
      </div>

      <button
        onClick={() => onExecuteAction && onExecuteAction(insight.id)}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-sm"
      >
        <span>{insight.actionText}</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
}