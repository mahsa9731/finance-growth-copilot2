'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Customer {
  cardHash: string;
  totalSpent: number;
  count: number;
}

export default function CustomersPage() {
  const [customers] = useState<Customer[]>([
    { cardHash: '62198610****4321', totalSpent: 45000000, count: 8 },
    { cardHash: '60379918****9876', totalSpent: 28000000, count: 5 },
    { cardHash: '58921012****1122', totalSpent: 12000000, count: 3 },
  ]);

  const [smsModal, setSmsModal] = useState<{ isOpen: boolean; cardHash: string | null }>({ isOpen: false, cardHash: null });
  const [message, setMessage] = useState('مشتری گرامی، از خرید شما سپاسگزاریم. پیشنهاد ویژه‌ای برای شما داریم.');
  const [success, setSuccess] = useState(false);

 
  const handleSendSms = async () => {
    console.log("Sending SMS to:", smsModal.cardHash, "Content:", message);
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setSuccess(true);
    setSmsModal({ isOpen: false, cardHash: null });
    
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 dir-rtl font-sans text-slate-800">
        <h1 className="text-lg font-bold mb-6">مدیریت مشتریان و وفادارسازی</h1>
        
        {success && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-sm flex items-center">
            <span className="ml-2">✅</span> پیامک با موفقیت برای مشتری ارسال شد.
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4">شماره کارت</th>
                <th className="p-4">مجموع خرید</th>
                <th className="p-4">تعداد تراکنش</th>
                <th className="p-4">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.cardHash} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="p-4 font-mono text-slate-600">{c.cardHash}</td>
                  <td className="p-4 font-bold">{c.totalSpent.toLocaleString('fa-IR')} <span className="text-[10px] text-slate-400 font-normal">تومان</span></td>
                  <td className="p-4 text-slate-600">{c.count}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSmsModal({ isOpen: true, cardHash: c.cardHash })}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs hover:bg-blue-700 transition"
                    >
                      ارسال پیامک
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {smsModal.isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl">
            <h3 className="font-bold mb-4 text-sm text-slate-800">ارسال پیامک به {smsModal.cardHash}</h3>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm mb-4 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="flex gap-2">
              <button 
                onClick={handleSendSms} 
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm hover:bg-emerald-700 transition"
              >
                ارسال نهایی
              </button>
              <button 
                onClick={() => setSmsModal({ isOpen: false, cardHash: null })} 
                className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg text-sm hover:bg-slate-200 transition"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}