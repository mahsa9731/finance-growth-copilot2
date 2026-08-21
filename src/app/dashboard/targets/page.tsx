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
  BarChart, 
  Bar, 
  CartesianGrid,
  Cell
} from 'recharts';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  X, 
  Sparkles, 
  PiggyBank, 
  ArrowUpRight,
  Zap,
  DollarSign
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  color: string;
  isCompleted: boolean;
}

const INITIAL_GOALS: Goal[] = [
  {
    id: 'goal-1',
    title: 'خرید سرور اختصاصی و ارتقای زیرساخت',
    targetAmount: 150000000,
    currentAmount: 112500000,
    deadline: '۱۴۰۵/۱۰/۳۰',
    category: 'زیرساخت',
    color: '#2563eb',
    isCompleted: false
  },
  {
    id: 'goal-2',
    title: 'صندوق ذخیره پشتیبانی و بازاریابی',
    targetAmount: 80000000,
    currentAmount: 32000000,
    deadline: '۱۴۰۵/۱۲/۲۹',
    category: 'کمپین',
    color: '#059669',
    isCompleted: false
  },
  {
    id: 'goal-3',
    title: 'توسعه فریم‌ورک اختصاصی هوش مصنوعی',
    targetAmount: 200000000,
    currentAmount: 200000000,
    deadline: '۱۴۰۵/۰۵/۱۵',
    category: 'R&D',
    color: '#7c3aed',
    isCompleted: true
  },
  {
    id: 'goal-4',
    title: 'توسعه ماژول مدیریت پذیرندگان',
    targetAmount: 50000000,
    currentAmount: 0,
    deadline: '۱۴۰۵/۱۱/۱۵',
    category: 'توسعه',
    color: '#d97706',
    isCompleted: false
  }
];

const SAVINGS_TREND_DATA = [
  { month: 'فروردین', amount: 35000000, target: 40000000 },
  { month: 'اردیبهشت', amount: 58000000, target: 70000000 },
  { month: 'خرداد', amount: 92000000, target: 100000000 },
  { month: 'تیر', amount: 140000000, target: 130000000 },
  { month: 'مرداد', amount: 185000000, target: 160000000 },
  { month: 'شهریور', amount: 244500000, target: 200000000 },
];

export default function FinancialGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [depositModalGoal, setDepositModalGoal] = useState<Goal | null>(null);
  const [depositAmount, setDepositAmount] = useState<number>(5000000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState<number>(50000000);
  const [newCategory, setNewCategory] = useState('توسعه');
  const [newColor, setNewColor] = useState('#2563eb');

  const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const totalCurrent = goals.reduce((acc, g) => acc + g.currentAmount, 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositModalGoal) return;

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === depositModalGoal.id) {
          const updatedAmount = g.currentAmount + Number(depositAmount);
          return {
            ...g,
            currentAmount: updatedAmount,
            isCompleted: updatedAmount >= g.targetAmount
          };
        }
        return g;
      })
    );

    setToastMessage(`مبلغ ${Number(depositAmount).toLocaleString('fa-IR')} تومان به هدف "${depositModalGoal.title}" افزوده شد.`);
    setDepositModalGoal(null);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: newTitle,
      targetAmount: Number(newTarget),
      currentAmount: 0,
      deadline: '۱۴۰۵/۱۲/۲۹',
      category: newCategory,
      color: newColor,
      isCompleted: false
    };

    setGoals([newGoal, ...goals]);
    setIsModalOpen(false);
    setToastMessage(`هدف مالی "${newGoal.title}" با موفقیت تعریف شد.`);
    setTimeout(() => setToastMessage(null), 4000);

    setNewTitle('');
    setNewTarget(50000000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Target className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                اهداف مالی و برنامه‌ریزی پس‌انداز
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              تعریف اهداف هوشمند مالی، تخصیص بودجه و پایش میزان تحقق سرمایه‌گذاری‌ها
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-blue-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            تعریف هدف مالی جدید
          </button>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 p-4 bg-blue-900 text-white rounded-2xl shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                <span className="text-xs md:text-sm font-bold">{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* High Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">کل بودجه هدف‌گذاری شده</span>
              <span className="text-xl font-black text-slate-900">
                {(totalTarget / 1000000).toLocaleString('fa-IR')}
              </span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">میلیون تومان</span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <DollarSign className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">مبلغ محقق‌شده تاکنون</span>
              <span className="text-xl font-black text-emerald-600">
                {(totalCurrent / 1000000).toLocaleString('fa-IR')}
              </span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">میلیون تومان</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <PiggyBank className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">درصد میانگین تحقق</span>
              <span className="text-xl font-black text-indigo-600">
                ٪{overallProgress.toLocaleString('fa-IR')}
              </span>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Zap className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">اهداف تکمیل‌شده</span>
              <span className="text-xl font-black text-purple-600">
                {goals.filter((g) => g.isCompleted).length} از {goals.length} هدف
              </span>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Recharts Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Bar Chart: Target Comparison (Fix applied for labels) */}
          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">مقایسه پیشرفت اهداف</h3>
              <p className="text-xs font-bold text-slate-400 mb-2">میزان سرمایه جمع‌آوری‌شده هر هدف</p>
            </div>

            <div className="h-[280px] w-full dir-ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={goals} 
                  layout="vertical" 
                  margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                  barCategoryGap={16}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f8fafc" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    tickLine={false} 
                    axisLine={false} 
                    width={80}
                    tick={({ x, y, payload }) => (
                      <g transform={`translate(${x},${y})`}>
                        <text 
                          x={-10} 
                          y={4} 
                          textAnchor="end" 
                          fill="#334155" 
                          fontSize={11} 
                          fontWeight={800}
                          style={{ fontFamily: 'inherit' }}
                        >
                          {payload.value}
                        </text>
                      </g>
                    )}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as Goal;
                        const percent = data.targetAmount > 0 
                          ? Math.min(100, Math.round((data.currentAmount / data.targetAmount) * 100))
                          : 0;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs font-bold dir-rtl border border-slate-800 space-y-1">
                            <p className="text-slate-300 font-extrabold">{data.title}</p>
                            <div className="flex justify-between items-center gap-4 text-[11px] pt-1">
                              <span>ذخیره شده:</span>
                              <span className="text-emerald-400 font-black">
                                {(data.currentAmount / 1000000).toLocaleString('fa-IR')} م.ت
                              </span>
                            </div>
                            <div className="flex justify-between items-center gap-4 text-[11px]">
                              <span>پیشرفت:</span>
                              <span className="text-blue-400 font-black">٪{percent.toLocaleString('fa-IR')}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="currentAmount" radius={[0, 8, 8, 0]} barSize={18}>
                    {goals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-slate-500">
              <span>تعداد اهداف فعال: {goals.filter(g => !g.isCompleted).length}</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">در مسیر رشد</span>
            </div>
          </div>

          {/* Main Area Chart: Growth Trend */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">روند انباشت و رشد پس‌انداز ماهانه</h3>
                <p className="text-xs font-bold text-slate-400">مقایسه عملکرد واقعی پس‌انداز در برابر مسیر هدف‌گذاری</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
                <TrendingUp className="w-4 h-4" />
                رشد ٪۲۲+
              </span>
            </div>

            <div className="h-[280px] w-full dir-ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SAVINGS_TREND_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={(value: any) => `${Number(value) / 1000000}M`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(value: any) => [`${(Number(value) / 1000000).toLocaleString('fa-IR')} میلیون تومان`, '']}
                  />
                  <Area type="monotone" dataKey="amount" name="واریزی واقعی" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                  <Area type="monotone" dataKey="target" name="مسیر پیش‌بینی" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorTarget)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Goals List Cards */}
        <h2 className="text-lg font-black text-slate-900 mb-4">لیست اهداف مالی فعال</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percent = goal.targetAmount > 0 
              ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
              : 0;

            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white rounded-[28px] border p-6 shadow-xl relative overflow-hidden flex flex-col justify-between transition-all ${
                  goal.isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200/80'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span 
                      className="px-3 py-1 rounded-xl text-[10px] font-black text-white"
                      style={{ backgroundColor: goal.color }}
                    >
                      {goal.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {goal.deadline}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-slate-900 mb-2 leading-snug">
                    {goal.title}
                  </h4>

                  {/* Amounts */}
                  <div className="my-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/80 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 block">جمع‌آوری شده</span>
                      <span className="text-sm font-black text-slate-900">
                        {(goal.currentAmount / 1000000).toLocaleString('fa-IR')} م.ت
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-extrabold text-slate-400 block">هدف کل</span>
                      <span className="text-sm font-black text-slate-500">
                        {(goal.targetAmount / 1000000).toLocaleString('fa-IR')} م.ت
                      </span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-black mb-1.5 text-slate-600">
                      <span>میزان پیشرفت:</span>
                      <span style={{ color: goal.color }}>٪{percent.toLocaleString('fa-IR')}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: goal.color }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  {!goal.isCompleted ? (
                    <button
                      onClick={() => setDepositModalGoal(goal)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      واریز / افزایش موجودی
                    </button>
                  ) : (
                    <div className="w-full py-2 bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-black text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      هدف محقق شده است
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal: Create Goal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white p-6 rounded-[28px] w-full max-w-lg shadow-2xl border border-slate-100 relative dir-rtl"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute left-5 top-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                    <Target className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">تعریف هدف مالی جدید</h3>
                    <p className="text-xs font-bold text-slate-400">تخصیص بودجه و بازه زمانی دستیابی</p>
                  </div>
                </div>

                <form onSubmit={handleCreateGoal} className="space-y-4 text-xs font-extrabold text-slate-700">
                  <div>
                    <label className="block mb-1.5">عنوان هدف:</label>
                    <input
                      type="text"
                      placeholder="مثلاً: خرید تجهیزات جدید شبکه"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1.5">مبلغ هدف (تومان):</label>
                      <input
                        type="number"
                        value={newTarget}
                        onChange={(e) => setNewTarget(Number(e.target.value))}
                        required
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">دسته‌بندی:</label>
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5">رنگ تم هدف:</label>
                    <div className="flex items-center gap-3">
                      {['#2563eb', '#059669', '#7c3aed', '#e11d48', '#d97706'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNewColor(color)}
                          className={`w-8 h-8 rounded-full transition-transform ${newColor === color ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-xs font-black transition-all shadow-md shadow-blue-200"
                    >
                      ثبت و شروع ذخیره
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 bg-slate-100 text-slate-700 py-3 rounded-2xl text-xs font-bold hover:bg-slate-200 transition"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Quick Deposit */}
        <AnimatePresence>
          {depositModalGoal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 dir-rtl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white p-6 rounded-[28px] w-full max-w-md shadow-2xl border border-slate-100 relative"
              >
                <button
                  onClick={() => setDepositModalGoal(null)}
                  className="absolute left-5 top-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">افزایش ذخیره مالی</h3>
                    <p className="text-xs font-bold text-slate-400">{depositModalGoal.title}</p>
                  </div>
                </div>

                <form onSubmit={handleDeposit} className="space-y-4 text-xs font-extrabold text-slate-700">
                  <div>
                    <label className="block mb-1.5">مبلغ واریزی جدید (تومان):</label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      required
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold text-slate-900 text-sm transition"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-black transition-all shadow-md shadow-emerald-200"
                    >
                      تایید و به‌روزرسانی
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepositModalGoal(null)}
                      className="px-4 bg-slate-100 text-slate-700 py-3 rounded-2xl text-xs font-bold hover:bg-slate-200 transition"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}