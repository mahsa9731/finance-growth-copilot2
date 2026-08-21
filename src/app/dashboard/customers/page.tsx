'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Send, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  X, 
  CreditCard, 
  ShoppingBag, 
  TrendingUp, 
  ChevronLeft,
  MessageSquare,
  Gift,
  Zap,
  UserCheck
} from 'lucide-react';

interface Customer {
  id: string;
  rank: number;
  cardHash: string;
  bankName: string;
  totalSpent: number;
  count: number;
  lastPurchase: string;
  loyaltyTier: 'Gold' | 'Silver' | 'Bronze' | 'VIP';
  score: number;
}

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    rank: 1,
    cardHash: '6219-8610-****-4321',
    bankName: 'سامان',
    totalSpent: 148500000,
    count: 24,
    lastPurchase: '۱۰ دقیقه پیش',
    loyaltyTier: 'VIP',
    score: 980
  },
  {
    id: 'cust-2',
    rank: 2,
    cardHash: '6037-9918-****-9876',
    bankName: 'ملی',
    totalSpent: 92400000,
    count: 18,
    lastPurchase: '۲ ساعت پیش',
    loyaltyTier: 'Gold',
    score: 840
  },
  {
    id: 'cust-3',
    rank: 3,
    cardHash: '5892-1012-****-1122',
    bankName: 'سپه',
    totalSpent: 67100000,
    count: 14,
    lastPurchase: 'امروز، ۱۱:۳۰',
    loyaltyTier: 'Gold',
    score: 710
  },
  {
    id: 'cust-4',
    rank: 4,
    cardHash: '6274-1211-****-5544',
    bankName: 'اقتصاد نوین',
    totalSpent: 41200000,
    count: 9,
    lastPurchase: 'دیروز',
    loyaltyTier: 'Silver',
    score: 550
  },
  {
    id: 'cust-5',
    rank: 5,
    cardHash: '5022-2910-****-3388',
    bankName: 'پاسارگاد',
    totalSpent: 29800000,
    count: 7,
    lastPurchase: '۳ روز پیش',
    loyaltyTier: 'Silver',
    score: 420
  },
  {
    id: 'cust-6',
    rank: 6,
    cardHash: '6104-3378-****-9012',
    bankName: 'ملت',
    totalSpent: 18500000,
    count: 4,
    lastPurchase: '۵ روز پیش',
    loyaltyTier: 'Bronze',
    score: 290
  }
];

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [smsModal, setSmsModal] = useState<{ isOpen: boolean; customer: Customer | null }>({ isOpen: false, customer: null });
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = c.cardHash.includes(searchQuery) || c.bankName.includes(searchQuery);
    const matchesTier = selectedTier === 'ALL' || c.loyaltyTier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const topThree = customers.slice(0, 3);

  const openSmsModalWithTemplate = (customer: Customer, templateType: 'discount' | 'thanks' | 'vip') => {
    let msg = '';
    if (templateType === 'discount') {
      msg = `مشتری گرامی (${customer.cardHash.slice(-4)})، کد تخفیف ۲۰٪ ویژه خرید بعدی شما: VIP20. اعتبار تا پایان هفته.`;
    } else if (templateType === 'thanks') {
      msg = `از خریدهای متوالی شما سپاسگزاریم! امتیاز وفاداری شما به ${customer.score} رسید.`;
    } else {
      msg = `شما در سطح ویژه ${customer.loyaltyTier} قرار گرفتید. پشتیبانی اختصاصی شما فعال شد.`;
    }
    setMessage(msg);
    setSmsModal({ isOpen: true, customer });
  };

  const handleSendSms = async () => {
    if (!message.trim()) return;
    setIsSending(true);
    
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    setIsSending(false);
    setSmsModal({ isOpen: false, customer: null });
    setToastMessage(`پیامک با موفقیت به مشتری کارت ${smsModal.customer?.cardHash.slice(-4)} ارسال شد.`);
    
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                <Trophy className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                لیدربورد مشتریان وفادار
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              تحلیل برترین خریداران، رتبه‌بندی بر اساس حجم تراکنش و ارسال مستقیم مشوق‌های تجاری
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-3">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">کل خریداران شناسایی شده</span>
                <span className="text-sm font-black text-slate-800">۱۲,۴۵۰ کارت</span>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 p-4 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-200 stroke-[2.5]" />
                <span className="text-xs md:text-sm font-bold">{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-white/20 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {topThree.map((customer, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            
            return (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-[28px] p-6 backdrop-blur-xl border transition-all duration-300 shadow-xl ${
                  isFirst
                    ? 'bg-gradient-to-b from-amber-500/10 via-white to-white border-amber-300/80 shadow-amber-500/10 md:-translate-y-2'
                    : isSecond
                    ? 'bg-gradient-to-b from-slate-300/20 via-white to-white border-slate-300 shadow-slate-500/5'
                    : 'bg-gradient-to-b from-orange-400/10 via-white to-white border-orange-200 shadow-orange-500/5'
                }`}
              >
                <div className="absolute -top-4 right-6">
                  {isFirst && (
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-md shadow-amber-300">
                      <Crown className="w-3.5 h-3.5 fill-current" /> قهرمان خرید
                    </span>
                  )}
                  {isSecond && (
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-md">
                      <Medal className="w-3.5 h-3.5" /> رتبه دوم
                    </span>
                  )}
                  {!isFirst && !isSecond && (
                    <span className="bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-md">
                      <Medal className="w-3.5 h-3.5" /> رتبه سوم
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-start mt-2 mb-4">
                  <div>
                    <span className="text-[11px] font-extrabold text-slate-400 block mb-0.5">بانک {customer.bankName}</span>
                    <span className="font-mono text-sm font-black text-slate-800 dir-ltr inline-block">
                      {customer.cardHash}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black ${
                    customer.loyaltyTier === 'VIP' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {customer.loyaltyTier}
                  </span>
                </div>

                <div className="space-y-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-indigo-600" /> مجموع خرید:
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      {customer.totalSpent.toLocaleString('fa-IR')} <span className="text-[10px] font-bold text-slate-400">تومان</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" /> تراکنش‌ها:
                    </span>
                    <span className="text-xs font-black text-slate-800">{customer.count} بار</span>
                  </div>
                </div>

                <button
                  onClick={() => openSmsModalWithTemplate(customer, 'discount')}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isFirst
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  ارسال اشانتیون / کد تخفیف
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="جستجو بر اساس شماره کارت یا نام بانک..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-10 pl-4 py-2.5 text-xs md:text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {['ALL', 'VIP', 'Gold', 'Silver', 'Bronze'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    selectedTier === tier
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tier === 'ALL' ? 'همه سطح‌ها' : tier}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-extrabold">رتبه</th>
                  <th className="p-4 font-extrabold">اطلاعات کارت / بانک</th>
                  <th className="p-4 font-extrabold">سطح وفاداری</th>
                  <th className="p-4 font-extrabold">مجموع خرید</th>
                  <th className="p-4 font-extrabold">تراکنش‌ها</th>
                  <th className="p-4 font-extrabold">آخرین فعالیت</th>
                  <th className="p-4 font-extrabold text-center">عملیات وفادارسازی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-black text-slate-900">
                      <span className={`w-7 h-7 rounded-lg inline-flex items-center justify-center text-xs ${
                        c.rank === 1 ? 'bg-amber-100 text-amber-700 font-extrabold' :
                        c.rank === 2 ? 'bg-slate-200 text-slate-700 font-extrabold' :
                        c.rank === 3 ? 'bg-orange-100 text-orange-800 font-extrabold' :
                        'text-slate-500'
                      }`}>
                        #{c.rank}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-mono font-bold text-slate-800 dir-ltr inline-block">
                        {c.cardHash}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                        بانک {c.bankName}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black inline-block ${
                        c.loyaltyTier === 'VIP' ? 'bg-purple-100 text-purple-700' :
                        c.loyaltyTier === 'Gold' ? 'bg-amber-100 text-amber-800' :
                        c.loyaltyTier === 'Silver' ? 'bg-slate-100 text-slate-700' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {c.loyaltyTier}
                      </span>
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      {c.totalSpent.toLocaleString('fa-IR')} <span className="text-[10px] font-bold text-slate-400">تومان</span>
                    </td>
                    <td className="p-4 font-bold text-slate-700">
                      {c.count} <span className="text-[10px] font-normal text-slate-400">بار</span>
                    </td>
                    <td className="p-4 text-slate-500 font-bold text-xs">
                      {c.lastPurchase}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openSmsModalWithTemplate(c, 'discount')}
                          className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition text-xs font-bold flex items-center gap-1"
                          title="ارسال کوپن"
                        >
                          <Gift className="w-3.5 h-3.5" />
                          <span className="hidden lg:inline">ارسال کوپن</span>
                        </button>
                        <button
                          onClick={() => openSmsModalWithTemplate(c, 'thanks')}
                          className="p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition text-xs font-bold flex items-center gap-1"
                          title="ارسال پیامک تشکر"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="hidden lg:inline">پیامک</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AnimatePresence>
          {smsModal.isOpen && smsModal.customer && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white p-6 rounded-[28px] w-full max-w-lg shadow-2xl border border-slate-100 relative"
              >
                <button
                  onClick={() => setSmsModal({ isOpen: false, customer: null })}
                  className="absolute left-5 top-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
                    <Send className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      ارسال پیامک وفادارسازی
                    </h3>
                    <p className="text-xs font-bold text-slate-400">
                      گیرنده: کارت {smsModal.customer.cardHash} (بانک {smsModal.customer.bankName})
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-extrabold text-slate-700 block mb-2">قالب‌های آماده پیامک:</span>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button
                      onClick={() => openSmsModalWithTemplate(smsModal.customer!, 'discount')}
                      className="text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> کد تخفیف ۲۰٪
                    </button>
                    <button
                      onClick={() => openSmsModalWithTemplate(smsModal.customer!, 'thanks')}
                      className="text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3" /> تشکر و ثبت امتیاز
                    </button>
                    <button
                      onClick={() => openSmsModalWithTemplate(smsModal.customer!, 'vip')}
                      className="text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                    >
                      <Crown className="w-3 h-3" /> ارتقاء به VIP
                    </button>
                  </div>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs md:text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                    placeholder="متن پیامک خود را بنویسید..."
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-6">
                  <span>تعداد کاراکتر: {message.length}</span>
                  <span>هزینه: ۱ پیامک فارسی</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSendSms}
                    disabled={isSending || !message.trim()}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3.5 rounded-2xl text-xs md:text-sm font-black transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <span>در حال ارسال...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        تایید و ارسال آنی
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setSmsModal({ isOpen: false, customer: null })}
                    className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl text-xs md:text-sm font-bold transition"
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