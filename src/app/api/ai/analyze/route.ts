import { NextRequest, NextResponse } from "next/server";
import { askBusinessAI, AIContext } from "@/services/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      question,
      context,
    }: {
      question?: string;
      context?: AIContext;
    } = body;

    if (!question?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "سؤال نمی‌تواند خالی باشد.",
        },
        { status: 400 }
      );
    }

    if (!context) {
      return NextResponse.json(
        {
          success: false,
          error: "اطلاعات تحلیلی ارسال نشده است.",
        },
        { status: 400 }
      );
    }

    const answer = await askBusinessAI(
      question,
      context
    );

    return NextResponse.json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error("[AI Chat Error]", error);

    return NextResponse.json(
      {
        success: false,
        error: "خطا در ارتباط با سرویس هوش مصنوعی.",
      },
      { status: 500 }
    );
  }
}