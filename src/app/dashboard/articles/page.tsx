'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Tag, 
  ArrowLeft, 
  TrendingUp, 
  Bookmark, 
  Share2, 
  Sparkles,
  ChevronLeft
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  isFeatured?: boolean;
  imageBg: string;
  badgeColor: string;
}

const ARTICLES_DATA: Article[] = [
  {
    id: 'art-1',
    title: 'راهکارهای هوشمند افزایش نرخ تبدیل (Conversion Rate) در درگاه‌های پرداخت',
    summary: 'چگونه با بهینه‌سازی تجربه پرداخت (UX) و کاهش گام‌های تکمیل خرید، نرخ انصراف خریداران را تا ۲۵٪ کاهش دهیم.',
    category: 'رشد و فروش',
    readTime: '۶ دقیقه',
    author: 'تیم استراتژی مالی',
    date: '۲۸ مرداد ۱۴۰۵',
    isFeatured: true,
    imageBg: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-500/20 text-blue-200 border-blue-400/30'
  },
  {
    id: 'art-2',
    title: 'مدیریت جریان وجوه نقد (Cash Flow) در استارتاپ‌های در حال رشد',
    summary: 'اصول بنیادی پیش‌بینی ورودی و خروجی مالی، تسویه با تامین‌کنندگان و راه‌کارهای جلوگیری از کسری نقدینگی.',
    category: 'مدیریت مالی',
    readTime: '۸ دقیقه',
    author: 'رضا محمدی',
    date: '۲۴ مرداد ۱۴۰۵',
    imageBg: 'from-emerald-600 to-teal-700',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    id: 'art-3',
    title: 'ارزیابی شاخص LTV به CAC: معیار کلیدی پایداری مدل کسب‌وکارهای ابری',
    summary: 'چرا ارزش طول عمر مشتری (LTV) باید حداقل ۳ برابر هزینه جذب مشتری (CAC) باشد و چگونه آن را محاسبه کنیم؟',
    category: 'شاخص‌های کلیدی',
    readTime: '۵ دقیقه',
    author: 'سارا تهرانی',
    date: '۱۹ مرداد ۱۴۰۵',
    imageBg: 'from-purple-600 to-pink-700',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    id: 'art-4',
    title: 'روش‌های نوین جلوگیری از بازگشت وجه (Chargeback) و کلاهبرداری اینترنتی',
    summary: 'تکنیک‌های احراز هویت هوشمند، تحلیل رفتار تراکنش‌ها و ابزارهای ایمن‌سازی فرآیند فروش آنلاین.',
    category: 'امنیت و پرداخت',
    readTime: '۷ دقیقه',
    author: 'تیم فنی زرین‌پال',
    date: '۱۲ مرداد ۱۴۰۵',
    imageBg: 'from-amber-600 to-orange-700',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    id: 'art-5',
    title: 'استراتژی‌های قیمت‌گذاری (Pricing Strategies) برای محصولات SaaS',
    summary: 'تحلیل مدل‌های Freemium، قیمت‌گذاری بر اساس میزان مصرف (Usage-based) و پکیج‌های اختصاصی B2B.',
    category: 'رشد و فروش',
    readTime: '۱۰ دقیقه',
    author: 'علی امینی',
    date: '۵ مرداد ۱۴۰۵',
    imageBg: 'from-slate-700 to-slate-900',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200'
  }
];

const CATEGORIES = ['همه مقالات', 'رشد و فروش', 'مدیریت مالی', 'شاخص‌های کلیدی', 'امنیت و پرداخت'];

export default function BusinessArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('همه مقالات');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const featuredArticle = ARTICLES_DATA.find(a => a.isFeatured);
  const regularArticles = ARTICLES_DATA.filter(a => !a.isFeatured);

  const filteredArticles = regularArticles.filter(article => {
    const matchesCategory = selectedCategory === 'همه مقالات' || article.category === selectedCategory;
    const matchesSearch = article.title.includes(searchQuery) || article.summary.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <BookOpen className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                مقالات کسب و کار و تحلیل‌های تخصصی
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              راهنماها، استراتژی‌های رشد مالی، تحلیل داده‌های فروش و توسعه کسب‌وکارهای آنلاین
            </p>
          </div>
        </div>

        {/* Featured Article Hero Banner with Cover.jpg */}
        {featuredArticle && (
          <div className="mb-8 rounded-[32px] overflow-hidden text-white p-6 md:p-10 shadow-2xl relative">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/image/Cover.jpg" 
                alt={featuredArticle.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-black bg-blue-500/30 text-blue-200 border border-blue-400/30 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    مقاله ویژه هفته
                  </span>
                  <span className="text-xs font-bold text-slate-300">{featuredArticle.category}</span>
                </div>

                <h2 className="text-lg md:text-2xl font-black text-white leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs md:text-sm font-medium text-slate-300 leading-relaxed max-w-2xl">
                  {featuredArticle.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-blue-400" />
                    {featuredArticle.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-400" />
                    زمان مطالعه: {featuredArticle.readTime}
                  </span>
                  <span>{featuredArticle.date}</span>
                </div>

                <div className="pt-2">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-2xl shadow-lg transition transform active:scale-95">
                    <span>مطالعه مقاله کامل</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative Card Illustration */}
              <div className="hidden lg:flex justify-end">
                <div className="w-full max-w-xs h-48 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-5 flex flex-col justify-between shadow-2xl">
                  <TrendingUp className="w-10 h-10 text-blue-400 stroke-[1.5]" />
                  <div>
                    <span className="text-[11px] font-extrabold text-blue-200 block mb-1">بازدهی فروشگاه‌ها</span>
                    <span className="text-2xl font-black text-white">٪۲۵+ افزایش</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-800 outline-none focus:border-blue-500 transition shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const isSaved = savedArticles.includes(article.id);
            return (
              <div 
                key={article.id}
                className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Visual Header Gradient */}
                  <div className={`h-28 bg-gradient-to-r ${article.imageBg} p-4 flex items-start justify-between relative`}>
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black border ${article.badgeColor}`}>
                      {article.category}
                    </span>
                    <button
                      onClick={() => toggleSave(article.id)}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-md transition"
                      title={isSaved ? 'حذف از نشان‌شده‌ها' : 'نشان کردن مقاله'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <button className="flex items-center gap-1 text-blue-600 group-hover:translate-x-[-2px] transition">
                    <span>خواندن</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-[28px] border border-slate-200/80 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-[1.5]" />
            <h4 className="text-sm font-extrabold text-slate-700 mb-1">مقاله‌ای یافت نشد</h4>
            <p className="text-xs font-bold text-slate-400">عبارت دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}