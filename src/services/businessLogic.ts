// src/services/businessLogic.ts

export interface CustomerRFM {
  cardHash: string;
  frequency: number; // تعداد خرید موفق
  monetary: number;  // مجموع خرید
  lastPurchaseDate: string;
  segment: 'VIP' | 'LOYAL' | 'AT_RISK' | 'NEW';
}

export interface BusinessHealthScore {
  score: number; // از ۰ تا ۱۰۰
  status: 'عالی' | 'خوب' | 'نیازمند توجه' | 'بحرانی';
  reasons: string[];
}

/**
 * منطق سگمنت‌بندی مشتریان بر اساس کارت بانکی (RFM Model)
 */
export function calculateCustomerSegments(
  transactions: Array<{ card: string; amount: number; isSuccess: boolean; date: string }>
): { segments: Record<string, number>; customerList: CustomerRFM[] } {
  const customerMap = new Map<string, { count: number; totalAmount: number; lastDate: string }>();

  transactions.forEach((tx) => {
    if (!tx.isSuccess || !tx.card || tx.card === 'Unknown') return;

    if (!customerMap.has(tx.card)) {
      customerMap.set(tx.card, { count: 1, totalAmount: tx.amount, lastDate: tx.date });
    } else {
      const c = customerMap.get(tx.card)!;
      c.count += 1;
      c.totalAmount += tx.amount;
      if (tx.date > c.lastDate) c.lastDate = tx.date;
    }
  });

  const customerList: CustomerRFM[] = [];
  const segments = { VIP: 0, LOYAL: 0, NEW: 0, AT_RISK: 0 };

  customerMap.forEach((data, cardHash) => {
    let segment: 'VIP' | 'LOYAL' | 'AT_RISK' | 'NEW' = 'NEW';

    if (data.count >= 4) {
      segment = 'VIP';
    } else if (data.count >= 2) {
      segment = 'LOYAL';
    } else {
      segment = 'NEW';
    }

    segments[segment] += 1;
    customerList.push({
      cardHash,
      frequency: data.count,
      monetary: data.totalAmount,
      lastPurchaseDate: data.lastDate,
      segment,
    });
  });

  return { segments, customerList };
}

/**
 * محاسبه امتیاز سلامت کسب‌وکار (Health Score Algorithm)
 */
export function calculateBusinessHealth(
  successRate: number,
  failedAmountRatio: number,
  retentionRate: number
): BusinessHealthScore {
  let score = 100;
  const reasons: string[] = [];

  // کاهش امتیاز به خاطر نرخ شکست
  if (successRate < 80) {
    const penalty = Math.round((80 - successRate) * 1.5);
    score -= penalty;
    reasons.push(`پایین بودن نرخ موفقیت کل (${successRate}٪)`);
  }

  // کاهش امتیاز به خاطر حجم ریالی شکست‌ها
  if (failedAmountRatio > 0.2) {
    score -= 15;
    reasons.push('حجم بالای تراکنش‌های ناموفق نسبت به کل فروش');
  }

  // وضعیت نهایی
  score = Math.max(0, Math.min(100, score));
  let status: BusinessHealthScore['status'] = 'عالی';

  if (score < 50) status = 'بحرانی';
  else if (score < 70) status = 'نیازمند توجه';
  else if (score < 85) status = 'خوب';

  return { score, status, reasons };
}