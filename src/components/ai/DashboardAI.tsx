'use client';

import { useEffect, useState } from 'react';

import {
  Bot,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Users,
  CreditCard,
  Activity,
  ArrowUpLeft,
} from 'lucide-react';

import AIAssistant from '@/components/ai/AIAssistant';

export default function DashboardAI() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiContext, setAiContext] = useState<any>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true);

        const response = await fetch('/api/analytics/dashboard');

        if (!response.ok) {
          throw new Error(
            `خطا در دریافت اطلاعات (${response.status})`
          );
        }

        const json = await response.json();

        if (!json.success) {
          throw new Error(
            json.error || 'خطا در دریافت اطلاعات'
          );
        }

        const context = {
          metrics: json.summary
            ? {
                totalRevenue:
                  json.summary.totalSuccessToman ?? 0,

                totalTransactions:
                  (json.summary.totalSuccessCount ?? 0) +
                  (json.summary.totalFailedCount ?? 0),

                successfulTransactions:
                  json.summary.totalSuccessCount ?? 0,

                overallSuccessRate:
                  json.summary.conversionRate ?? 0,

                attemptedFailedVolume:
                  json.summary.totalFailedToman ?? 0,

                noAttemptVolume: 0,

                uniquePayers:
                  json.summary.totalCustomersCount ?? 0,

                topLoyalPayersCount:
                  json.summary.loyalCustomersCount ?? 0,

                relativeFeeIndexRatio:
                  parseFloat(
                    json.summary.feeToVolumeRatioPercent || '0'
                  ),
              }
            : null,

          insights:
            Array.isArray(json.actionableInsights)
              ? json.actionableInsights
              : [],

          bankData:
            json.charts?.bankShare ?? [],

          hourlyData:
            json.charts?.hourly ?? [],
        };

        setAiContext(context);
      } catch (err: any) {
        console.error(err);

        setError(
          err.message ||
            'خطا در دریافت اطلاعات تحلیلی'
        );
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-blue-50/30 flex items-center justify-center px-6 dir-rtl">
        <div className="flex flex-col items-center gap-5">

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/20">
              <Bot className="w-8 h-8 text-white" />
            </div>

            <div className="absolute -right-1 -top-1">
              <span className="flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500" />
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="font-black text-blue-950">
              در حال آماده‌سازی دستیار هوشمند
            </p>

            <p className="text-xs text-blue-500/70 mt-2">
              در حال بررسی داده‌های کسب‌وکار شما...
            </p>
          </div>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] bg-blue-50/30 flex items-center justify-center px-6 dir-rtl">

        <div className="max-w-md w-full bg-white border border-blue-100 rounded-[28px] p-7 shadow-[0_15px_50px_rgba(37,99,235,0.08)]">

          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h2 className="font-black text-blue-950">
            دریافت اطلاعات ناموفق بود
          </h2>

          <p className="text-sm text-blue-900/60 mt-2 leading-7">
            {error}
          </p>

        </div>
      </div>
    );
  }

  if (!aiContext) {
    return null;
  }

  const metrics = aiContext.metrics;
  const insights = aiContext.insights || [];
  const mainInsight = insights[0];

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-blue-50/30 dir-rtl">

      {/* Page Container */}
      <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-8 lg:py-10">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-2.5 mb-3">

                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>

                <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                  AI POWERED
                </span>

              </div>

              <h1 className="text-2xl md:text-3xl font-black text-blue-950">
                دستیار هوشمند کسب‌وکار
              </h1>

              <p className="text-sm text-blue-900/55 mt-2">
                درباره فروش، پرداخت‌ها و مشتریانت هر سؤالی داری بپرس.
              </p>

            </div>

            {/* Status */}

            <div className="flex items-center gap-2.5 bg-white border border-blue-100 rounded-2xl px-4 py-3 shadow-sm self-start md:self-auto">

              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>

              <span className="text-xs font-bold text-blue-800">
                آماده پاسخگویی
              </span>

            </div>

          </div>

        </div>


        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

          {/* ================= CHAT ================= */}

          <div className="xl:col-span-8 min-w-0">

            <div className="bg-white rounded-[28px] border border-blue-100 shadow-[0_15px_50px_rgba(37,99,235,0.07)] overflow-hidden">

              <AIAssistant
                context={aiContext}
              />

            </div>

          </div>


          {/* ================= RIGHT PANEL ================= */}

          <div className="xl:col-span-4 flex flex-col gap-5">


            {/* ================= MAIN INSIGHT ================= */}

            <div className="bg-white rounded-[28px] p-6 border border-blue-100 shadow-[0_15px_50px_rgba(37,99,235,0.08)] relative overflow-hidden">

              {/* Decorative Circle */}

              <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-blue-100/70 blur-3xl" />

              <div className="relative">

                {/* Header */}

                <div className="flex items-center justify-between mb-6">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>

                    <div>

                      <h3 className="text-sm font-black text-blue-950">
                        بینش امروز
                      </h3>

                      <p className="text-[10px] text-blue-500/60 mt-1">
                        تحلیل هوشمند کسب‌وکار
                      </p>

                    </div>

                  </div>

                  <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    SMART
                  </span>

                </div>


                {/* Insight */}

                {mainInsight ? (
                  <>
                    <h2 className="text-lg font-black text-blue-950 leading-8">
                      {mainInsight.title}
                    </h2>

                    <p className="text-xs text-blue-900/60 leading-7 mt-3">
                      {mainInsight.description}
                    </p>

                    {mainInsight.formattedImpact && (
                      <div className="mt-5 p-4 rounded-2xl bg-blue-50 border border-blue-100">

                        <p className="text-[10px] text-blue-500 font-bold mb-1">
                          تأثیر احتمالی
                        </p>

                        <p className="text-xl font-black text-blue-700">
                          {mainInsight.formattedImpact}
                        </p>

                      </div>
                    )}
                  </>
                ) : (

                  <div className="py-6">

                    <p className="text-sm font-black text-blue-950">
                      وضعیت کسب‌وکار شما پایدار است.
                    </p>

                    <p className="text-xs text-blue-600/60 mt-2 leading-6">
                      در حال حاضر هشدار مهمی برای نمایش وجود ندارد.
                    </p>

                  </div>

                )}

              </div>

            </div>


            {/* ================= QUICK METRICS ================= */}

            <div className="bg-white rounded-[28px] border border-blue-100 shadow-[0_15px_50px_rgba(37,99,235,0.06)] p-5">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h3 className="font-black text-blue-950 text-sm">
                    وضعیت کلی
                  </h3>

                  <p className="text-[11px] text-blue-500/60 mt-1">
                    خلاصه عملکرد فعلی
                  </p>

                </div>

                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>

              </div>


              <div className="grid grid-cols-2 gap-3">

                <MetricItem
                  icon={<CreditCard />}
                  title="تراکنش‌ها"
                  value={formatNumber(
                    metrics?.totalTransactions
                  )}
                />

                <MetricItem
                  icon={<TrendingUp />}
                  title="نرخ موفقیت"
                  value={`${metrics?.overallSuccessRate ?? 0}%`}
                />

                <MetricItem
                  icon={<Users />}
                  title="مشتریان"
                  value={formatNumber(
                    metrics?.uniquePayers
                  )}
                />

                <MetricItem
                  icon={<ArrowUpLeft />}
                  title="خرید موفق"
                  value={formatNumber(
                    metrics?.successfulTransactions
                  )}
                />

              </div>

            </div>


            {/* ================= SUGGESTED QUESTIONS ================= */}

            <div className="bg-white rounded-[28px] border border-blue-100 shadow-[0_15px_50px_rgba(37,99,235,0.06)] p-5">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Sparkles className="w-4 h-4" />
                </div>

                <div>

                  <h3 className="text-sm font-black text-blue-950">
                    از دستیار بپرس
                  </h3>

                  <p className="text-[10px] text-blue-500/60 mt-1">
                    چند سؤال پیشنهادی برای شروع
                  </p>

                </div>

              </div>


              <div className="flex flex-col gap-2">

                <Suggestion
                  text="چرا نرخ موفقیت پرداخت‌ها پایین است؟"
                />

                <Suggestion
                  text="کدام بانک بهترین عملکرد را دارد؟"
                />

                <Suggestion
                  text="چطور می‌توانم فروش بیشتری داشته باشم؟"
                />

                <Suggestion
                  text="وضعیت مشتریان وفادار من چطور است؟"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ========================================================= */
/* ====================== COMPONENTS ======================== */
/* ========================================================= */


function MetricItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-blue-50/60 border border-blue-100 p-3 transition-all hover:bg-blue-50 hover:border-blue-200">

      <div className="flex items-center gap-2 mb-2">

        <div className="w-8 h-8 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm">

          <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">
            {icon}
          </span>

        </div>

        <span className="text-[10px] text-blue-500/70 font-bold">
          {title}
        </span>

      </div>

      <p className="text-sm font-black text-blue-950">
        {value}
      </p>

    </div>
  );
}


function Suggestion({
  text,
}: {
  text: string;
}) {
  return (
    <button
      className="
        w-full
        text-right
        px-4
        py-3.5
        rounded-2xl
        bg-blue-50/50
        hover:bg-blue-600
        border
        border-blue-100
        hover:border-blue-600
        text-[11px]
        font-bold
        text-blue-800
        hover:text-white
        transition-all
        group
      "
    >

      <span className="flex items-center justify-between gap-3">

        <span>
          {text}
        </span>

        <ArrowUpLeft
          className="
            w-3.5
            h-3.5
            opacity-0
            group-hover:opacity-100
            transition-opacity
            shrink-0
          "
        />

      </span>

    </button>
  );
}


function formatNumber(
  value: number | undefined
) {
  if (
    value === undefined ||
    value === null
  ) {
    return '—';
  }

  return value.toLocaleString('fa-IR');
}