'use client';

import React from 'react';
import { AggregatedMetrics } from '@/types/transaction';
import { DollarSign, ShoppingCart, AlertTriangle, Users } from 'lucide-react';

interface Props {
  metrics?: AggregatedMetrics | null;
}

export default function KPICards({ metrics }: Props) {
  // استخراج ایمن مقادیر با مقدار پیش‌فرض صفر جهت جلوگیری از خطای undefined
  const totalRevenue = metrics?.totalRevenue ?? 0;
  const successfulTransactions = metrics?.successfulTransactions ?? 0;
  const overallSuccessRate = metrics?.overallSuccessRate ?? 0;
  const totalTransactions = metrics?.totalTransactions ?? 0;
  const attemptedFailedVolume = metrics?.attemptedFailedVolume ?? 0;
  const topLoyalPayersCount = metrics?.topLoyalPayersCount ?? 0;
  const uniquePayers = metrics?.uniquePayers ?? 0;

  const cards = [
    {
      title: 'فروش کل موفق',
      value: `${Math.round(totalRevenue / 10).toLocaleString('fa-IR')} تومان`,
      subtext: `از ${successfulTransactions.toLocaleString('fa-IR')} تراکنش موفق`,
      icon: DollarSign,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    },
    {
      title: 'نرخ موفقیت کل (Conversion)',
      value: `${overallSuccessRate}٪`,
      subtext: `از مجموع ${totalTransactions.toLocaleString('fa-IR')} جلسه پرداخت`,
      icon: ShoppingCart,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200',
    },
    {
      title: 'فروش از دست‌رفته (خطای درگاه)',
      value: `${Math.round(attemptedFailedVolume / 10).toLocaleString('fa-IR')} تومان`,
      subtext: 'قابل احیا با سوئیچینگ هوشمند',
      icon: AlertTriangle,
      color: 'bg-rose-500/10 text-rose-600 border-rose-200',
    },
    {
      title: 'مشتریان وفادار (لیدربورد)',
      value: `${topLoyalPayersCount.toLocaleString('fa-IR')} خریدار`,
      subtext: `از کل ${uniquePayers.toLocaleString('fa-IR')} کارت منحصربه‌فرد`,
      icon: Users,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">{card.title}</p>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{card.value}</h3>
              <p className="text-[11px] text-slate-400 mt-1">{card.subtext}</p>
            </div>
            <div className={`p-3 rounded-xl border ${card.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}