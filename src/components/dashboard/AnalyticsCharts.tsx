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
import { BankPerformance } from '@/services/analyticsEngine';

interface Props {
  hourlyData: Record<number, number>;
  bankData: BankPerformance[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

export default function AnalyticsCharts({ hourlyData, bankData }: Props) {
  const chartHourly = Object.entries(hourlyData).map(([hour, count]) => ({
    hour: `${hour}:00`,
    tps: count,
  }));

  const chartBanks = bankData.map((b) => ({
    name: b.bankName,
    value: b.totalSessions,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Hourly Trend Chart */}
      <div className="lg:col-span-2 p-5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-sm flex flex-col gap-4">
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
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none' }}
              />
              <Area type="monotone" dataKey="tps" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTps)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bank Share Donut Chart */}
      <div className="p-5 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-sm flex flex-col gap-4">
        <h3 className="font-bold text-slate-900 text-sm">سهم صادرکنندگان کارت (بانک‌ها)</h3>
        <div className="h-64 w-full flex items-center justify-center">
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}