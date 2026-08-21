'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  TrendingUp, 
  Trophy, 
  AlertCircle,
  CheckCircle2,
  Zap,
  Target,
  ShieldAlert,
  ArrowUpRight,
  ListCheck,
  StickyNote,
  Save
} from 'lucide-react';

type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  impactText: string;
  icon: React.ElementType;
}

interface SeasonData {
  title: string;
  badgeTitle: string;
  image: string;
  revenue: string;
  industryBenchmark: string;
  isPositive: boolean;
  colorScheme: {
    badgeBg: string;
    gradient: string;
  };
  recommendation: string;
  actions: ActionItem[];
}

const seasons: Record<SeasonKey, SeasonData> = {
  spring: {
    title: 'فصل بهار (فروردین - خرداد)',
    badgeTitle: 'شروع پرانرژی سال 🌸',
    image: '/image/spring.jpg',
    revenue: '۱۲۸,۵۰۰,۰۰۰ تومان',
    industryBenchmark: '۱۲٪ بالاتر از هم‌صنفی‌ها',
    isPositive: true,
    colorScheme: {
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      gradient: 'from-emerald-950/80 via-slate-900/60 to-transparent',
    },
    recommendation: 'بازار بهاری تازه جون گرفته! با یه کمپین تخفیف عیدانه، مشتری‌های جدید رو پایه‌ثابت فروشت کن.',
    actions: [
      {
        id: 'sp-1',
        title: 'راه اندازی کمپین خوش‌آمدگویی بهاری',
        description: 'ارسال کد تخفیف ۱۰ درصدی برای خریدارانی که در ۳ ماه گذشته خریدی نداشته‌اند.',
        priority: 'HIGH',
        impactText: 'افزایش ۱۵٪ فروش کل',
        icon: Zap,
      },
      {
        id: 'sp-2',
        title: 'بهینه‌سازی نرخ کارمزد درگاه‌ها',
        description: 'بررسی تسویه‌حساب‌ها و هدایت تراکنش‌های سنگین به درگاه‌های کم‌کارمزدتر.',
        priority: 'MEDIUM',
        impactText: 'کاهش هزینه کارمزد',
        icon: Target,
      },
      {
        id: 'sp-3',
        title: 'بازبینی کالاهای کم‌فروش سال قبل',
        description: 'تخفیف‌گذاری ویژه روی انبار قدیمی برای نقد کردن سرمایه در گردش.',
        priority: 'LOW',
        impactText: 'بهبود گردش مالی',
        icon: ArrowUpRight,
      },
    ],
  },
  summer: {
    title: 'فصل تابستان (تیر - شهریور)',
    badgeTitle: 'فصل داغ فروش ☀️',
    image: '/image/summer.jpg',
    revenue: '۱۹۴,۲۰۰,۰۰۰ تومان',
    industryBenchmark: '۲۴٪ بالاتر از هم‌صنفی‌ها',
    isPositive: true,
    colorScheme: {
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      gradient: 'from-amber-950/80 via-slate-900/60 to-transparent',
    },
    recommendation: 'ترافیک خریدارات تو اوجه! حواست به درگاهت باشه تا هیچ مشتری‌ای موقع پرداخت با خطا روبرو نشه.',
    actions: [
      {
        id: 'su-1',
        title: 'فعال‌سازی سوییچینگ هوشمند درگاه پشتیبان',
        description: 'اتصال فوری به درگاه جایگزین در صورت بروز خطا در بانک اصلی برای صفر کردن ریزش.',
        priority: 'HIGH',
        impactText: 'جلوگیری از قطع فروش',
        icon: ShieldAlert,
      },
      {
        id: 'su-2',
        title: 'ارسال پیامک بازیابی سبد خریدهای رها شده',
        description: 'ارسال خودکار لینک پرداخت با تخفیف ۵٪ به کسانی که در گام آخر انصراف داده‌اند.',
        priority: 'HIGH',
        impactText: 'بازگردانی ۲۰٪ خریدهای ناموفق',
        icon: Zap,
      },
      {
        id: 'su-3',
        title: 'ایجاد باشگاه خریداران تابستانی',
        description: 'اعطای امتیاز ویژه به خریدهای بالای ۱ میلیون تومان برای خریدهای بعدی.',
        priority: 'MEDIUM',
        impactText: 'افزایش وفاداری مشتری',
        icon: Target,
      },
    ],
  },
  autumn: {
    title: 'فصل پاییز (مهر - آذر)',
    badgeTitle: 'فرصت طلایی برگشت 🍂',
    image: '/image/autumn.jpg',
    revenue: '۹۵,۰۰۰,۰۰۰ تومان',
    industryBenchmark: '۵٪ پایین‌تر از هم‌صنفی‌ها',
    isPositive: false,
    colorScheme: {
      badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
      gradient: 'from-orange-950/80 via-slate-900/60 to-transparent',
    },
    recommendation: 'فروش کمی آروم شده؛ الان وقتشه با یه پیامک دوستانه و جشنواره پاییزی، مشتری‌های قدیمی رو برگردونی.',
    actions: [
      {
        id: 'au-1',
        title: 'برگزاری کمپین بازگشت (Re-engagement)',
        description: 'شناسایی و ارسال پیشنهاد اختصاصی به مشتریانی که بیش از ۶۰ روز است خریدی نداشته‌اند.',
        priority: 'HIGH',
        impactText: 'جبران افت فروش پاییزی',
        icon: Zap,
      },
      {
        id: 'au-2',
        title: 'ارائه پیشنهاد مکمل (Cross-Sell) در صفحه پرداخت',
        description: 'پیشنهاد محصولات جانبی و ارزان‌قیمت در مرحله نهایی فاکتور.',
        priority: 'MEDIUM',
        impactText: 'افزایش میانگین مبلغ فاکتور',
        icon: Target,
      },
      {
        id: 'au-3',
        title: 'بررسی علت افت تراکنش‌های بانک‌های ناموفق',
        description: 'غیرفعال‌سازی موقت بانک‌هایی که نرخ موفقیت زیر ۶۰٪ داشته‌اند.',
        priority: 'LOW',
        impactText: 'بهبود تجربه پرداخت',
        icon: ShieldAlert,
      },
    ],
  },
  winter: {
    title: 'فصل زمستان (دی - اسفند)',
    badgeTitle: 'حساب‌کشی پایان سال ❄️',
    image: '/image/winter.jpg',
    revenue: '۱۵۶,۸۰۰,۰۰۰ تومان',
    industryBenchmark: '۱۵٪ بالاتر از هم‌صنفی‌ها',
    isPositive: true,
    colorScheme: {
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
      gradient: 'from-sky-950/80 via-slate-900/60 to-transparent',
    },
    recommendation: 'خریدهای شب عید شروع شده! با آمادگی کامل و پشتیبانی سریع، سال رو با یه حد نصاب عالی تموم کن.',
    actions: [
      {
        id: 'wi-1',
        title: 'آماده‌سازی حراج بزرگ پایان سال (حراج اسفند)',
        description: 'تنظیم زیرساخت درگاه و محصولات برای ترافیک سنگین هفته‌های پایانی سال.',
        priority: 'HIGH',
        impactText: 'بیشترین رکورد فروش سال',
        icon: Zap,
      },
      {
        id: 'wi-2',
        title: 'ارسال اعتبار هدیه به ۱۰٪ مشتریان برتر',
        description: 'تقدیر از مشتریان پرخرید سال با اعطای بن خرید اختصاصی.',
        priority: 'HIGH',
        impactText: 'تضمین خریدهای مجدد شب عید',
        icon: Target,
      },
      {
        id: 'wi-3',
        title: 'تست تست‌زدن سرور و درگاه در ساعات شلوغی',
        description: 'اطمینان از پایداری پاسخگویی سیستم در ساعات ۲۰ الی ۲۳.',
        priority: 'MEDIUM',
        impactText: 'جلوگیری از قطعی در ساعات اوج',
        icon: ShieldAlert,
      },
    ],
  },
};

export default function SeasonalBanner() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonKey>('summer');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});
  
  // State برای دفترچه یادداشت اختصاصی هر فصل
  const [notes, setNotes] = useState<Record<SeasonKey, string>>({
    spring: '',
    summer: '',
    autumn: '',
    winter: '',
  });
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  const activeSeason = seasons[selectedSeason];

  // بارگذاری یادداشت‌ها از LocalStorage موقع لود اولیه
  useEffect(() => {
    const savedNotes = localStorage.getItem('season_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse saved notes', e);
      }
    }
  }, []);

  // ذخیره تغییرات یادداشت
  const handleNoteChange = (text: string) => {
    const updatedNotes = { ...notes, [selectedSeason]: text };
    setNotes(updatedNotes);
    localStorage.setItem('season_notes', JSON.stringify(updatedNotes));
    
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const toggleAction = (id: string) => {
    setCompletedActions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const seasonActionIds = activeSeason.actions.map((a) => a.id);
  const completedCount = seasonActionIds.filter((id) => completedActions[id]).length;
  const progressPercentage = Math.round((completedCount / seasonActionIds.length) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl transition-all dir-rtl">
      {/* Background Image & Gradient Overlay */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-900">
        <Image
          src={activeSeason.image}
          alt={activeSeason.title}
          fill
          className="object-cover opacity-60 transition-all duration-700 hover:scale-105"
          priority
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${activeSeason.colorScheme.gradient}`} />

        {/* Top Header: Season Switcher Tabs */}
        <div className="absolute top-4 right-4 left-4 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-black backdrop-blur-md ${activeSeason.colorScheme.badgeBg}`}>
              <Sparkles className="h-4 w-4" />
              <span>{activeSeason.badgeTitle}</span>
            </span>
          </div>

          <div className="flex gap-1 rounded-2xl border border-white/20 bg-slate-950/70 p-1 backdrop-blur-xl shadow-lg">
            {(['spring', 'summer', 'autumn', 'winter'] as SeasonKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedSeason(key)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
                  selectedSeason === key
                    ? 'bg-white text-slate-950 shadow-md scale-105'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {key === 'spring' && 'بهار'}
                {key === 'summer' && 'تابستان'}
                {key === 'autumn' && 'پاییز'}
                {key === 'winter' && 'زمستان'}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Banner Stats Overlay */}
        <div className="absolute bottom-4 right-4 left-4 z-10 flex flex-wrap items-end justify-between gap-4 text-white">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-slate-300">
              <Calendar className="h-4 w-4 text-slate-300" />
              <span>{activeSeason.title}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
                {activeSeason.revenue}
              </span>
              <span className="text-xs font-black text-slate-300">فروش ثبت شده</span>
            </div>
          </div>

          {/* Industry Benchmark Pill */}
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/20 bg-slate-900/80 px-4 py-2 backdrop-blur-md shadow-lg">
            <Trophy className="h-4 w-4 text-amber-400" />
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-black text-slate-400">وضعیت در مقایسه با هم‌صنفی‌ها:</span>
              <span className={`text-xs font-black ${activeSeason.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {activeSeason.industryBenchmark}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Recommendation Footer Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/90 p-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-100 p-2.5 text-blue-700 border border-blue-200 shrink-0">
            {activeSeason.isPositive ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-600" />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-black text-blue-800">توصیه هوشمند فصل:</span>
            <p className="text-xs sm:text-sm font-black text-slate-800 leading-relaxed">
              {activeSeason.recommendation}
            </p>
          </div>
        </div>

        <button 
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className="whitespace-nowrap rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-black text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95 flex items-center gap-2 shrink-0"
        >
          <ListCheck className="h-4 w-4 text-blue-400" />
          <span>{isGuideOpen ? 'بستن دستورالعمل' : 'دستورالعمل فصل'}</span>
          {isGuideOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4 text-white/70" />}
        </button>
      </div>

      {/* Grid Accordion Sub-Component: Fixes animation jumpiness smoothly */}
      <div 
        className={`grid transition-all duration-500 ease-in-out bg-slate-100/80 border-t border-slate-200 ${
          isGuideOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 border-none'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 space-y-6">
            
            {/* Section Header with Progress */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  دستورالعمل‌های پیشنهادی (اولویت‌بندی شده)
                </h4>
                <p className="text-xs font-black text-slate-500 mt-1">
                  راهکارهای هوشمند بر اساس رفتار خریداران شما در این فصل
                </p>
              </div>

              {/* Progress Badge */}
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm self-end sm:self-auto">
                <span className="text-xs font-black text-slate-600">پیشرفت اقدامات:</span>
                <span className="text-xs font-black text-blue-600">{completedCount} از {activeSeason.actions.length}</span>
                <div className="w-14 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action Cards List */}
            <div className="flex flex-col gap-3">
              {activeSeason.actions.map((action, index) => {
                const IconComponent = action.icon;
                const isChecked = !!completedActions[action.id];

                return (
                  <div 
                    key={action.id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                      isChecked 
                        ? 'bg-emerald-50/70 border-emerald-200 opacity-80' 
                        : 'bg-white border-slate-200/90 shadow-sm hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 sm:mt-0 ${
                        action.priority === 'HIGH' 
                          ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                          : action.priority === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-slate-400">#{index + 1}</span>
                          <h5 className={`text-xs sm:text-sm font-black ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                            {action.title}
                          </h5>
                          
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                            action.priority === 'HIGH'
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : action.priority === 'MEDIUM'
                              ? 'bg-amber-50 text-amber-600 border border-amber-200'
                              : 'bg-blue-50 text-blue-600 border border-blue-200'
                          }`}>
                            {action.priority === 'HIGH' && 'اولویت بالا'}
                            {action.priority === 'MEDIUM' && 'اولویت متوسط'}
                            {action.priority === 'LOW' && 'اولویت عادی'}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-black text-slate-600 leading-relaxed">
                          {action.description}
                        </p>

                        <div className="flex items-center gap-1.5 mt-1">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                          <span className="text-xs font-black text-amber-700">تأثیر احتمالی: {action.impactText}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAction(action.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 border w-full sm:w-auto justify-center ${
                        isChecked
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      <CheckCircle2 className={`h-4 w-4 ${isChecked ? 'text-white' : 'text-slate-400'}`} />
                      <span>{isChecked ? 'انجام شد!' : 'انجامش دادی؟'}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Notepad Section */}
            <div className="rounded-2xl border border-amber-200/90 bg-amber-50/60 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StickyNote className="h-4 w-4 text-amber-700" />
                  <h5 className="text-xs font-black text-amber-900">دفترچه یادداشت اختصاصی {activeSeason.title.split(' ')[1]}</h5>
                </div>
                {isNoteSaved && (
                  <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1">
                    <Save className="h-3 w-3" /> ذخیره شد
                  </span>
                )}
              </div>
              
              <textarea
                value={notes[selectedSeason] || ''}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="برنامه‌ها، ایده‌ها یا هدف‌های فروش خودتون برای این فصل رو اینجا بنویسید (خودکار ذخیره میشه)..."
                className="w-full h-20 p-3 rounded-xl border border-amber-200 bg-white/80 text-xs sm:text-sm font-black text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none transition-all"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}