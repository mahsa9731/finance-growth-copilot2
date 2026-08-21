'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Users, 
  Award, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Target,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  marketShare: number;
  growth: number;
  totalCustomers: number;
  color: string;
  status: 'رهبر بازار' | 'رقیب اصلی' | 'در حال رشد' | 'تثبیت‌شده';
}

const COMPETITORS_DATA: Competitor[] = [
  {
    id: 'comp-1',
    name: 'سامانه ما (برند اصلی)',
    marketShare: 38.5,
    growth: 14.2,
    totalCustomers: 125000,
    color: '#2563eb',
    status: 'رهبر بازار'
  },
  {
    id: 'comp-2',
    name: 'شرکت آلفا تک',
    marketShare: 24.0,
    growth: 5.8,
    totalCustomers: 78000,
    color: '#7c3aed',
    status: 'رقیب اصلی'
  },
  {
    id: 'comp-3',
    name: 'گروه نرم‌افزاری بتا',
    marketShare: 16.5,
    growth: -2.1,
    totalCustomers: 52000,
    color: '#059669',
    status: 'تثبیت‌شده'
  },
  {
    id: 'comp-4',
    name: 'استارتاپ گاما',
    marketShare: 12.0,
    growth: 22.5,
    totalCustomers: 39000,
    color: '#d97706',
    status: 'در حال رشد'
  },
  {
    id: 'comp-5',
    name: 'سایر بازیگران کوچک',
    marketShare: 9.0,
    growth: 1.0,
    totalCustomers: 28000,
    color: '#94a3b8',
    status: 'تثبیت‌شده'
  }
];

const HISTORICAL_SHARE_DATA = [
  { month: 'فروردین', ourShare: 31.0, topCompetitor: 28.0 },
  { month: 'اردیبهشت', ourShare: 32.5, topCompetitor: 27.2 },
  { month: 'خرداد', ourShare: 34.0, topCompetitor: 26.5 },
  { month: 'تیر', ourShare: 35.8, topCompetitor: 25.8 },
  { month: 'مرداد', ourShare: 37.2, topCompetitor: 25.0 },
  { month: 'شهریور', ourShare: 38.5, topCompetitor: 24.0 },
];

export default function MarketShareReportsPage() {
  const [competitors] = useState<Competitor[]>(COMPETITORS_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompetitors = competitors.filter(c => 
    c.name.includes(searchTerm) || c.status.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <PieChartIcon className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                گزارش‌های سهم بازار و موقعیت رقابتی
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              تحلیل موقعیت تجاری در صنعت، نرخ نفوذ، جایگاه رقبا و روند رشد سهم بازار
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200/80 shadow-sm text-xs font-extrabold text-slate-700">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>بازار هدف: صنعت سامانه‌های ابری و هوشمند</span>
          </div>
        </div>

        {/* High-Level Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">سهم فعلی ما از کل بازار</span>
              <span className="text-xl font-black text-blue-600">٪۳۸.۵</span>
              <span className="text-[10px] font-bold text-emerald-600 mr-1.5 font-black">رتبه ۱ بازار</span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Award className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">رشد سهم بازار (۶ ماهه)</span>
              <span className="text-xl font-black text-emerald-600">٪۷.۵+</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">افزایش نفوذ</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">فاصله از رقیب دوم</span>
              <span className="text-xl font-black text-purple-600">٪۱۴.۵</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">حاشیه امن</span>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">کل مشتریان فعال صنعت</span>
              <span className="text-xl font-black text-amber-500">۳۲۲,۰۰۰</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">کاربر</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
              <Users className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main Area Chart: Market Share Growth vs Competitor */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">روند ۶ ماهه تغییرات سهم بازار</h3>
                <p className="text-xs font-bold text-slate-400">مقایسه نرخ رشد ما در برابر نزدیک‌ترین رقیب (آلفا تک)</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
                <ArrowUpRight className="w-4 h-4" />
                رشد مستمر
              </span>
            </div>

            <div className="h-[280px] w-full dir-ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HISTORICAL_SHARE_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOurShare" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCompetitor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={(val: any) => `٪${val}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [`٪${val}`, 'سهم بازار']}
                  />
                  <Area type="monotone" dataKey="ourShare" name="سامانه ما" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorOurShare)" />
                  <Area type="monotone" dataKey="topCompetitor" name="رقیب اصلی" stroke="#7c3aed" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorCompetitor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Current Market Share Breakdown */}
          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">تفکیک سهم فعلی بازار</h3>
              <p className="text-xs font-bold text-slate-400 mb-2">درصد کیک کلی صنعت در اختیار بازیگران</p>
            </div>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={competitors}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="marketShare"
                  >
                    {competitors.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`٪${val}`, 'سهم بازار']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              {competitors.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}: ٪{item.marketShare}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Competitor Analysis Breakdown */}
        <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">جدول تحلیل مقایسه‌ای بازیگران اصلی</h3>
              <p className="text-xs font-bold text-slate-400">مقایسه سهم بازار، تعداد کاربران و نرخ رشد سالانه</p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                placeholder="جستجوی نام یا وضعیت رقیب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-black text-slate-500">
                  <th className="p-4 pr-6">نام شرکت / برند</th>
                  <th className="p-4">سهم از بازار</th>
                  <th className="p-4">نرخ رشد سالانه</th>
                  <th className="p-4">تعداد کاربران تخمینی</th>
                  <th className="p-4 pl-6">موقعیت استراتژیک</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {filteredCompetitors.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 pr-6 font-extrabold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </div>
                    </td>
                    <td className="p-4 font-black text-blue-600">
                      ٪{item.marketShare.toLocaleString('fa-IR')}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 font-black ${item.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.growth >= 0 ? `٪${item.growth}+` : `٪${Math.abs(item.growth)}-`}
                        {item.growth >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      </span>
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      {item.totalCustomers.toLocaleString('fa-IR')} کاربر
                    </td>
                    <td className="p-4 pl-6">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black ${
                        item.status === 'رهبر بازار' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'رقیب اصلی' ? 'bg-purple-100 text-purple-800' :
                        item.status === 'در حال رشد' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategic Market Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h4 className="font-extrabold text-base text-slate-900">فرصت‌های کلیدی توسعه سهم بازار</h4>
            </div>
            <ul className="space-y-3 text-xs font-bold text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>جذب کارفرمایان کوچک و متوسط با ارائه پکیج‌های سبک‌تر و اقتصادی</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>توسعه هوش مصنوعی اختصاصی برای افزایش نرخ ماندگاری (Retention) مشتریان موجود</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>بهره‌برداری از افت نرخ رشد برخی رقبا جهت اجرای کمپین‌های مهاجرت (Migration)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-indigo-600" />
              <h4 className="font-extrabold text-base text-slate-900">اهداف استراتژیک سالانه (Target Status)</h4>
            </div>
            <div className="space-y-4 text-xs font-extrabold text-slate-700">
              <div>
                <div className="flex justify-between mb-1">
                  <span>دستیابی به ۴۵٪ سهم کلی بازار:</span>
                  <span className="text-blue-600">٪۸۵ محقق شده</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full w-[85%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>افزایش نفوذ در کسب‌وکارهای B2B:</span>
                  <span className="text-emerald-600">٪۹۲ محقق شده</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full w-[92%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}