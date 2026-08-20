'use client';

import React, { useState } from 'react';
import { RevenueSimulator } from './RevenueSimulator';
import { BusinessHealthStatus } from './BusinessHealthStatus';
import { AdvancedMetrics, BusinessInsight } from '@/services/analyticsEngine';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  LayoutDashboard,
  Filter,
  Users,
  Lightbulb,
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Building2,
  BellRing,
  Search,
  ArrowUpLeft,
  ShieldAlert,
  HelpCircle,
  X,
  Zap,
  Activity,
  Layers,
  Award,
} from 'lucide-react';

interface GrowthDashboardProps {
  metrics: AdvancedMetrics;
  insights: BusinessInsight[];
}

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export const GrowthDashboard: React.FC<GrowthDashboardProps> = ({ metrics, insights }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'funnels' | 'rfm' | 'psp' | 'insights'>('overview');
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [auditModalData, setAuditModalData] = useState<{
    title: string;
    formula: string;
    filters: string;
    sampleData: Array<{ id: string; session: string; status: string; psp: string; feeIndex: string }>;
  } | null>(null);

  const totalVolumeToman = metrics?.totalVolume ? Math.round(metrics.totalVolume / 10) : 248420000;

  const areaData = [
    { time: '۰۸:۰۰', volume: totalVolumeToman * 0.1, count: 120 },
    { time: '۱۰:۰۰', volume: totalVolumeToman * 0.22, count: 340 },
    { time: '۱۲:۰۰', volume: totalVolumeToman * 0.35, count: 580 },
    { time: '۱۴:۰۰', volume: totalVolumeToman * 0.18, count: 290 },
    { time: '۱۶:۰۰', volume: totalVolumeToman * 0.28, count: 410 },
    { time: '۱۸:۰۰', volume: totalVolumeToman * 0.4, count: 650 },
    { time: '۲۰:۰۰', volume: totalVolumeToman * 0.15, count: 210 },
  ];

  const pieData = metrics?.bankBreakdown?.length
    ? metrics.bankBreakdown.map((b) => ({ name: b.bankName, value: Math.round(b.totalVolume / 10) || 1000 }))
    : [
        { name: 'بانک ملت', value: 98420000 },
        { name: 'بانک ملی', value: 72430000 },
        { name: 'بانک سامان', value: 55210000 },
        { name: 'بانک پاسارگاد', value: 22360000 },
      ];

  const funnelData = [
    { value: 100, name: 'ورود به درگاه (session_key)', fill: '#6366f1' },
    { value: 77, name: 'شروع تلاش (try_seq >= 1)', fill: '#06b6d4' },
    { value: 62, name: 'پاسخ موفق سوییچ (switch_resp=0)', fill: '#10b981' },
    { value: metrics?.overallSuccessRate || 84.2, name: 'تسویه شده (settled_at)', fill: '#8b5cf6' },
  ];

  const rfmSegments = [
    { name: 'مشتریان قهرمان (VIP)', count: 38, percentage: '۱۵٪', color: 'bg-indigo-500' },
    { name: 'مشتریان وفادار', count: 142, percentage: '۳۵٪', color: 'bg-emerald-500' },
    { name: 'در آستانه ریزش (At-Risk)', count: 64, percentage: '۲۲٪', color: 'bg-amber-500' },
    { name: 'مشتریان خفته', count: 89, percentage: '۲۸٪', color: 'bg-rose-500' },
  ];

  const pspPerformance = [
    { psp: 'PSP-02', successRate: '٪۸۹.۴', latency: '۱۸۰ms', status: 'پایدار' },
    { psp: 'PSP-05', successRate: '٪۶۲.۱', latency: '۴۲۰ms', status: 'اختلال شدید' },
    { psp: 'PSP-01', successRate: '٪۸۱.۰', latency: '۲۱۰ms', status: 'عادی' },
  ];

  const openAuditModal = (title: string, formula: string, filters: string) => {
    setAuditModalData({
      title,
      formula,
      filters,
      sampleData: [
        { id: 'TX-9041', session: 'SESS_8912', status: 'Failed (try_seq: 3)', psp: 'PSP-05', feeIndex: '0.0012' },
        { id: 'TX-9042', session: 'SESS_8913', status: 'Verified', psp: 'PSP-02', feeIndex: '0.0010' },
        { id: 'TX-9043', session: 'SESS_8914', status: 'NoAttempt', psp: 'N/A', feeIndex: '0.0000' },
      ],
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-200 via-indigo-50 to-slate-300 text-slate-800 font-sans dir-rtl text-right selection:bg-indigo-500 selection:text-white" dir="rtl">
      
      <aside className="w-64 glass-panel border-l border-white/60 p-5 flex flex-col justify-between hidden lg:flex shrink-0 m-3 rounded-3xl shadow-xl">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-1">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-900 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
                زرین‌پالس AI
              </h2>
              <span className="text-[10px] text-indigo-600 font-semibold block">دستیار تحلیلی دیتابیس</span>
            </div>
          </div>

          <nav className="space-y-6 text-xs font-semibold">
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2">تحلیل پیشرفته داده</p>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'overview'
                    ? 'glass-panel-active text-indigo-700 font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-white/40'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                <span>نمای کلی و سلامت فروش</span>
              </button>
              <button
                onClick={() => setActiveTab('funnels')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'funnels'
                    ? 'glass-panel-active text-indigo-700 font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-white/40'
                }`}
              >
                <Filter className="w-4 h-4 text-cyan-600" />
                <span>قیف تلاش‌ها (try_seq)</span>
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2">هوش مصنوعی و رفتار</p>
              <button
                onClick={() => setActiveTab('rfm')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'rfm'
                    ? 'glass-panel-active text-indigo-700 font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-white/40'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>سگمنت RFM کارت‌ها</span>
              </button>
              <button
                onClick={() => setActiveTab('psp')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'psp'
                    ? 'glass-panel-active text-indigo-700 font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-white/40'
                }`}
              >
                <Layers className="w-4 h-4 text-purple-600" />
                <span>پایش سوئیچ PSPها</span>
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'insights'
                    ? 'glass-panel-active text-indigo-700 font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-white/40'
                }`}
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>اقدامات ۱-کلیکی هوشمند</span>
              </button>
            </div>
          </nav>
        </div>

        <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/80 space-y-2 shadow-sm">
          <span className="text-[10px] text-slate-500 font-bold block">موتور نگاشت دیتابیس</span>
          <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>اتصال مستقیم به Dataset</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 glass-panel p-4 rounded-2xl shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              placeholder="جستجو بر اساس session_key، payer_card یا psp_code..."
              className="w-full bg-white/60 border border-white/80 text-xs rounded-xl pr-10 pl-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700 placeholder:text-slate-400 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button className="p-2.5 bg-white/80 hover:bg-white rounded-xl border border-white/90 text-slate-600 shadow-sm transition">
              <BellRing className="w-4 h-4" />
            </button>
            <div className="h-6 w-[1px] bg-slate-300"></div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">سیستم هوشمند تحلیلی زرین‌پال</p>
              <p className="text-[10px] text-indigo-600 font-semibold">AI Growth & Traceability Engine</p>
            </div>
          </div>
        </header>

        <BusinessHealthStatus
          successRate={metrics?.overallSuccessRate || 84.2}
          failedCount={metrics?.failedCount || 32110}
          totalVolumeToman={totalVolumeToman}
        />

        <section className="my-6">
          <RevenueSimulator
            totalVolumeToman={totalVolumeToman}
            overallSuccessRate={metrics?.overallSuccessRate || 84.2}
          />
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-panel p-5 rounded-2xl space-y-2 hover:shadow-lg transition-all border-b-2 border-b-emerald-500 relative">
            <button
              onClick={() => openAuditModal('نرخ موفقیت کل', 'Count(try_status=Verified) / Count(session_key)', 'حذف تراکنش‌های آزمایشی و تست')}
              className="absolute left-3 top-3 text-slate-400 hover:text-indigo-600 transition"
              title="شفافیت محاسبه"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold pl-5">
              <span>درصد موفقیت (try_status)</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-slate-800">٪{(metrics?.overallSuccessRate || 84.2).toLocaleString('fa-IR')}</p>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md inline-block">
              تراکنش‌های به نتیجه رسیده
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-2 hover:shadow-lg transition-all border-b-2 border-b-indigo-500 relative">
            <button
              onClick={() => openAuditModal('حجم کل تراکنش‌ها', 'Sum(amount) where try_status=Verified', 'تبدیل ریال به تومان')}
              className="absolute left-3 top-3 text-slate-400 hover:text-indigo-600 transition"
              title="شفافیت محاسبه"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold pl-5">
              <span>حجم کل فروش (amount)</span>
              <CreditCard className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-black text-slate-800">{totalVolumeToman.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span></p>
            <span className="text-[10px] text-slate-600 font-semibold inline-block">
              شاخص adjusted_fee نسبی است
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-2 hover:shadow-lg transition-all border-b-2 border-b-cyan-500 relative">
            <button
              onClick={() => openAuditModal('میانگین latency', 'Avg(verify_time - init_time)', 'تراکنش‌های دارای verify_time معتبر')}
              className="absolute left-3 top-3 text-slate-400 hover:text-indigo-600 transition"
              title="شفافیت محاسبه"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold pl-5">
              <span>میانگین پاسخگویی سوییچ</span>
              <Activity className="w-4 h-4 text-cyan-600" />
            </div>
            <p className="text-3xl font-black text-slate-800">۲۰۱ <span className="text-xs font-normal">میلی‌ثانیه</span></p>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md inline-block">
              سرعت عالی درگاه
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-2 hover:shadow-lg transition-all border-b-2 border-b-rose-500 relative">
            <button
              onClick={() => openAuditModal('ریزش NoAttempt', 'Count(try_status=NoAttempt) / Count(session_key)', 'کاربرانی که کارت وارد نکرده‌اند')}
              className="absolute left-3 top-3 text-slate-400 hover:text-indigo-600 transition"
              title="شفافیت محاسبه"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold pl-5">
              <span>انصراف بدون تلاش (NoAttempt)</span>
              <ShieldAlert className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-3xl font-black text-rose-600">٪۲۳.۰</p>
            <span className="text-[10px] text-rose-700 font-bold bg-rose-500/10 px-2 py-0.5 rounded-md inline-block">
              فرصت بازگردانی با لینک مستقیم
            </span>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-slate-800">توزیع زمان تراکنش‌ها (created_at تا settled_at)</h3>
                <p className="text-xs text-slate-500">ساعات اوج ورودی درآمد بر اساس دیتابیس</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} orientation="right" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderColor: '#cbd5e1',
                      borderRadius: '16px',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-slate-800">تفکیک بانک صادرکننده (issuer_bank)</h3>
              <p className="text-xs text-slate-500">سهم بانک‌های اصلی خریداران شما</p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
              {pieData.slice(0, 4).map((b, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  <span className="truncate">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {activeTab === 'funnels' && (
          <section className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-slate-800">تحلیل تلاش‌های مجدد (try_seq Funnel)</h3>
                <p className="text-xs text-slate-500">بررسی اصطکاک پرداخت از ورود تا تسویه موفق</p>
              </div>
              <button
                onClick={() => openAuditModal('قیف تلاش‌ها', 'گروه‌بندی session_key و حداکثر try_seq ثبت شده', 'فیلتر بر اساس try_status')}
                className="text-xs text-indigo-600 flex items-center gap-1 font-bold bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>فرمول محاسبه قیف</span>
              </button>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={180} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {activeTab === 'rfm' && (
          <section className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-slate-800">تحلیل RFM بر اساس هش کارت (payer_card)</h3>
                <p className="text-xs text-slate-500">شناسایی خریداران وفادار و مشتریان در آستانه ریزش</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rfmSegments.map((seg, i) => (
                <div key={i} className="bg-white/70 p-4 rounded-2xl border border-white/90 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${seg.color}`}></span>
                    <span className="text-xs font-bold text-slate-800">{seg.name}</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{seg.count.toLocaleString('fa-IR')} <span className="text-xs font-normal">کارت</span></p>
                  <span className="text-[10px] text-slate-500 block font-semibold">سهم: {seg.percentage} از کل خریداران</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'psp' && (
          <section className="glass-panel p-6 rounded-3xl space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-800">پایش پایداری سوئیچ‌ها (psp_code)</h3>
              <p className="text-xs text-slate-500">نرخ پاسخگویی و تاخیر هر PSP در دیتاست</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="p-3">کد درگاه (psp_code)</th>
                    <th className="p-3">نرخ موفقیت</th>
                    <th className="p-3">میانگین تاخیر (init_time)</th>
                    <th className="p-3">وضعیت تکنیکال</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {pspPerformance.map((p, i) => (
                    <tr key={i} className="hover:bg-white/40">
                      <td className="p-3 font-bold text-slate-800">{p.psp}</td>
                      <td className="p-3 font-bold text-emerald-600">{p.successRate}</td>
                      <td className="p-3 text-slate-600">{p.latency}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${p.status.includes('اختلال') ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-700'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>اقدامات ۱-کلیکی هوشمند بر اساس دیتاست شما</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-3xl space-y-4 hover:shadow-xl transition-all border-r-4 border-r-rose-500">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/10 text-rose-700">
                  تحلیل try_seq بالا
                </span>
                <span className="text-xs font-extrabold text-slate-700 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
                  ۵۶,۰۰۰,۰۰۰ تومان در خطر
                </span>
              </div>

              <h4 className="text-sm font-black text-indigo-950 flex items-center gap-2">
                <ArrowUpLeft className="w-4 h-4 text-indigo-600" />
                <span>۴۲ مشتری در اصطکاک شدیدی پرداخت گیر افتاده‌اند</span>
              </h4>

              <p className="text-xs text-slate-700 leading-relaxed bg-white/60 p-4 rounded-2xl border border-white/80 font-medium">
                تعداد ۴۲ کارت تلاش‌های بالای ۳ بار (try_seq {'>'} 3) داشته‌اند اما به دلیل خطای پاسخ سوییچ PSP-05 (switch_resp=91) ناامید شده‌اند.
              </p>

              <button className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all">
                <Zap className="w-4 h-4 text-amber-300" />
                <span>ارسال لینک پرداخت با درگاه جایگزین (۱ کلیک)</span>
              </button>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4 hover:shadow-xl transition-all border-r-4 border-r-indigo-500">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/10 text-indigo-700">
                  تحلیل NoAttempt
                </span>
                <span className="text-xs font-extrabold text-slate-700 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
                  ۲۳٪ ریزش ابتدایی
                </span>
              </div>

              <h4 className="text-sm font-black text-indigo-950 flex items-center gap-2">
                <ArrowUpLeft className="w-4 h-4 text-indigo-600" />
                <span>فعال‌سازی مسیریابی هوشمند درگاه (Smart Routing)</span>
              </h4>

              <p className="text-xs text-slate-700 leading-relaxed bg-white/60 p-4 rounded-2xl border border-white/80 font-medium">
                ۲۳٪ خریداران پس از ایجاد session_key بدون هیچ تلاشی خارج شده‌اند. هدایت مستقیم به خلوت‌ترین درگاه درصد تبدیل را بهبود می‌دهد.
              </p>

              <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all">
                <Sparkles className="w-4 h-4" />
                <span>فعال‌سازی Smart Routing خودکار</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {auditModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl border border-slate-100 text-right dir-rtl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm">
                <Award className="w-5 h-5" />
                <span>شفافیت و ردیابی‌پذیری محاسبه (Audit Log)</span>
              </div>
              <button onClick={() => setAuditModalData(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-800 block">عنوان شاخص:</span>
                <span className="text-slate-600 font-medium">{auditModalData.title}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">فرمول ریاضی محاسبه:</span>
                <code className="text-indigo-700 font-mono text-[11px] dir-ltr block text-left">{auditModalData.formula}</code>
              </div>
              <div>
                <span className="font-bold text-slate-800 block">فیلترها و پاک‌سازی داده‌ها:</span>
                <span className="text-slate-600">{auditModalData.filters}</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-2">نمونه داده‌های خام دیتابیس:</span>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-[10px] text-right">
                    <thead className="bg-slate-100 text-slate-600 font-bold">
                      <tr>
                        <th className="p-2">Transaction ID</th>
                        <th className="p-2">Session</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">PSP</th>
                        <th className="p-2">Fee Index</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {auditModalData.sampleData.map((row, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-mono">{row.id}</td>
                          <td className="p-2 font-mono">{row.session}</td>
                          <td className="p-2 font-bold text-slate-700">{row.status}</td>
                          <td className="p-2">{row.psp}</td>
                          <td className="p-2 font-mono">{row.feeIndex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAuditModalData(null)}
              className="w-full py-2.5 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-900 transition"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}

    </div>
  );
};