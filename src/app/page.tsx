// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { loadDefaultTransactions } from '@/lib/parser';
import { processRealDataset, AdvancedMetrics, BusinessInsight } from '@/services/analyticsEngine';
import { GrowthDashboard } from '@/components/dashboard/GrowthDashboard';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [metrics, setMetrics] = useState<AdvancedMetrics | null>(null);
  const [insights, setInsights] = useState<BusinessInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initPipeline() {
      try {
        console.log('[HomePage] Decompressing and reading dataset...');
        const rawData = await loadDefaultTransactions();

        console.log('[HomePage] Processing dataset metrics...');
        const { metrics: calcMetrics, insights: calcInsights } = processRealDataset(rawData);

        setMetrics(calcMetrics);
        setInsights(calcInsights);
      } catch (err) {
        console.error('[HomePage] Pipeline error:', err);
      } finally {
        setLoading(false);
      }
    }

    initPipeline();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-sm text-slate-400 font-mono">
          در حال رمزگشایی و پردازش تمام تراکنش‌های واقعی از فایل فشرده...
        </p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-slate-950 text-rose-400 flex items-center justify-center">
        خطا در پردازش داده‌ها. لطفاً دوباره تلاش کنید.
      </div>
    );
  }

  return <GrowthDashboard metrics={metrics} insights={insights} />;
}