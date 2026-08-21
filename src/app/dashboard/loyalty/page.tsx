'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Crown, 
  Gift, 
  Star, 
  Users, 
  Zap, 
  Plus, 
  Search, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface LoyaltyMember {
  id: string;
  cardHash: string;
  tier: 'SILVER' | 'GOLD' | 'PLATINUM';
  points: number;
  totalSpent: number;
  lastActive: string;
}

const MEMBERS_DATA: LoyaltyMember[] = [
  {
    id: 'mem-1',
    cardHash: '6104-3378-****-1102',
    tier: 'PLATINUM',
    points: 4250,
    totalSpent: 125000000,
    lastActive: 'امروز'
  },
  {
    id: 'mem-2',
    cardHash: '6219-8610-****-7741',
    tier: 'GOLD',
    points: 1890,
    totalSpent: 68000000,
    lastActive: 'دیروز'
  },
  {
    id: 'mem-3',
    cardHash: '5892-1012-****-3399',
    tier: 'GOLD',
    points: 1400,
    totalSpent: 52000000,
    lastActive: '۳ روز پیش'
  },
  {
    id: 'mem-4',
    cardHash: '6037-9918-****-5511',
    tier: 'SILVER',
    points: 620,
    totalSpent: 21000000,
    lastActive: '۵ روز پیش'
  }
];

export default function LoyaltyPage() {
  const [members, setMembers] = useState<LoyaltyMember[]>(MEMBERS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [rewardModal, setRewardModal] = useState<{ isOpen: boolean; member: LoyaltyMember | null }>({ isOpen: false, member: null });
  const [bonusPoints, setBonusPoints] = useState<number>(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.cardHash.includes(searchQuery);
    const matchesTier = selectedTier === 'ALL' || m.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const handleGrantBonus = async () => {
    if (!rewardModal.member) return;
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    setMembers((prev) =>
      prev.map((m) =>
        m.id === rewardModal.member?.id ? { ...m, points: m.points + Number(bonusPoints) } : m
      )
    );

    setIsSubmitting(false);
    setRewardModal({ isOpen: false, member: null });
    setToastMessage(`تعداد ${bonusPoints} امتیاز به حساب ${rewardModal.member.cardHash.slice(-4)} واریز گردید.`);

    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                <Crown className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                باشگاه مشتریان و سیستم وفاداری
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              مدیریت سطح‌بندی اعضا، تخصیص پاداش‌های بازگشت خرید و افزایش نرخ ماندگاری
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setToastMessage('تنظیمات سطوح با موفقیت بروزرسانی شد.')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-indigo-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              تنظیم قوانین امتیازدهی
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 p-4 bg-slate-900 text-white rounded-2xl shadow-lg flex items-center justify-between"
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

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">کل اعضای باشگاه</span>
              <span className="text-xl font-black text-slate-900">۱,۸۴۰ کارت</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mr-1.5 border border-emerald-200">
                +۱۲٪ این ماه
              </span>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Users className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">امتیازات فعال اعطا‌شده</span>
              <span className="text-xl font-black text-amber-600">۳۴۲,۵۰۰</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">امتیاز</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Star className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">نرخ نقدکردن پاداش‌ها</span>
              <span className="text-xl font-black text-slate-900">۶۸.۴٪</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">عالی</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Gift className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">رشد خرید مجدد (Repeat Purchase)</span>
              <span className="text-xl font-black text-emerald-600">+۲۴.۱٪</span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">سالانه</span>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Tier Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 font-black rounded-xl text-xs">
                سطح نقره‌ای (Silver)
              </span>
              <Award className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-xs font-bold text-slate-400 mb-4">ورودی برای همه مشتریان با ثبت‌نام اولیه</p>
            <div className="space-y-2 text-xs font-extrabold text-slate-700 border-t pt-4 border-slate-100">
              <div className="flex justify-between"><span>بازگشت نقدی (Cashback):</span><span className="text-indigo-600">۲٪</span></div>
              <div className="flex justify-between"><span>کد تخفیف تولد:</span><span className="text-indigo-600">۵۰,۰۰۰ تومان</span></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-[28px] shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-white/20 text-white font-black rounded-xl text-xs backdrop-blur-md">
                سطح طلایی (Gold)
              </span>
              <Crown className="w-6 h-6 text-amber-200" />
            </div>
            <p className="text-xs font-bold text-amber-100 mb-4">خرید بیش از ۵۰ میلیون تومان در سال</p>
            <div className="space-y-2 text-xs font-black text-white border-t pt-4 border-amber-400/50">
              <div className="flex justify-between"><span>بازگشت نقدی (Cashback):</span><span>۵٪</span></div>
              <div className="flex justify-between"><span>ارسال رایگان سفارش‌ها:</span><span>نامحدود</span></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-[28px] shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 font-black rounded-xl text-xs backdrop-blur-md">
                سطح پلاتینوم (Platinum)
              </span>
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-xs font-bold text-slate-400 mb-4">خرید بیش از ۱۰۰ میلیون تومان در سال</p>
            <div className="space-y-2 text-xs font-black text-white border-t pt-4 border-slate-800">
              <div className="flex justify-between"><span>بازگشت نقدی (Cashback):</span><span className="text-emerald-400">۱۰٪</span></div>
              <div className="flex justify-between"><span>پشتیبانی اختصاصی VIP:</span><span className="text-emerald-400">فعال</span></div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-black text-slate-900">لیست اعضای فعال باشگاه</h2>
              <p className="text-xs font-bold text-slate-400 mt-0.5">مشاهده کارت‌ها، وضعیت امتیازات و اهداء مستقیم بنوس</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجوی شماره کارت..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl pr-10 pl-4 py-2 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
                {['ALL', 'PLATINUM', 'GOLD', 'SILVER'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                      selectedTier === tier
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tier === 'ALL' ? 'همه' : tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-extrabold">شماره کارت مشتری</th>
                  <th className="p-4 font-extrabold">سطح کاربری</th>
                  <th className="p-4 font-extrabold">مجموع امتیاز فعلی</th>
                  <th className="p-4 font-extrabold">مجموع خرید تاریخی</th>
                  <th className="p-4 font-extrabold">آخرین فعالیت</th>
                  <th className="p-4 font-extrabold text-center">مدیریت پاداش</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-black text-slate-800 dir-ltr text-right">
                      {m.cardHash}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black ${
                        m.tier === 'PLATINUM' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' :
                        m.tier === 'GOLD' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {m.tier}
                      </span>
                    </td>
                    <td className="p-4 font-black text-amber-600">
                      {m.points.toLocaleString('fa-IR')} <span className="text-[10px] font-bold text-slate-400">امتیاز</span>
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      {m.totalSpent.toLocaleString('fa-IR')} <span className="text-[10px] font-bold text-slate-400">تومان</span>
                    </td>
                    <td className="p-4 font-bold text-slate-500">{m.lastActive}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setRewardModal({ isOpen: true, member: m })}
                        className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-black transition-all inline-flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        اهداء امتیاز بنوس
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Grant Bonus Points */}
        <AnimatePresence>
          {rewardModal.isOpen && rewardModal.member && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white p-6 rounded-[28px] w-full max-w-md shadow-2xl border border-slate-100 relative"
              >
                <button
                  onClick={() => setRewardModal({ isOpen: false, member: null })}
                  className="absolute left-5 top-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                    <Star className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">اعطای امتیاز پاداش دستی</h3>
                    <p className="text-xs font-bold text-slate-400">کارت: {rewardModal.member.cardHash}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-extrabold text-slate-700 block mb-2">تعداد امتیاز هدیه:</label>
                  <input
                    type="number"
                    value={bonusPoints}
                    onChange={(e) => setBonusPoints(Number(e.target.value))}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleGrantBonus}
                    disabled={isSubmitting}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl text-xs font-black transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'در حال ثبت...' : 'تایید و افزایش امتیاز'}
                  </button>
                  <button
                    onClick={() => setRewardModal({ isOpen: false, member: null })}
                    className="px-4 bg-slate-100 text-slate-700 py-3 rounded-2xl text-xs font-bold hover:bg-slate-200 transition"
                  >
                    انصراف
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}