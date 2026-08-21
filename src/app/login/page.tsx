'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Loader2, 
  Lock, 
  User, 
  LogIn, 
  ShieldCheck 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      router.push('/onboarding/step-1');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden font-sans" dir="rtl">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-300/40 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 md:p-8 text-slate-900 shadow-2xl"
      >
        {/* Top badge */}
        <div className="flex items-center justify-start mb-6 pb-4 border-b border-slate-200/80">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-300/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 ml-1.5 text-indigo-600" />
            ورود به سامانه هوشمند
          </span>
        </div>

        {/* Title and subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
            به پنل تحلیلی کسب و کار خوش آمدید
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-600">
            برای دسترسی به داده‌ها و گزارش‌های هوشمند، اطلاعات ورود خود را وارد کنید
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 block mr-1">
              نام کاربری یا ایمیل
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کاربری خود را وارد کنید"
                className="w-full bg-white/80 border border-slate-300/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl pr-10 pl-4 py-3 text-xs md:text-sm text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 block mr-1">
              رمز عبور
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                className="w-full bg-white/80 border border-slate-300/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl pr-10 pl-4 py-3 text-xs md:text-sm text-slate-900 font-bold outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs md:text-sm flex items-center justify-center transition-all shadow-md shadow-indigo-300 disabled:opacity-80"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  در حال ورود به سیستم...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 ml-2 stroke-[2.5]" />
                  ورود به پنل تحلیلی
                </>
              )}
            </button>
          </div>
        </form>

        {/* Feature status card */}
        <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/80 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-extrabold block text-slate-900">امنیت لایه شبکه</span>
              <span className="text-[10px] font-bold text-slate-500">اتصال ایمن در جهت تحلیل هوشمند</span>
            </div>
          </div>
          <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300/50">
            فعال
          </span>
        </div>
      </motion.div>
    </div>
  );
}