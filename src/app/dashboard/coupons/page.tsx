'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tag, 
  Plus, 
  Search, 
  Copy, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Clock, 
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  title: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minSpend: number;
  usageLimit: number;
  usedCount: number;
  expireDate: string;
  isActive: boolean;
}

const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'YALDA1405',
    title: 'کمپین ویژه شگفت‌انگیز پاییز',
    type: 'PERCENTAGE',
    value: 20,
    minSpend: 500000,
    usageLimit: 1000,
    usedCount: 642,
    expireDate: '۱۴۰۵/۰۸/۳۰',
    isActive: true
  },
  {
    id: 'coup-2',
    code: 'WELCOME50',
    title: 'تخفیف خوش‌آمدگویی ثبت‌نام اعضا',
    type: 'FIXED',
    value: 50000,
    minSpend: 200000,
    usageLimit: 5000,
    usedCount: 3120,
    expireDate: '۱۴۰۵/۱۲/۲۹',
    isActive: true
  },
  {
    id: 'coup-3',
    code: 'VIPGOLD',
    title: 'تخفیف اختصاصی مشتریان سطح طلایی',
    type: 'PERCENTAGE',
    value: 15,
    minSpend: 1000000,
    usageLimit: 200,
    usedCount: 198,
    expireDate: '۱۴۰۵/۰۶/۱۵',
    isActive: false
  }
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [newValue, setNewValue] = useState<number>(10);
  const [newMinSpend, setNewMinSpend] = useState<number>(0);
  const [newLimit, setNewLimit] = useState<number>(100);

  const filteredCoupons = coupons.filter(
    (c) => c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.title.includes(searchQuery)
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newTitle) return;

    const coupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: newCode.toUpperCase().trim(),
      title: newTitle,
      type: newType,
      value: Number(newValue),
      minSpend: Number(newMinSpend),
      usageLimit: Number(newLimit),
      usedCount: 0,
      expireDate: '۱۴۰۵/۰۹/۳۰',
      isActive: true
    };

    setCoupons([coupon, ...coupons]);
    setIsModalOpen(false);
    setToastMessage(`کد تخفیف ${coupon.code} با موفقیت ساخته شد.`);
    setTimeout(() => setToastMessage(null), 4000);

    setNewCode('');
    setNewTitle('');
    setNewValue(10);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Tag className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                مدیریت تخفیف‌ها و کدهای پروموشن
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              ایجاد کدهای تخفیف، تعریف شرایط استفاده و نظارت بر بهره‌وری کمپین‌های فروش
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-blue-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            ایجاد کد تخفیف جدید
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

        {/* Top Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">کدهای فعال کمپین</span>
              <span className="text-xl font-black text-slate-900">
                {coupons.filter((c) => c.isActive).length} کد
              </span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">مجموع استفاده‌ها</span>
              <span className="text-xl font-black text-blue-600">
                {coupons.reduce((acc, curr) => acc + curr.usedCount, 0).toLocaleString('fa-IR')} بار
              </span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Tag className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">کدهای منقضی‌شده / غیرفعال</span>
              <span className="text-xl font-black text-rose-600">
                {coupons.filter((c) => !c.isActive).length} کد
              </span>
            </div>
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جستجوی کد تخفیف یا عنوان کمپین..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pr-10 pl-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Coupon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => {
            const usagePercent = Math.min(100, Math.round((coupon.usedCount / coupon.usageLimit) * 100));

            return (
              <motion.div
                key={coupon.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white rounded-[28px] border p-6 shadow-xl relative overflow-hidden flex flex-col justify-between transition-all ${
                  coupon.isActive ? 'border-slate-200/80' : 'border-slate-200 opacity-60 bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-extrabold text-slate-500">{coupon.title}</span>
                    <button
                      onClick={() => handleToggleActive(coupon.id)}
                      className="text-slate-400 hover:text-slate-600 transition"
                    >
                      {coupon.isActive ? (
                        <ToggleRight className="w-7 h-7 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Code Box: Blue Styling */}
                  <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white p-4 rounded-2xl flex items-center justify-between mb-4 shadow-md shadow-blue-500/10">
                    <div className="font-mono font-black text-base tracking-wider text-amber-300 dir-ltr">
                      {coupon.code}
                    </div>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="p-1.5 hover:bg-white/20 rounded-xl transition text-white/90"
                    >
                      {copiedCode === coupon.code ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs font-extrabold text-slate-600 mb-6">
                    <div className="flex justify-between">
                      <span>مقدار تخفیف:</span>
                      <span className="text-slate-900 font-black">
                        {coupon.type === 'PERCENTAGE'
                          ? `%${coupon.value}`
                          : `${coupon.value.toLocaleString('fa-IR')} تومان`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>حداقل کف خرید:</span>
                      <span className="text-slate-900 font-black">
                        {coupon.minSpend > 0 ? `${coupon.minSpend.toLocaleString('fa-IR')} تومان` : 'بدون محدودیت'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>تاریخ اعتبار:</span>
                      <span className="text-slate-900 font-black">{coupon.expireDate}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-black mb-1.5 text-slate-500">
                    <span>میزان استفاده:</span>
                    <span>{coupon.usedCount} از {coupon.usageLimit} ({usagePercent}٪)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        usagePercent >= 90 ? 'bg-rose-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Create New Coupon */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white p-6 rounded-[28px] w-full max-w-lg shadow-2xl border border-slate-100 relative"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute left-5 top-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                    <Tag className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">تعریف کد تخفیف جدید</h3>
                    <p className="text-xs font-bold text-slate-400">تنظیم مشخصات و قوانین اعتبارسنجی کد</p>
                  </div>
                </div>

                <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs font-extrabold text-slate-700">
                  <div>
                    <label className="block mb-1.5">عنوان کمپین / پروموشن:</label>
                    <input
                      type="text"
                      placeholder="مثلاً: تخفیف جشنواره پاییزه"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1.5">کد تخفیف (لاتین):</label>
                      <input
                        type="text"
                        placeholder="OFF20"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        required
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-mono text-center uppercase transition"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">نوع تخفیف:</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as 'PERCENTAGE' | 'FIXED')}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition"
                      >
                        <option value="PERCENTAGE">درصدی (٪)</option>
                        <option value="FIXED">مبلغ ثابت (تومان)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1.5">
                        {newType === 'PERCENTAGE' ? 'درصد تخفیف:' : 'مبلغ تخفیف (تومان):'}
                      </label>
                      <input
                        type="number"
                        value={newValue}
                        onChange={(e) => setNewValue(Number(e.target.value))}
                        required
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5">حداقل مبلغ سفارش (تومان):</label>
                      <input
                        type="number"
                        value={newMinSpend}
                        onChange={(e) => setNewMinSpend(Number(e.target.value))}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5">سقف تعداد استفاده کل:</label>
                    <input
                      type="number"
                      value={newLimit}
                      onChange={(e) => setNewLimit(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-xs font-black transition-all shadow-md shadow-blue-200"
                    >
                      ذخیره و فعال‌سازی کد
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

      </div>
    </DashboardLayout>
  );
}