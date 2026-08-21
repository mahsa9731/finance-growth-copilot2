import OpenAI from "openai";

const avalai = new OpenAI({
  apiKey: process.env.AVALAI_API_KEY,
  baseURL: "https://api.avalai.ir/v1",
});

export interface AIContext {
  metrics: {
    totalRevenue: number;
    totalTransactions: number;
    successfulTransactions: number;
    overallSuccessRate: number;
    attemptedFailedVolume: number;
    noAttemptVolume: number;
    uniquePayers: number;
    topLoyalPayersCount: number;
    relativeFeeIndexRatio: number;
  };

  insights: {
    type: string;
    title: string;
    description: string;
    impactValue: number;
    formattedImpact: string;
    actionText: string;
  }[];

  bankBreakdown: {
    bankName: string;
    totalSessions: number;
    successRate: number;
    totalVolume: number;
    failedCount: number;
  }[];

  hourlyDistribution: Record<number, number>;
}

export async function askBusinessAI(
  question: string,
  context: AIContext
) {
  const systemPrompt = `
تو دستیار هوشمند یک داشبورد تحلیل پرداخت و فروش هستی.

کاربر صاحب یک کسب‌وکار است و درباره عملکرد پرداخت‌های خود سؤال می‌پرسد.

وظایف تو:

- داده‌های ارائه‌شده را تحلیل کن.
- پاسخ را به فارسی بده.
- پاسخ کوتاه، واضح و کاربردی باشد.
- اگر سؤال مربوط به علت یک مشکل است، بر اساس داده‌ها علت‌های محتمل را توضیح بده.
- اگر اطلاعات کافی وجود ندارد، صادقانه بگو.
- هیچ عددی را حدس نزن.
- هیچ داده‌ای خارج از Context تولید نکن.
- اعداد و درصدها را دقیقاً از Context استفاده کن.
- پیشنهادهای عملی و قابل فهم ارائه کن.

نکته مهم:
برخی Insightهای سیستم ممکن است دارای تخمین‌های سناریویی باشند.
آنها را به عنوان «تخمین» معرفی کن، نه نتیجه قطعی داده‌ها.
`;

  const userPrompt = `
اطلاعات فعلی کسب‌وکار:

${JSON.stringify(context, null, 2)}

سؤال کاربر:

${question}
`;

  const response = await avalai.chat.completions.create({
    model: "gemini-3.1-flash-lite",

    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],

    temperature: 0.2,
    max_tokens: 700,
  });

  return response.choices[0]?.message?.content ?? "";
}