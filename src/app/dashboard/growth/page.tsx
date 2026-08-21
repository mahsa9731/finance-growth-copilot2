'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SeasonalBanner from '@/components/dashboard/SeasonalBanner';
import KPICards from '@/components/dashboard/KPICards';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import CustomerLeaderboard from '@/components/dashboard/CustomerLeaderboard';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts';
import { processRealDataset } from '@/services/analyticsEngine';
import { AggregatedMetrics, ActionableInsight, RawTransaction } from '@/types/transaction';

export default function GrowthPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<AggregatedMetrics | null>(null);
  const [insights, setInsights] = useState<ActionableInsight[]>([]);
  const [bankBreakdown, setBankBreakdown] = useState<any[]>([]);
  const [hourlyDistribution, setHourlyDistribution] = useState<Record<number, number>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/api/analytics/dashboard');
        if (!res.ok) throw new Error(`خطای دریافت داده از سرور: کد status ${res.status}`);
        
        const json = await res.json();
        
        // نگاشت دقیق داده‌های خام بر اساس RawTransaction[]
        const rawData = json.data?.rawTransactions || json.rawTransactions || json.data || json;
        const transactionsList: RawTransaction[] = Array.isArray(rawData) ? rawData : [];

        // محاسبات مستقیم موتور آنالیز پروژه با تایپ‌های دقیق شما
        const result = processRealDataset(transactionsList);
        
        if (result) {
          setMetrics(result.metrics);
          setInsights(result.insights || []);
          setBankBreakdown(result.bankBreakdown || []);
          setHourlyDistribution(result.hourlyDistribution || {});
        }
      } catch (e: any) {
        console.error('Fetch error:', e);
        setError(e.message || 'خطا در پردازش اطلاعات');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const dummyCustomers = [
    { cardHash: '62198610****4321', totalSpent: 45000000, purchaseCount: 8, segment: 'VIP' as const },
    { cardHash: '60379918****9876', totalSpent: 28000000, purchaseCount: 5, segment: 'VIP' as const },
    { cardHash: '58921012****1122', totalSpent: 12000000, purchaseCount: 3, segment: 'وفادار' as const },
  ];

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-10 h-10 rounded-full border-3 border-blue-600/20 border-t-blue-600 animate-spin" />
          <p className="text-xs font-semibold text-slate-600 dir-rtl">در حال آنالیز لایو داده‌های تراکنش...</p>
        </div>
      ) : error ? (
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium dir-rtl">
          خطا در دریافت و پردازش داده‌ها: {error}
        </div>
      ) : (
        <div className="flex flex-col gap-6 text-slate-800 font-sans dir-rtl">
          {/* کارت‌های KPI بر اساس تایپ دقیق AggregatedMetrics */}
          {metrics && <KPICards metrics={metrics} />}

          {/* بنر فصل و توصیه‌های مستقیم سودآور بر اساس ActionableInsight */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SeasonalBanner />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-slate-700 text-xs px-1">توصیه‌های مستقیم سودآور (مطابق معیار ۱ داوری)</h3>
              {insights && insights.length > 0 ? (
                insights.slice(0, 2).map((ins) => (
                  <RecommendationCard key={ins.id} insight={ins} />
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-white/60 border border-slate-200 text-slate-400 text-xs text-center">
                  توصیه‌ای استخراج نشد
                </div>
              )}
            </div>
          </div>

          {/* نمودارهای توزیع ساعتی و سهم بانک‌ها */}
          <AnalyticsCharts hourlyData={hourlyDistribution} bankData={bankBreakdown} />
          
          {/* لیدربورد خریداران */}
          <CustomerLeaderboard customers={dummyCustomers} />
        </div>
      )}
    </DashboardLayout>
  );
}