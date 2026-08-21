'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Props {
  hourlyData: any;
  bankData: any;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

export default function AnalyticsCharts({ hourlyData, bankData }: Props) {
  // ۱. نرمال‌سازی داده‌های ساعتی (پشتیبانی همزمان از Object و Array)
  const chartHourly = React.useMemo(() => {
    if (Array.isArray(hourlyData)) {
      return hourlyData.map((item) => ({
        hour: item.hour || '00:00',
        tps: Number(item.count || item.tps || 0),
      }));
    } else if (hourlyData && typeof hourlyData === 'object') {
      return Object.entries(hourlyData).map(([hour, count]) => ({
        hour: `${String(hour).padStart(2, '0')}:00`,
        tps: Number(count || 0),
      }));
    }
    return [];
  }, [hourlyData]);

  // ۲. نرمال‌سازی داده‌های سهم بانک‌ها
  const chartBanks = React.useMemo(() => {
    if (Array.isArray(bankData)) {
      return bankData.map((b) => ({
        name: b.bankName || b.name || 'نامشخص',
        value: Number(b.totalSessions || b.amountToman || b.value || 0),
      }));
    }
    return [];
  }, [bankData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 dir-rtl">
      {/* Hourly Trend Chart */}
      <div className="lg:col-span-2 p-5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">توزیع تراکنش‌ها در ساعات شبانه‌روز</h3>
          <span className="text-xs text-slate-400">تحلیل الگوی زمانی</span>
        </div>
        <div className="h-64 w-full dir-ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartHourly}>
              <defs>
                <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                  direction: 'rtl',
                }}
                formatter={(val: any) => [`${Number(val).toLocaleString('fa-IR')} تراکنش`, 'حجم/تعداد']}
                labelFormatter={(lbl: any) => `ساعت: ${lbl}`}
              />
              <Area
                type="monotone"
                dataKey="tps"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTps)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bank Share Donut Chart */}
      <div className="p-5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-xs flex flex-col gap-4">
        <h3 className="font-bold text-slate-900 text-sm">سهم صادرکنندگان کارت (بانک‌ها)</h3>
        <div className="h-64 w-full flex items-center justify-center dir-ltr">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartBanks}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {chartBanks.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                  direction: 'rtl',
                }}
                formatter={(val: any) => [`${Number(val).toLocaleString('fa-IR')}`, 'سهم/مبلغ']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}