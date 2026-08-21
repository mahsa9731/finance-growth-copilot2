// src/services/analyticsEngine.ts
import { RawTransaction, ActionableInsight, AggregatedMetrics } from '@/types/transaction';

export interface BankPerformance {
  bankName: string;
  totalSessions: number;
  successRate: number;
  totalVolume: number;
  failedCount: number;
}

export interface AnalyticsResult {
  metrics: AggregatedMetrics;
  insights: ActionableInsight[];
  bankBreakdown: BankPerformance[];
  hourlyDistribution: Record<number, number>;
}

export function processRealDataset(transactions: RawTransaction[]): AnalyticsResult {
  console.log(`[Analytics Engine] Processing ${transactions.length} transactions...`);

  // ۱. گروه‌بندی بر اساس Session برای جلوگیری از دوبار شماری (Session Aggregation)
  const sessionMap = new Map<string, {
    amount: number;
    fee: number;
    bank: string;
    isSuccess: boolean;
    hasNoAttempt: boolean;
    payerCard?: string;
    maxTrySeq: number;
    failedSessionKeys: string[];
    hour: number;
  }>();

  transactions.forEach((tx) => {
    const sessionKey = tx.session_key;
    if (!sessionKey) return;

    const amount = Number(tx.category_amount) || 0;
    const fee = Number(tx.adjusted_fee) || 0;
    const bank = tx.issuer_bank || 'نامشخص';
    const isVerified = tx.try_status === 'Verified' || tx.session_status === 'Verified';
    const trySeq = Number(tx.try_seq) || 1;
    
    // استخراج ساعت ایجاد تراکنش
    const createdAt = tx.created_at ? new Date(tx.created_at) : null;
    const hour = createdAt && !isNaN(createdAt.getTime()) ? createdAt.getHours() : 12;

    if (!sessionMap.has(sessionKey)) {
      sessionMap.set(sessionKey, {
        amount,
        fee,
        bank,
        isSuccess: isVerified,
        hasNoAttempt: tx.try_status === 'NoAttempt',
        payerCard: tx.payer_card,
        maxTrySeq: trySeq,
        failedSessionKeys: [sessionKey],
        hour,
      });
    } else {
      const existing = sessionMap.get(sessionKey)!;
      if (isVerified) existing.isSuccess = true;
      if (tx.try_status === 'NoAttempt') existing.hasNoAttempt = true;
      if (trySeq > existing.maxTrySeq) existing.maxTrySeq = trySeq;
    }
  });

  // ۲. محاسبه شاخص‌های کلی (Aggregated Metrics)
  let totalRevenue = 0;
  let totalFees = 0;
  let successfulTransactions = 0;
  let attemptedFailedVolume = 0;
  let noAttemptVolume = 0;

  const bankStats: Record<string, { total: number; success: number; volume: number }> = {};
  const payerFrequency: Record<string, number> = {};
  const hourlyDistribution: Record<number, number> = {};
  for (let i = 0; i < 24; i++) hourlyDistribution[i] = 0;

  const highRetryFailedSessions: string[] = [];

  sessionMap.forEach((session, sessionKey) => {
    totalFees += session.fee;
    hourlyDistribution[session.hour] = (hourlyDistribution[session.hour] || 0) + 1;

    // آمار بانک‌ها
    if (!bankStats[session.bank]) {
      bankStats[session.bank] = { total: 0, success: 0, volume: 0 };
    }
    bankStats[session.bank].total += 1;

    if (session.isSuccess) {
      successfulTransactions += 1;
      totalRevenue += session.amount;
      bankStats[session.bank].success += 1;
      bankStats[session.bank].volume += session.amount;

      // محاسبه مشتریان وفادار
      if (session.payerCard) {
        payerFrequency[session.payerCard] = (payerFrequency[session.payerCard] || 0) + 1;
      }
    } else {
      if (session.hasNoAttempt) {
        noAttemptVolume += session.amount;
      } else {
        attemptedFailedVolume += session.amount;
      }

      if (session.maxTrySeq >= 3) {
        highRetryFailedSessions.push(sessionKey);
      }
    }
  });

  const totalTransactions = sessionMap.size;
  const overallSuccessRate = totalTransactions > 0 
    ? Number(((successfulTransactions / totalTransactions) * 100).toFixed(1)) 
    : 0;

  const allPayers = Object.keys(payerFrequency);
  const uniquePayers = allPayers.length;
  const topLoyalPayersCount = allPayers.filter((card) => payerFrequency[card] >= 2).length;
  const relativeFeeIndexRatio = totalRevenue > 0 ? Number((totalFees / totalRevenue).toFixed(4)) : 0;

  // ۳. تفکیک و رتبه‌بندی عملکرد بانک‌ها
  const bankBreakdown: BankPerformance[] = Object.entries(bankStats)
    .map(([bankName, stats]) => ({
      bankName,
      totalSessions: stats.total,
      successRate: stats.total > 0 ? Number(((stats.success / stats.total) * 100).toFixed(1)) : 0,
      totalVolume: stats.volume,
      failedCount: stats.total - stats.success,
    }))
    .filter((b) => b.totalSessions >= 5)
    .sort((a, b) => b.totalSessions - a.totalSessions);

  const worstBank = [...bankBreakdown].sort((a, b) => a.successRate - b.successRate)[0];

  // ۴. ساخت هوشمند بینش‌های قابل اقدام (Actionable Insights)
  const insights: ActionableInsight[] = [];

  // بینش ۱: احیای خریدهای رهاشده با تلاش متعدد (CRITICAL)
  if (highRetryFailedSessions.length > 0) {
    const avgAov = successfulTransactions > 0 ? totalRevenue / successfulTransactions : 0;
    const recoverableVolume = Math.round(highRetryFailedSessions.length * avgAov * 0.3); // تخمین احیای ۳۰٪

    insights.push({
      id: 'insight-high-retry-recovery',
      type: 'CRITICAL',
      title: 'احیای مشتریان منتظر با نرخ تلاش بالا',
      description: `تعداد ${highRetryFailedSessions.length} کاربر بیش از ۳ بار برای پرداخت تلاش کرده‌اند اما به دلیل خطای درگاه خریدشان نهایی نشده است. ارسال لینک پرداخت اختصاصی می‌تواند این فروش معوقه را بازیابی کند.`,
      impactValue: recoverableVolume,
      formattedImpact: `${(recoverableVolume / 10).toLocaleString('fa-IR')} تومان قابل احیا`,
      actionText: 'ارسال پیامک پیگیری و لینک خرید',
      actionType: 'SEND_SMS',
      targetCount: highRetryFailedSessions.length,
      explanation: {
        formula: 'تعداد جلسات با (try_seq >= 3 و عدم موفقیت) × میانگین ارزش هر سفارش (AOV) × نرخ بازگشت ۳۰٪',
        sampleSize: highRetryFailedSessions.length,
        sampleSessionKeys: highRetryFailedSessions.slice(0, 5),
        affectedVolume: highRetryFailedSessions.length * avgAov,
      },
    });
  }

  // بینش ۲: بهبود نرخ شکست بانک دارای افت (WARNING)
  if (worstBank && worstBank.successRate < 75) {
    const lostVolume = worstBank.failedCount * (successfulTransactions > 0 ? totalRevenue / successfulTransactions : 0);

    insights.push({
      id: 'insight-bank-routing',
      type: 'WARNING',
      title: `افت شدید پایداری در پرداخت‌های ${worstBank.bankName}`,
      description: `حدود ${(100 - worstBank.successRate).toFixed(1)}٪ از پرداخت‌های خریدارانی که کارت ${worstBank.bankName} داشته‌اند شکست خورده است. با تغییر اولویت درگاه برای کارت‌های این بانک، مانع ریزش مشتریان شوید.`,
      impactValue: lostVolume,
      formattedImpact: `${(lostVolume / 10).toLocaleString('fa-IR')} تومان در ریسک ریزش`,
      actionText: 'تنظیم درگاه هوشمند هوشمند',
      actionType: 'CHANGE_GATEWAY',
      targetCount: worstBank.failedCount,
      explanation: {
        formula: '(کل جلسات بانک - جلسات موفق) × میانگین مبلغ تراکنش موفق',
        sampleSize: worstBank.totalSessions,
        sampleSessionKeys: Array.from(sessionMap.entries())
          .filter(([_, s]) => s.bank === worstBank.bankName && !s.isSuccess)
          .map(([k]) => k)
          .slice(0, 5),
        affectedVolume: lostVolume,
      },
    });
  }

  // بینش ۳: تشویق مشتریان وفادار (OPPORTUNITY)
  if (topLoyalPayersCount > 0) {
    const loyalVolumeEstimate = Math.round(totalRevenue * 0.35);

    insights.push({
      id: 'insight-loyal-campaign',
      type: 'OPPORTUNITY',
      title: 'اهرم‌سازی مشتریان وفادار با خرید مجدد',
      description: `شما ${topLoyalPayersCount.toLocaleString('fa-IR')} مشتری با حداقل ۲ بار خرید موفق دارید. ارائه کد تخفیف اختصاصی یا امتیاز وفاداری، خریدهای بعدی آن‌ها را ۳۵٪ افزایش می‌دهد.`,
      impactValue: loyalVolumeEstimate,
      formattedImpact: `${topLoyalPayersCount.toLocaleString('fa-IR')} خریدار وفادار`,
      actionText: 'ارسال کمپین تخفیف وفاداری',
      actionType: 'CAMPAIGN',
      targetCount: topLoyalPayersCount,
      explanation: {
        formula: 'شمارش payer_cardهای یکتا با حداقل ۲ خرید موفق در بازه زمانی',
        sampleSize: topLoyalPayersCount,
        sampleSessionKeys: Array.from(sessionMap.entries())
          .filter(([_, s]) => s.isSuccess && s.payerCard && payerFrequency[s.payerCard] >= 2)
          .map(([k]) => k)
          .slice(0, 5),
        affectedVolume: loyalVolumeEstimate,
      },
    });
  }

  const metrics: AggregatedMetrics = {
    totalRevenue,
    totalTransactions,
    successfulTransactions,
    overallSuccessRate,
    attemptedFailedVolume,
    noAttemptVolume,
    uniquePayers,
    topLoyalPayersCount,
    relativeFeeIndexRatio,
  };

  return { metrics, insights, bankBreakdown, hourlyDistribution };
}