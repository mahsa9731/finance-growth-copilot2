'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SeasonalBanner from '@/components/dashboard/SeasonalBanner';
import KPICards from '@/components/dashboard/KPICards';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import CustomerLeaderboard from '@/components/dashboard/CustomerLeaderboard';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts';
import { processRealDataset } from '@/services/analyticsEngine';
import { AggregatedMetrics, ActionableInsight } from '@/types/transaction';

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
        // اصلاح آدرس دقیق API شما
        const res = await fetch('/api/analytics/dashboard');
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        
        const json = await res.json();
        
        const transactions = json.data?.rawTransactions || json.rawTransactions || json;
        const result = processRealDataset(Array.isArray(transactions) ? transactions : []);
        
        setMetrics(result.metrics);
        setInsights(result.insights);
        setBankBreakdown(result.bankBreakdown);
        setHourlyDistribution(result.hourlyDistribution);
      } catch (e: any) {
        console.error('Fetch error:', e);
        setError(e.message);
      } fontFinally: {
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
          <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
          <p className="text-sm font-semibold text-slate-300">در حال آنالیز لایو داده‌های تراکنش...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          خطا در ارتباط با API: {error}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {metrics && <KPICards metrics={metrics} />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SeasonalBanner />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-sm">توصیه‌های مستقیم سودآور</h3>
              {insights.slice(0, 2).map((ins) => (
                <RecommendationCard key={ins.id} insight={ins} />
              ))}
            </div>
          </div>

          <AnalyticsCharts hourlyData={hourlyDistribution} bankData={bankBreakdown} />
          <CustomerLeaderboard customers={dummyCustomers} />
        </div>
      )}
    </DashboardLayout>
  );
}