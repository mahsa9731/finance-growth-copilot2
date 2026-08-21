'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  ShoppingBag, 
  TrendingUp, 
  PackageCheck, 
  DollarSign, 
  Star, 
  Filter, 
  ArrowUpRight, 
  Search,
  CheckCircle2,
  X
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  salesCount: number;
  totalRevenue: number;
  rating: number;
  growth: number;
  stockStatus: 'موجود' | 'رو به اتمام' | 'ناموجود';
  color: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'سرویس ابری اختصاصی Enterprise',
    category: 'زیرساخت',
    salesCount: 340,
    totalRevenue: 170000000,
    rating: 4.9,
    growth: 28,
    stockStatus: 'موجود',
    color: '#2563eb'
  },
  {
    id: 'prod-2',
    name: 'پکیج بازاریابی و اتوماسیون CRM',
    category: 'بازاریابی',
    salesCount: 215,
    totalRevenue: 86000000,
    rating: 4.7,
    growth: 15,
    stockStatus: 'موجود',
    color: '#059669'
  },
  {
    id: 'prod-3',
    name: 'ماژول پردازش تصویر هوش مصنوعی',
    category: 'هوش مصنوعی',
    salesCount: 180,
    totalRevenue: 126000000,
    rating: 4.8,
    growth: 42,
    stockStatus: 'رو به اتمام',
    color: '#7c3aed'
  },
  {
    id: 'prod-4',
    name: 'درگاه پرداخت اختصاصی پرو',
    category: 'مالی',
    salesCount: 145,
    totalRevenue: 58000000,
    rating: 4.6,
    growth: 8,
    stockStatus: 'موجود',
    color: '#d97706'
  },
  {
    id: 'prod-5',
    name: 'لایسنس سالانه فریم‌ورک اختصاصی',
    category: 'توسعه',
    salesCount: 90,
    totalRevenue: 45000000,
    rating: 4.5,
    growth: -4,
    stockStatus: 'ناموجود',
    color: '#e11d48'
  }
];

const CATEGORY_SHARE_DATA = [
  { name: 'زیرساخت', value: 35, color: '#2563eb' },
  { name: 'هوش مصنوعی', value: 26, color: '#7c3aed' },
  { name: 'بازاریابی', value: 18, color: '#059669' },
  { name: 'مالی', value: 12, color: '#d97706' },
  { name: 'توسعه', value: 9, color: '#e11d48' }
];

export default function TopProductsPage() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');

  const categories = ['همه', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.includes(searchTerm) || p.category.includes(searchTerm);
    const matchesCat = selectedCategory === 'همه' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalSalesCount = products.reduce((acc, p) => acc + p.salesCount, 0);
  const totalRevenue = products.reduce((acc, p) => acc + p.totalRevenue, 0);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 dir-rtl font-sans text-slate-800 bg-slate-50/50 min-h-screen">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                تحلیل محصولات و خدمات پرفروش
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-500 mr-9">
              پایش درآمد، تعداد فروش، سهم دسته‌بندی‌ها و میزان رشد محبوب‌ترین محصولات
            </p>
          </div>
        </div>

        {/* High-Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">کل فروش محصولات برتر</span>
              <span className="text-xl font-black text-slate-900">
                {totalSalesCount.toLocaleString('fa-IR')}
              </span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">عدد</span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <PackageCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">درآمد ناخالص حاصل از فروش</span>
              <span className="text-xl font-black text-emerald-600">
                {(totalRevenue / 1000000).toLocaleString('fa-IR')}
              </span>
              <span className="text-[10px] font-bold text-slate-400 mr-1">میلیون تومان</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <DollarSign className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">میانگین رشد فروش</span>
              <span className="text-xl font-black text-indigo-600">٪۱۸+</span>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 block mb-1">میانگین رضایت مشتریان</span>
              <span className="text-xl font-black text-amber-500">۴.۷ از ۵</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
              <Star className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Vertical Bar Chart for Product Sales */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">میزان فروش تفکیکی هر محصول</h3>
                <p className="text-xs font-bold text-slate-400">مقایسه حجم سفارش‌های ثبت‌شده</p>
              </div>
            </div>

            <div className="h-[280px] w-full dir-ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={products} 
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                  barCategoryGap={16}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f8fafc" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    tickLine={false} 
                    axisLine={false} 
                    width={80}
                    tick={({ x, y, payload }) => (
                      <g transform={`translate(${x},${y})`}>
                        <text 
                          x={-10} 
                          y={4} 
                          textAnchor="end" 
                          fill="#334155" 
                          fontSize={11} 
                          fontWeight={800}
                          style={{ fontFamily: 'inherit' }}
                        >
                          {payload.value}
                        </text>
                      </g>
                    )}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as Product;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs font-bold dir-rtl border border-slate-800 space-y-1">
                            <p className="text-slate-300 font-extrabold">{data.name}</p>
                            <div className="flex justify-between items-center gap-4 text-[11px] pt-1">
                              <span>تعداد فروش:</span>
                              <span className="text-emerald-400 font-black">{data.salesCount.toLocaleString('fa-IR')} عدد</span>
                            </div>
                            <div className="flex justify-between items-center gap-4 text-[11px]">
                              <span>درآمد کل:</span>
                              <span className="text-blue-400 font-black">{(data.totalRevenue / 1000000).toLocaleString('fa-IR')} م.ت</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="salesCount" radius={[0, 8, 8, 0]} barSize={18}>
                    {products.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Category Revenue Share */}
          <div className="bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">سهم درآمدی دسته‌بندی‌ها</h3>
              <p className="text-xs font-bold text-slate-400 mb-2">توزیع درصد فروش براساس دسته‌ها</p>
            </div>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_SHARE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_SHARE_DATA.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`٪${val}`, 'سهم درآمد']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              {CATEGORY_SHARE_DATA.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{cat.name}: ٪{cat.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-4 rounded-[24px] border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              placeholder="جستجوی نام یا دسته‌بندی محصول..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product List Table */}
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-black text-slate-500">
                  <th className="p-4 pr-6">عنوان محصول</th>
                  <th className="p-4">دسته‌بندی</th>
                  <th className="p-4">تعداد فروش</th>
                  <th className="p-4">درآمد کل</th>
                  <th className="p-4">نرخ رشد</th>
                  <th className="p-4">امتیاز</th>
                  <th className="p-4 pl-6">وضعیت موجودی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 pr-6 font-extrabold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: product.color }} />
                        {product.name}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-extrabold">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      {product.salesCount.toLocaleString('fa-IR')} عدد
                    </td>
                    <td className="p-4 font-black text-emerald-600">
                      {(product.totalRevenue / 1000000).toLocaleString('fa-IR')} م.ت
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 font-black ${product.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {product.growth >= 0 ? `٪${product.growth}+` : `٪${Math.abs(product.growth)}-`}
                        <ArrowUpRight className={`w-3.5 h-3.5 ${product.growth < 0 ? 'rotate-90' : ''}`} />
                      </span>
                    </td>
                    <td className="p-4 text-amber-500 font-black flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      {product.rating}
                    </td>
                    <td className="p-4 pl-6">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black ${
                        product.stockStatus === 'موجود' ? 'bg-emerald-50 text-emerald-700' :
                        product.stockStatus === 'رو به اتمام' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {product.stockStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}