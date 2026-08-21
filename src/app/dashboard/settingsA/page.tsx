'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Key, 
  ShieldCheck, 
  Webhook, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Copy, 
  ExternalLink,
  Zap,
  Save,
  Server,
  Code
} from 'lucide-react';

export default function ZarinPalSettingsPage() {
  // Config state
  const [merchantId, setMerchantId] = useState('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
  const [showMerchantId, setShowMerchantId] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const [autoVerify, setAutoVerify] = useState(true);
  const [paymentCurrency, setPaymentCurrency] = useState<'IRT' | 'IRR'>('IRT');
  const [callbackUrl, setCallbackUrl] = useState('https://yourdomain.com/api/payments/verify');
  const [webhookUrl, setWebhookUrl] = useState('https://yourdomain.com/api/webhooks/zarinpal');
  const [ipRestricted, setIpRestricted] = useState(true);
  const [allowedIps, setAllowedIps] = useState('185.143.233.10, 185.143.233.11');

  // UI States
  const [isSaved, setIsSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopyMerchant = () => {
    navigator.clipboard.writeText(merchantId);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                <CreditCard className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                تنظیمات پیشرفته درگاه زرین‌پال (ZarinPal)
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              مدیریت مرچنت‌آیدی، پیکربندی محیط Sandbox، پارامترهای تایید پرداخت و آدرس‌های Webhook
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://panel.zarinpal.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-extrabold text-slate-700 hover:bg-slate-50 shadow-sm transition"
            >
              <span>ورود به پنل زرین‌پال</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Status Notification Banner */}
        <AnimatePresence>
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center justify-between text-emerald-800 text-xs font-bold"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>تنظیمات درگاه زرین‌پال با موفقیت بروزرسانی شد و متغیرها اعمال گردیدند.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Merchant ID & Environment Credentials */}
          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-slate-900">اطلاعات احراز هویت درگاه</h3>
              </div>
              <span className={`px-3 py-1 rounded-xl text-[10px] font-black ${isSandbox ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {isSandbox ? 'محیط آزمایشی (Sandbox)' : 'محیط عملیاتی (Production)'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Merchant ID Input */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <span>Merchant ID (مرچنت آیدی)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showMerchantId ? 'text' : 'password'}
                    value={merchantId}
                    onChange={(e) => setMerchantId(e.target.value)}
                    className="w-full dir-ltr pl-20 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-amber-500 transition"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  />
                  <div className="absolute left-2 top-2.5 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowMerchantId(!showMerchantId)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
                      title={showMerchantId ? 'پنهان‌سازی' : 'نمایش'}
                    >
                      {showMerchantId ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyMerchant}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
                      title="کپی"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {copiedKey && <span className="text-[10px] font-bold text-emerald-600 mr-1">کپی شد!</span>}
              </div>

              {/* Currency Unit Selection */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-700">واحد پول پیش‌فرض ارسال به درگاه</label>
                <div className="grid grid-cols-2 gap-3 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setPaymentCurrency('IRT')}
                    className={`py-2.5 px-4 rounded-2xl text-xs font-extrabold border transition ${
                      paymentCurrency === 'IRT' 
                        ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    تومان (IRT)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentCurrency('IRR')}
                    className={`py-2.5 px-4 rounded-2xl text-xs font-extrabold border transition ${
                      paymentCurrency === 'IRR' 
                        ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    ریال (IRR)
                  </button>
                </div>
              </div>

            </div>

            {/* Sandbox Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                  <Code className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900">فعال‌سازی حالت آزمایشی (Sandbox)</h4>
                  <p className="text-[11px] font-bold text-slate-500">
                    برای تست تراکنش‌ها بدون کسر واقعی پول از کارت بانکی استفاده کنید.
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isSandbox} 
                  onChange={(e) => setIsSandbox(e.target.checked)} 
                  className="sr-only" 
                />
                <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${isSandbox ? 'bg-amber-500' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-y-0.5 ${isSandbox ? '-translate-x-5' : '-translate-x-0.5'}`} />
                </div>
              </label>
            </div>
          </div>

          {/* Section 2: Callbacks & Webhook Settings */}
          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <Webhook className="w-5 h-5 text-blue-600" />
              <h3 className="font-extrabold text-base text-slate-900">مسیرهای بازگشت و Webhook</h3>
            </div>

            <div className="space-y-4">
              
              {/* Callback URL */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-700">Callback URL (آدرس بازگشت خریدار پس از پرداخت)</label>
                <input
                  type="text"
                  value={callbackUrl}
                  onChange={(e) => setCallbackUrl(e.target.value)}
                  className="w-full dir-ltr px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Webhook URL */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-700">Webhook URL (ارسال استعلام آنی تراکنش از سمت زرین‌پال)</label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full dir-ltr px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Auto Verify Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/60 mt-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                    <Zap className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">تایید خودکار تراکنش‌ها (Auto Payment Verify)</h4>
                    <p className="text-[11px] font-bold text-slate-500">
                      اجرای متد Verification بلافاصله پس از بازگشت کاربر از درگاه.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={autoVerify} 
                    onChange={(e) => setAutoVerify(e.target.checked)} 
                    className="sr-only" 
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${autoVerify ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-y-0.5 ${autoVerify ? '-translate-x-5' : '-translate-x-0.5'}`} />
                  </div>
                </label>
              </div>

            </div>
          </div>

          {/* Section 3: Security & IP Whitelisting */}
          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-base text-slate-900">امنیتی و محدودسازی IP Server</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                    <Server className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">محدودسازی سرور درخواست‌دهنده (IP Restrictions)</h4>
                    <p className="text-[11px] font-bold text-slate-500">
                      پذیرش استعلام و ایجاد شناسه پرداخت فقط از IPهای مجاز سرور شما.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={ipRestricted} 
                    onChange={(e) => setIpRestricted(e.target.checked)} 
                    className="sr-only" 
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${ipRestricted ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-y-0.5 ${ipRestricted ? '-translate-x-5' : '-translate-x-0.5'}`} />
                  </div>
                </label>
              </div>

              {ipRestricted && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-extrabold text-slate-700">آدرس‌های IP مجاز (با ویرگول جدا کنید)</label>
                  <input
                    type="text"
                    value={allowedIps}
                    onChange={(e) => setAllowedIps(e.target.value)}
                    className="w-full dir-ltr px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500 transition"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit / Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-xl transition transform active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره تغییرات و اعمال متغیرها</span>
            </button>
          </div>

        </form>

      </div>
    </DashboardLayout>
  );
}