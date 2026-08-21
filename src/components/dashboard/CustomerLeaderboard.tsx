'use client';

import React from 'react';
import { Award, Crown, UserCheck } from 'lucide-react';

interface CustomerRank {
  cardHash: string;
  totalSpent: number;
  purchaseCount: number;
  segment: 'VIP' | 'وفادار' | 'جدید';
}

interface Props {
  customers: CustomerRank[];
}

export default function CustomerLeaderboard({ customers }: Props) {
  return (
    <div className="p-5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-sm">مشتریان محبوب و وفادار (Leaderboard)</h3>
        </div>
        <span className="text-xs text-slate-400">استخراج بر اساس کارت بانکی</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-slate-200/80 text-slate-400">
              <th className="pb-2 font-medium">رتبه</th>
              <th className="pb-2 font-medium">شناسه کارت خریدار</th>
              <th className="pb-2 font-medium">تعداد خرید</th>
              <th className="pb-2 font-medium">مجموع خرید (تومان)</th>
              <th className="pb-2 font-medium">سگمنت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.slice(0, 6).map((cust, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3 font-bold text-slate-700">
                  {idx === 0 ? (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px]">
                      ۱
                    </span>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </td>
                <td className="py-3 font-mono text-slate-600">{cust.cardHash.slice(0, 12)}...</td>
                <td className="py-3 font-bold text-slate-900">{cust.purchaseCount.toLocaleString('fa-IR')} بار</td>
                <td className="py-3 font-semibold text-emerald-600">
                  {Math.round(cust.totalSpent / 10).toLocaleString('fa-IR')}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      cust.segment === 'VIP'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {cust.segment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}