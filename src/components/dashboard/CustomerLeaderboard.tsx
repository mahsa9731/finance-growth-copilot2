'use client';

import React from 'react';

export interface CustomerLeaderboardItem {
  cardHash: string;
  totalSpent: number;
  purchaseCount: number;
  segment: string;
}

interface Props {
  customers?: CustomerLeaderboardItem[];
}

export default function CustomerLeaderboard({ customers = [] }: Props) {
  // اطمینان از اینکه ورودی حتما آرایه معتبر است
  const safeCustomers = Array.isArray(customers) ? customers : [];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dir-rtl">
      <h3 className="text-sm font-black text-slate-900 mb-4">
        خریداران برتر و وفادار
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold">
              <th className="pb-3">رتبه</th>
              <th className="pb-3">شناسه کارت</th>
              <th className="pb-3">مجموع خرید (تومان)</th>
              <th className="pb-3">تعداد موفق</th>
              <th className="pb-3">سگمنت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {safeCustomers.slice(0, 6).map((cust, idx) => {
              // جلوگیری از رندر ابجکت‌های اشتباهی
              const cardHashText = typeof cust?.cardHash === 'string' 
                ? cust.cardHash 
                : typeof cust === 'string' 
                  ? cust 
                  : 'نامشخص';

              return (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-bold text-slate-700">
                    {idx === 0 ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px]">
                        ۱
                      </span>
                    ) : (
                      idx + 1
                    )}
                  </td>
                  <td className="py-3 font-mono font-bold text-slate-800">
                    {cardHashText}
                  </td>
                  <td className="py-3 font-bold text-emerald-600">
                    {Number(cust?.totalSpent || 0).toLocaleString('fa-IR')}
                  </td>
                  <td className="py-3 font-bold text-slate-700">
                    {Number(cust?.purchaseCount || 0).toLocaleString('fa-IR')}
                  </td>
                  <td className="py-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-black">
                      {String(cust?.segment || 'جدید')}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}