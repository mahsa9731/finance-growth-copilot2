import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import Papa from 'papaparse';

export const maxDuration = 60;

interface TransactionRow {
  session_key: string;
  try_seq: string;
  amount: string;
  session_st: string;
  try_status: string;
  switch_resp: string;
  psp_code: string;
  issuer_bank: string;
  payer_card: string;
  created_at: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'other_challenge_data.csv.gz');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: 'فایل دیتاست یافت نشد.' }, { status: 404 });
    }

    const fileStream = fs.createReadStream(filePath);
    const gunzipStream = zlib.createGunzip();

    const hourlyDistribution: Record<number, number> = {};
    for (let i = 0; i < 24; i++) hourlyDistribution[i] = 0;

    const bankShare: Record<string, number> = {};
    const pspStats: Record<string, { total: number; success: number; techFail: number }> = {};
    
    let totalSuccessRial = 0;
    let totalSuccessCount = 0;
    let totalFailedRial = 0;
    let totalFailedCount = 0;
    let highRetryFails = 0;
    let highRetryFailedRial = 0;
    const customerStats: Record<string, number> = {};

    const sessions: Record<string, {
      amountRial: number;
      card: string;
      bank: string;
      isSuccess: boolean;
      attemptsCount: number;
      hour: number;
    }> = {};

    await new Promise((resolve, reject) => {
      Papa.parse<TransactionRow>(fileStream.pipe(gunzipStream), {
        header: true,
        skipEmptyLines: true,
        step: (results) => {
          const row = results.data;
          const sessionKey = row.session_key;
          if (!sessionKey) return;

          const amountRial = parseFloat(row.amount) || 0;
          const card = row.payer_card || 'Unknown';
          const bank = row.issuer_bank || (card.length >= 6 ? card.substring(0, 6) : 'سایر بانک‌ها');
          const psp = row.psp_code || 'PSP_Unknown';
          const isVerified = row.try_status === 'Verified' || row.session_st === 'Verified';

          const createdDate = row.created_at ? new Date(row.created_at) : new Date();
          const hour = createdDate.getHours();

          if (!pspStats[psp]) pspStats[psp] = { total: 0, success: 0, techFail: 0 };
          pspStats[psp].total += 1;
          if (isVerified) pspStats[psp].success += 1;
          if (row.try_status === 'Failed' && row.switch_resp) pspStats[psp].techFail += 1;

          if (!sessions[sessionKey]) {
            sessions[sessionKey] = { amountRial, card, bank, isSuccess: false, attemptsCount: 0, hour };
          }
          sessions[sessionKey].attemptsCount += 1;
          if (isVerified) sessions[sessionKey].isSuccess = true;
        },
        complete: resolve,
        error: reject,
      });
    });

    Object.values(sessions).forEach((s) => {
      if (!isNaN(s.hour) && s.hour >= 0 && s.hour < 24) {
        hourlyDistribution[s.hour] += 1;
      }

      if (s.isSuccess) {
        totalSuccessRial += s.amountRial;
        totalSuccessCount += 1;

        if (s.card !== 'Unknown') {
          customerStats[s.card] = (customerStats[s.card] || 0) + 1;
        }

        bankShare[s.bank] = (bankShare[s.bank] || 0) + s.amountRial;
      } else {
        totalFailedRial += s.amountRial;
        totalFailedCount += 1;
        if (s.attemptsCount >= 2) {
          highRetryFails += 1;
          highRetryFailedRial += s.amountRial;
        }
      }
    });

    const totalSuccessToman = Math.round(totalSuccessRial / 10);
    const totalFailedToman = Math.round(totalFailedRial / 10);
    const recoverableToman = Math.round((highRetryFailedRial / 10) * 0.35);
    const totalSessions = totalSuccessCount + totalFailedCount;
    const conversionRate = totalSessions > 0 ? ((totalSuccessCount / totalSessions) * 100).toFixed(1) : '0';
    const loyalCustomersCount = Object.values(customerStats).filter((c) => c >= 2).length;

    let bestPsp = { name: 'سامان', rate: 0 };
    let worstPsp = { name: 'ملت', failRate: 0 };

    Object.entries(pspStats).forEach(([psp, st]) => {
      if (st.total > 10) {
        const succRate = (st.success / st.total) * 100;
        const fRate = (st.techFail / st.total) * 100;
        if (succRate > bestPsp.rate) bestPsp = { name: psp, rate: succRate };
        if (fRate > worstPsp.failRate) worstPsp = { name: psp, failRate: fRate };
      }
    });

    // تبدیل سهم بانک‌ها به درصد
    const bankShareFormatted = Object.entries(bankShare)
      .map(([name, amount]) => ({
        name,
        value: totalSuccessRial > 0 ? Math.round((amount / totalSuccessRial) * 100) : 0,
        amountToman: Math.round(amount / 10),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // تبدیل توزیع ساعتی به فرمت Chart
    const hourlyDataFormatted = Object.entries(hourlyDistribution).map(([hour, count]) => ({
      hour: `${hour}:00`,
      count,
    }));

    return NextResponse.json({
      success: true,
      summary: {
        totalSuccessToman,
        totalSuccessCount,
        totalFailedToman,
        conversionRate,
        loyalCustomersCount,
        totalCustomersCount: Object.keys(customerStats).length,
      },
      hourlyChart: hourlyDataFormatted,
      bankShareChart: bankShareFormatted,
      actionableInsights: [
        {
          id: 'INS-01',
          title: 'ارسال SMS تعاملی برای سبدهای خرید رهاشده',
          description: `تعداد ${highRetryFails.toLocaleString('fa-IR')} جلسه خرید به دلیل خطا پس از چند بار تلاش ناپیوسته شکست خورده‌اند. ارسال پیامک حاوی لینک مستقیم پرداخت مجدد فروش را افزایش می‌دهد.`,
          actionText: 'فعال‌سازی ارسال پیامک تعاملی',
          impactValue: recoverableToman,
          formattedImpact: `+${recoverableToman.toLocaleString('fa-IR')} تومان قابل احیا`,
          metricFormula: 'High_Retry_Failed_Volume * 0.35',
          sampleSize: highRetryFails,
        },
        {
          id: 'INS-02',
          title: 'بهینه‌سازی مسیریابی درگاه (Smart Routing)',
          description: `درگاه ${worstPsp.name} دارای ${worstPsp.failRate.toFixed(1)}٪ خطای فنی سوییچ است. انتقال خودکار ترافیک به ${bestPsp.name} (نرخ موفقیت ${bestPsp.rate.toFixed(1)}٪) نرخ تبدیل را بهبود می‌بخشد.`,
          actionText: 'تغییر اولویت سوئیچینگ به ' + bestPsp.name,
          impactValue: bestPsp.rate,
          formattedImpact: `افزایش نرخ تبدیل با درگاه ${bestPsp.name}`,
          metricFormula: 'Psp_Success_Rate_Delta',
          sampleSize: totalSessions,
        },
      ],
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}