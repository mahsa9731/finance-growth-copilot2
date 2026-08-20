// src/services/analyticsEngine.ts
import { RawTransaction } from '@/types/transaction';

export interface BankPerformance {
  bankName: string;
  totalTransactions: number;
  successRate: number;
  totalVolume: number;
  failedCount: number;
}

export interface AdvancedMetrics {
  totalVolume: number;
  totalCount: number;
  successfulCount: number;
  failedCount: number;
  overallSuccessRate: number;
  totalFeesPaid: number;
  avgTransactionValue: number;
  bankBreakdown: BankPerformance[];
  hourlyDistribution: Record<number, number>;
}

export interface BusinessInsight {
  id: string;
  title: string;
  friendlyAction: string;
  technicalDetail: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  metricValue: string;
  category: 'REVENUE' | 'BANK_FAILURE' | 'FEE_OPTIMIZATION' | 'RETRY_PATTERN';
}

export function processRealDataset(transactions: RawTransaction[]): {
  metrics: AdvancedMetrics;
  insights: BusinessInsight[];
} {
  console.log(`[Analytics Engine] Processing ${transactions.length} real transactions from dataset...`);

  let totalVolume = 0;
  let totalFeesPaid = 0;
  let successfulCount = 0;
  let failedCount = 0;

  const bankStats: Record<string, { total: number; success: number; volume: number }> = {};

  transactions.forEach((tx) => {
    const amount = Number(tx.category_amount) || 0;
    const fee = Number(tx.adjusted_fee) || 0;
    const trySeq = Number(tx.try_seq) || 1;
    const bank = tx.issuer_bank || 'نامشخص';

    totalVolume += amount;
    totalFeesPaid += fee;

    // Track bank performance
    if (!bankStats[bank]) {
      bankStats[bank] = { total: 0, success: 0, volume: 0 };
    }
    bankStats[bank].total += 1;
    bankStats[bank].volume += amount;

    // Criteria for first-try success
    if (trySeq === 1 && amount > 0) {
      successfulCount += 1;
      bankStats[bank].success += 1;
    } else {
      failedCount += 1;
    }
  });

  const totalCount = transactions.length;
  const overallSuccessRate = totalCount > 0 ? Number(((successfulCount / totalCount) * 100).toFixed(1)) : 0;
  const avgTransactionValue = totalCount > 0 ? Math.round(totalVolume / totalCount) : 0;

  // Process top banks
  const bankBreakdown: BankPerformance[] = Object.entries(bankStats)
    .map(([bankName, stats]) => ({
      bankName,
      totalTransactions: stats.total,
      successRate: Number(((stats.success / stats.total) * 100).toFixed(1)),
      totalVolume: stats.volume,
      failedCount: stats.total - stats.success,
    }))
    .sort((a, b) => b.totalTransactions - a.totalTransactions)
    .slice(0, 6); // Top 6 active banks

  // Identify worst performing bank for smart insight
  const worstBank = [...bankBreakdown].sort((a, b) => a.successRate - b.successRate)[0];

  const insights: BusinessInsight[] = [];

  // Insight 1: Bank Failure Rate Analysis
  if (worstBank) {
    insights.push({
      id: 'ins-bank-alert',
      title: `افت شدید نرخ موفقیت در پرداخت‌های ${worstBank.bankName}`,
      friendlyAction: `سلام! بررسی کردیم و متوجه شدیم که حدود ${(100 - worstBank.successRate).toFixed(1)}٪ از پرداخت‌های خریدارانی که کارت ${worstBank.bankName} داشتند ناموفق بوده است. پیشنهاد می‌کنیم با فعال‌سازی درگاه جایگزین هوشمند، مشتریان این بانک را به مسیر مستقیم‌تری هدایت کنید تا فروش شما از دست نرود.`,
      technicalDetail: `در داده‌های واقعی پردازش‌شده، از مجموع ${worstBank.totalTransactions.toLocaleString('fa-IR')} تراکنش متعلق به ${worstBank.bankName}، تعداد ${worstBank.failedCount.toLocaleString('fa-IR')} تراکنش با افت در مرحله اول (try_seq > 1) مواجه شده‌اند. نرخ موفقیت فعلی این بانک ${worstBank.successRate}٪ است.`,
      impact: 'HIGH',
      metricValue: `${worstBank.successRate}٪ موفقیت ${worstBank.bankName}`,
      category: 'BANK_FAILURE',
    });
  }

  // Insight 2: Fee Optimization based on actual calculated fees
  const totalFeesInToman = Math.round(totalFeesPaid / 10);
  insights.push({
    id: 'ins-fee-opt',
    title: 'تحلیل حجم کارمزد پرداختی شاپرک و بهینه‌سازی تسویه',
    friendlyAction: `کسب‌وکار شما تا کنون ${totalFeesInToman.toLocaleString('fa-IR')} تومان کارمزد پرداخت کرده است. با ارتقا به مدل تسویه هوشمند زون (Zone Settlement)، می‌توانید هزینه کارمزدهای دریافتی شاپرک را تا ۱۲٪ مدیریت کنید.`,
    technicalDetail: `مجموع دقیق adjusted_fee محاسبه‌شده از فایل داده‌ها برابر با ${totalFeesPaid.toLocaleString('fa-IR')} ریال است. میانگین مبلغ تراکنش‌ها ${Math.round(avgTransactionValue / 10).toLocaleString('fa-IR')} تومان ثبت شده است.`,
    impact: 'MEDIUM',
    metricValue: `${totalFeesInToman.toLocaleString('fa-IR')} تومان کارمزد`,
    category: 'FEE_OPTIMIZATION',
  });

  const metrics: AdvancedMetrics = {
    totalVolume,
    totalCount,
    successfulCount,
    failedCount,
    overallSuccessRate,
    totalFeesPaid,
    avgTransactionValue,
    bankBreakdown,
    hourlyDistribution: {},
  };

  return { metrics, insights };
}