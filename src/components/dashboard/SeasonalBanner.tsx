'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, ChevronLeft, TrendingUp } from 'lucide-react';

type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonData {
  title: string;
  image: string;
  revenue: string;
  industryBenchmark: string; // مقایسه با هم صنفی‌ها
  recommendation: string;
}

const seasons: Record<SeasonKey, SeasonData> = {
  spring: {
    title: 'فصل بهار (فروردین - خرداد)',
    image: '/image/spring.jpg',
    revenue: '۱۲۸,۵۰۰,۰۰۰ تومان',
    industryBenchmark: '۱۲٪ بالاتر از میانگین صنف',
    recommendation: 'تقاضای خرید بهاری به اوج رسیده است. پیشنهاد می‌شود کمپیین جشنواره نوورزی ارائه دهید.'
  },
  summer: {
    title: 'فصل تابستان (تیر - شهریور)',
    image: '/image/summer.jpg',
    revenue: '۱۹۴,۲۰۰,۰۰۰ تومان',
    industryBenchmark: '۲۴٪ بالاتر از میانگین صنف',
    recommendation: 'پرفروش‌ترین فصل سال! اولویت با پایداری درگاه برای عدم ریزش مشتریان لیدربورد است.'
  },
  autumn: {
    title: 'فصل پاییز (مهر - آذر)',
    image: '/image/autumn.jpg',
    revenue: '۹۵,۰۰۰,۰۰۰ تومان',
    industryBenchmark: '۵٪ پایین‌تر از میانگین صنف',
    recommendation: 'افت فروش پاییزه؛ با ارائه تخفیف‌های هدفمند به مشتریان در ریسک، فروش را بازیابی کنید.'
  },
  winter: {
    title: 'فصل زمستان (دی - اسفند)',
    image: '/image/winter.jpg',
    revenue: '۱۵۶,۸۰۰,۰۰۰ تومان',
    industryBenchmark: '۱۵٪ بالاتر از میانگین صنف',
    recommendation: 'افزایش خریدهای پایان سال. سوئیچینگ هوشمند بانک‌ها را فعال کنید.'
  }
};

export default function SeasonalBanner() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonKey>('summer');
  const activeSeason = seasons[selectedSeason];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-sm transition-all">
      {/* Background Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src={activeSeason.image}
          alt={activeSeason.title}
          fill
          className="object-cover transition-all duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        
        {/* Season Switcher Tabs */}
        <div className="absolute top-4 right-4 flex gap-1 bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/20">
          {(['spring', 'summer', 'autumn', 'winter'] as SeasonKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedSeason(key)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedSeason === key
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {key === 'spring' && 'بهار'}
              {key === 'summer' && 'تابستان'}
              {key === 'autumn' && 'پاییز'}
              {key === 'winter' && 'زمستان'}
            </button>
          ))}
        </div>

        {/* Season Stats Overlay */}
        <div className="absolute bottom-4 right-4 left-4 text-white flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-200 font-medium mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeSeason.title}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">{activeSeason.revenue}</h3>
          </div>
          <div className="text-left bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 text-xs">
            <span className="block text-slate-200">مقایسه با هم‌صنفی‌ها:</span>
            <span className="font-bold text-emerald-300">{activeSeason.industryBenchmark}</span>
          </div>
        </div>
      </div>

      {/* Action Recommendation Card */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            <span className="font-bold text-slate-900">توصیه هوشمند فصل: </span>
            {activeSeason.recommendation}
          </p>
        </div>
        <button className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-blue-700 transition-colors">
          <span>اقدامات پیشنهادی</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}