'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { Zap, Clock, TrendingUp, Sparkles, X, CheckCircle2, Calendar, Send } from 'lucide-react';

const mockVelocityData = [
  { time: '۰۰ - ۰۴', count: 12, volume: 4500000, isPeak: false, expectedROI: 'ضعیف (۲٪)' },
  { time: '۰۴ - ۰۸', count: 8, volume: 2100000, isPeak: false, expectedROI: 'ضعیف (۱٪)' },
  { time: '۰۸ - ۱۲', count: 85, volume: 34000000, isPeak: false, expectedROI: 'متوسط (۱۲٪)' },
  { time: '۱۲ - ۱۶', count: 140, volume: 62000000, isPeak: false, expectedROI: 'خوب (۲۲٪)' },
  { time: '۱۶ - ۲۰', count: 210, volume: 98000000, isPeak: true, expectedROI: 'عالی - پنجره طلایی (۴۵٪)' },
  { time: '۲۰ - ۲۴', count: 175, volume: 76000000, isPeak: false, expectedROI: 'خیلی خوب (۳۱٪)' },
];

export default function SalesVelocityChart() {
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('۱۶ - ۲۰');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSchedule = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowModal(false);
    }, 1800);
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xl dir-rtl font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">
              شتاب فروش و پنجره طلایی خرید
            </h3>
            <p className="text-[11px] font-bold text-slate-500">
              تراکم تعداد و حجم ریالی سفارش‌ها در ساعات مختلف
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[10px] font-black bg-amber-50 text-amber-700 px-2.5 py-1 rounded-xl border border-amber-200">
          <Sparkles className="w-3 h-3 text-amber-500" />
          پنجره طلایی: ۱۶ الی ۲۰
        </span>
      </div>

      {/* Mini Action Banner - تغییر به تم آبی و سفید */}
      <div className="my-3.5 p-3 rounded-2xl bg-blue-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md border border-blue-500">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-300 shrink-0" />
          <p className="text-xs font-bold text-white">
            بیشترین نرخ تبدیل مشتریان در بازه <strong className="text-amber-300 font-black">۱۶ تا ۲۰</strong> رخ می‌دهد.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 bg-white text-blue-700 hover:bg-blue-50 text-[11px] font-black rounded-xl transition-all shrink-0 active:scale-95 flex items-center gap-1 shadow-sm"
        >
          <Zap className="w-3 h-3 fill-blue-700" />
          تنظیم کمپین زمان‌بندی‌شده
        </button>
      </div>

      {/* Recharts Composed Chart (Bar + Area) */}
      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 11, fontWeight: 800 }} 
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-2xl bg-slate-900/95 p-3 text-white text-xs font-bold shadow-xl backdrop-blur-md dir-rtl border border-slate-800">
                      <p className="text-amber-300 font-black mb-1">ساعت {data.time}</p>
                      <p className="text-slate-200">تعداد فروش: <span className="text-white font-black">{data.count} سفارش</span></p>
                      <p className="text-slate-200">حجم مالی: <span className="text-emerald-400 font-black">{(data.volume / 1000000).toFixed(1)} میلیون تومان</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <Area 
              type="monotone" 
              dataKey="volume" 
              fill="#3B82F6" 
              stroke="#2563EB" 
              fillOpacity={0.15} 
              strokeWidth={2}
            />

            {/* Bars representing Transaction Count */}
            <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={20}>
              {mockVelocityData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isPeak ? '#F59E0B' : '#94A3B8'} 
                />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 text-[11px] font-black text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-400" />
          <span>تعداد تراکنش</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
          <span>ساعات اوج (Peak Window)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>حجم ریالی</span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 dir-rtl animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl flex flex-col gap-5">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute left-4 top-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  زمان‌بندی هوشمند کمپین فروش
                </h3>
                <p className="text-xs font-bold text-slate-500">
                  بازه زمانی ارسال پیشنهاد تخفیفی را بر اساس بازدهی انتخاب کنید
                </p>
              </div>
            </div>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-slate-900">کمپین با موفقیت زمان‌بندی شد!</h4>
                <p className="text-xs font-bold text-slate-600">
                  پیامک‌های تبلیغاتی خودکار در بازه {selectedSlot} ارسال خواهند شد.
                </p>
              </div>
            ) : (
              <>
                {/* Schedule Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-right text-xs dir-rtl">
                    <thead className="bg-slate-50 text-slate-700 font-black border-b border-slate-200">
                      <tr>
                        <th className="p-3">بازه زمانی</th>
                        <th className="p-3">پیش‌بینی بازدهی</th>
                        <th className="p-3 text-center">انتخاب</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-800">
                      {mockVelocityData.map((slot) => (
                        <tr 
                          key={slot.time}
                          className={`hover:bg-slate-50/80 transition-all ${
                            slot.isPeak ? 'bg-amber-50/60' : ''
                          }`}
                        >
                          <td className="p-3 flex items-center gap-1.5">
                            <span>ساعت {slot.time}</span>
                            {slot.isPeak && (
                              <span className="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded-md">
                                اوج
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className={slot.isPeak ? 'text-amber-700 font-black' : 'text-slate-600'}>
                              {slot.expectedROI}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="radio"
                              name="campaign_slot"
                              checked={selectedSlot === slot.time}
                              onChange={() => setSelectedSlot(slot.time)}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSchedule}
                    className="flex-1 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>تایید و فعال‌سازی برای بازه {selectedSlot}</span>
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-all"
                  >
                    انصراف
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}