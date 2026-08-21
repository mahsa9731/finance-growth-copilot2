'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { HelpCircle, FileText, CheckCircle2, ChevronDown, ShieldCheck, Cpu } from 'lucide-react';

export default function TraceabilityPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const faqItems = [
    {
      title: 'شاخص‌های رشد و فروش چگونه محاسبه می‌شوند؟',
      content: 'تمامی مقادیر فروش کل و نرخ موفقیت بر اساس تراکنش‌های موفق ثبت‌شده در درگاه‌های پرداخت هوشمند، با اعمال فیلترهای زمانی دلخواه و الگوریتم‌های تطبیق داده‌های بانکی به صورت آنی محاسبه و به‌روزرسانی می‌شوند.'
    },
    {
      title: 'رتبه بندی و شناسایی مشتریان وفادار بر چه اساسی است؟',
      content: 'سیستم با استفاده از هش امن کارت بانکی (Card Hash)، تعداد دفعات تراکنش و مجموع مبلغ خرید هر مشتری را در بازه‌های زمانی مختلف تحلیل کرده و مشتریانی که بیشترین استمرار خرید را داشته‌اند در لیست وفادارترین‌ها قرار می‌دهد.'
    },
    {
      title: 'سیستم سوئیچینگ هوشمند پایداری درگاه چگونه عمل می‌کند؟',
      content: 'هنگام بروز خطا یا قطعی در یک درگاه بانکی، موتور هوشمند مسیریابی تراکنش‌ها به صورت خودکار و در کمتر از چند ثانیه، ترافیک پرداخت را به پایدارترین درگاه فعال منتقل می‌کند تا هیچ فروشی از دست نرود.'
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 dir-rtl font-sans text-slate-800">
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-lg font-extrabold text-slate-800">شفافیت داده‌ها و راهنمای سیستم</h1>
            <p className="text-xs text-slate-500 mt-1">آشنایی با نحوه پردازش محاسبات، قوانین داوری و مستندات فنی پنل پذیرندگان</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
            <HelpCircle className="w-6 h-6" />
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-slate-800">امنیت و حریم خصوصی داده‌ها</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              اطلاعات کارت‌های بانکی کاربران به صورت هش‌شده (Hash) و با بالاترین استانداردهای امنیتی پردازش می‌شوند و هیچ‌گونه دسترسی به اطلاعات کامل حساب اشخاص وجود ندارد.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center border border-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-slate-800">پردازش هوشمند و الگوریتم‌ها</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              تحلیل‌ها و توصیه‌های مستقیم سودآور بر مبنای مدل‌های بهینه‌سازی، توازن بار درگاه‌ها و الگوهای رفتارشناسی خرید مشتریان ارائه می‌شوند.
            </p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <FileText className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-sm text-slate-800">مستندات و پرسش‌های متداول</h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white/50 transition-all"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full p-4 text-right flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50/50 transition"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                    {item.title}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openSection === index ? 'rotate-180' : ''}`} />
                </button>
                
                {openSection === index && (
                  <div className="p-4 pt-0 text-xs text-slate-500 leading-relaxed border-t border-slate-100/60 bg-slate-50/30">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}