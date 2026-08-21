'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SeasonalBanner from '@/components/dashboard/SeasonalBanner';
import KPICards from '@/components/dashboard/KPICards';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import CustomerLeaderboard from '@/components/dashboard/CustomerLeaderboard';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts';
import { ActionableInsight, AggregatedMetrics } from '@/types/transaction';
import { Sparkles, Zap, X, CheckCircle2 } from 'lucide-react';

export default function GrowthPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // استیت‌های اصلی داشبورد
  const [metrics, setMetrics] = useState<AggregatedMetrics | null>(null);
  const [insights, setInsights] = useState<ActionableInsight[]>([]);
  const [bankData, setBankData] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  // استیت پاپ‌آپ اقدام هوشمند
  const [selectedInsight, setSelectedInsight] = useState<ActionableInsight | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/analytics/dashboard');
        if (!res.ok) throw new Error(`خطای دریافت داده از سرور (Status: ${res.status})`);

        const json = await res.json();

        if (!json.success) {
          throw new Error(json.error || 'خطا در دریافت اطلاعات از API');
        }

        // ۱. مقداردهی متریک‌های هدر
        if (json.summary) {
          setMetrics({
            totalRevenue: json.summary.totalSuccessToman,
            totalTransactions: json.summary.totalSuccessCount + json.summary.totalFailedCount,
            successfulTransactions: json.summary.totalSuccessCount,
            overallSuccessRate: json.summary.conversionRate,
            attemptedFailedVolume: json.summary.totalFailedToman,
            noAttemptVolume: 0,
            uniquePayers: json.summary.totalCustomersCount,
            topLoyalPayersCount: json.summary.loyalCustomersCount,
            relativeFeeIndexRatio: parseFloat(json.summary.feeToVolumeRatioPercent || '0'),
          });
        }

        // ۲. تبدیل داده‌های API به توصیه‌های خیلی ساده، دوستانه و تبلیغاتی (بدون فرمول)
        if (Array.isArray(json.actionableInsights)) {
          const mappedInsights: ActionableInsight[] = json.actionableInsights.map((item: any) => {
            let friendlyTitle = item.title;
            let friendlyDescription = item.description;
            let friendlyAction = item.actionText;

            if (item.id === 'INS-01') {
              friendlyTitle = 'چندتا از مشتری‌هات موقع پرداخت گیر کردن! 🛒';
              friendlyDescription =
                'بعضی خریدارها چند بار تلاش کردن خرید کنن اما نتونستن. همین الان با یه پیامک دوستانه و لینک خرید، بهشون کمک کن خریدشونو راحت تمام کنن!';
              friendlyAction = 'ارسال پیامک راهنما به مشتریان';
            } else if (item.id === 'INS-02') {
              friendlyTitle = 'درگاه پرداختت رو سریع‌تر و راحت‌تر کن ⚡';
              friendlyDescription =
                'می‌تونی ترافیک پرداخت رو ببری روی درگاه‌های باکیفیت‌تر تا هیچ مشتری‌ای بخاطر خطای درگاه دست خالی از سایتی نره.';
              friendlyAction = 'جایگزینی هوشمند درگاه بهتر';
            } else if (item.id === 'INS-03') {
              friendlyTitle = 'مشتری‌های وفادارت رو غافلگیر کن! 🎁';
              friendlyDescription =
                'مشتری‌هایی داری که چند بار ازت خرید کردن. با فرستادن یک کد تخفیف کوچیک کاری کن که همیشه از خودت خرید کنن!';
              friendlyAction = 'فرستادن هدیه به مشتریان وفادار';
            }

            return {
              id: item.id,
              type: item.id === 'INS-01' ? 'CRITICAL' : item.id === 'INS-02' ? 'WARNING' : 'OPPORTUNITY',
              title: friendlyTitle,
              description: friendlyDescription,
              impactValue: item.impactValue || 0,
              formattedImpact: item.formattedImpact,
              actionText: friendlyAction,
              actionType: item.id === 'INS-01' ? 'SEND_SMS' : item.id === 'INS-02' ? 'CHANGE_GATEWAY' : 'CAMPAIGN',
              explanation: {
                formula: '', // کلاً فرمول پاک شد
                sampleSize: 0,
                sampleSessionKeys: [],
                affectedVolume: 0,
              },
            };
          });
          setInsights(mappedInsights);
        }

        // ۳. مقداردهی داده‌های نمودار
        if (json.charts) {
          setBankData(json.charts.bankShare || []);
          setHourlyData(json.charts.hourly || []);
        }
      } catch (e: any) {
        console.error('Fetch error:', e);
        setError(e.message || 'خطا در بارگذاری داده‌ها');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const dummyCustomers = [
    { cardHash: '62198610****4321', totalSpent: 45000000, purchaseCount: 8, segment: 'VIP' },
    { cardHash: '60379918****9876', totalSpent: 28000000, purchaseCount: 5, segment: 'VIP' },
    { cardHash: '58921012****1122', totalSpent: 12000000, purchaseCount: 3, segment: 'وفادار' },
  ];

  const handleApplyFix = () => {
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedInsight(null);
    }, 1600);
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[65vh] gap-4">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
            <Sparkles className="w-5 h-5 text-blue-600 absolute" />
          </div>
          <p className="text-sm font-black text-slate-800 dir-rtl animate-pulse">
            در حال تحلیل داده‌های فروش شما...
          </p>
        </div>
      ) : error ? (
        <div className="p-5 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-950 text-xs font-black dir-rtl shadow-md">
          خطا در دریافت داده‌ها: {error}
        </div>
      ) : (
        <div className="flex flex-col gap-6 text-slate-900 font-sans dir-rtl">
          {/* کارت‌های شاخص عملکرد */}
          {metrics && <KPICards metrics={metrics} />}

          {/* بنر مناسبتی + کارت‌های توصیه‌های صمیمی */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <SeasonalBanner />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-slate-900 px-4 py-3.5 rounded-2xl text-white shadow-lg border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <h3 className="font-black text-xs sm:text-sm tracking-wide text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>پیشنهادهای دوستانه افزایش فروش</span>
                  </h3>
                </div>
                <span className="text-[10px] font-black bg-blue-600 text-white px-2.5 py-1 rounded-xl shadow-xs">
                  هوشمند
                </span>
              </div>

              {insights && insights.length > 0 ? (
                insights.map((ins) => (
                  <RecommendationCard
                    key={ins.id}
                    insight={ins}
                    onExecuteAction={(selected) => setSelectedInsight(selected)}
                  />
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs text-center font-black shadow-xs">
                  در حال حاضر پیشنهادی وجود ندارد
                </div>
              )}
            </div>
          </div>

          {/* نمودارها */}
          <AnalyticsCharts hourlyData={hourlyData} bankData={bankData} />

          {/* جدول خریداران برتر */}
          <CustomerLeaderboard customers={dummyCustomers} />

          {/* پاپ‌آپ اقدام دوستانه بدون فرمول */}
          {selectedInsight && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 dir-rtl animate-fadeIn">
              <div className="relative w-full max-w-md rounded-3xl bg-white border-2 border-slate-200 p-6 shadow-2xl flex flex-col gap-5">
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="absolute left-4 top-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
                    <Zap className="w-6 h-6 fill-amber-500" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      پیشنهاد ساده و پرسود
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-1">
                      {selectedInsight.title}
                    </h3>
                  </div>
                </div>

                {appliedSuccess ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-lg font-black text-slate-900">با موفقیت انجام شد!</h4>
                    <p className="text-xs font-bold text-slate-600">
                      دستورالعمل اجرا شد و تغییرات برای افزایش فروش اعمال گردید.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <p className="text-xs font-extrabold text-slate-700 leading-relaxed">
                        {selectedInsight.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={handleApplyFix}
                        className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-xl transition-all active:scale-95"
                      >
                        {selectedInsight.actionText || 'انجامش بده!'}
                      </button>
                      <button
                        onClick={() => setSelectedInsight(null)}
                        className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-all"
                      >
                        فعلا نه
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}