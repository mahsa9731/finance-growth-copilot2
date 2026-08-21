'use client';

import { useState } from 'react';

import {
  Bot,
  Send,
  User,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface AIAssistantProps {
  context: any;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant({
  context,
}: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'سلام! من دستیار هوشمند کسب‌وکار شما هستم. درباره فروش، پرداخت‌ها، مشتریان و عملکرد درگاه‌ها هر سؤالی داری بپرس.',
    },
  ]);

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!question.trim() || loading) {
      return;
    }

    const userQuestion = question.trim();

    setQuestion('');

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userQuestion,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userQuestion,
          context,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.error || 'خطا در دریافت پاسخ'
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'متأسفانه در حال حاضر نتوانستم پاسخ را دریافت کنم. دوباره تلاش کن.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      className="
        h-[680px]
        bg-white
        rounded-[28px]
        border
        border-blue-100
        shadow-[0_15px_50px_rgba(37,99,235,0.07)]
        overflow-hidden
        flex
        flex-col
      "
    >

      {/* ================= HEADER ================= */}

      <div className="px-6 py-5 border-b border-blue-100 bg-white">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* Bot Avatar */}

            <div className="relative">

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-blue-600
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-blue-600/20
                "
              >
                <Bot className="w-6 h-6 text-white" />
              </div>

              {/* Online indicator */}

              <span
                className="
                  absolute
                  -bottom-0.5
                  -right-0.5
                  w-3.5
                  h-3.5
                  bg-emerald-500
                  border-2
                  border-white
                  rounded-full
                "
              />

            </div>


            {/* Title */}

            <div>

              <h2 className="font-black text-blue-950">
                دستیار هوشمند
              </h2>

              <p className="text-[11px] text-blue-500/60 mt-0.5">
                تحلیل‌گر کسب‌وکار شما
              </p>

            </div>

          </div>


          {/* AI Badge */}

          <div
            className="
              hidden
              sm:flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-blue-50
              border
              border-blue-100
            "
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />

            <span className="text-[10px] font-black text-blue-700">
              AI Assistant
            </span>
          </div>

        </div>

      </div>


      {/* ================= MESSAGES ================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-5
          sm:px-6
          py-6
          space-y-5
          bg-gradient-to-b
          from-white
          to-blue-50/20
        "
      >

        {messages.map(
          (message, index) => (

            <div
              key={index}
              className={`
                flex
                gap-3
                ${
                  message.role === 'user'
                    ? 'justify-start'
                    : 'justify-end'
                }
              `}
            >

              {/* Assistant Avatar */}

              {message.role === 'assistant' && (
                <div
                  className="
                    w-8
                    h-8
                    rounded-xl
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                    shrink-0
                    mt-1
                    shadow-md
                    shadow-blue-600/15
                  "
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}


              {/* Message Bubble */}

              <div
                className={`
                  max-w-[80%]
                  px-4
                  py-3.5
                  rounded-2xl
                  text-sm
                  leading-7
                  ${
                    message.role === 'user'
                      ? `
                        bg-blue-600
                        text-white
                        rounded-tr-md
                        shadow-md
                        shadow-blue-600/10
                      `
                      : `
                        bg-blue-50
                        text-blue-950
                        border
                        border-blue-100
                        rounded-tl-md
                      `
                  }
                `}
              >
                {message.content}
              </div>


              {/* User Avatar */}

              {message.role === 'user' && (
                <div
                  className="
                    w-8
                    h-8
                    rounded-xl
                    bg-blue-50
                    border
                    border-blue-100
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    shrink-0
                    mt-1
                  "
                >
                  <User className="w-4 h-4" />
                </div>
              )}

            </div>

          )
        )}


        {/* ================= LOADING ================= */}

        {loading && (

          <div className="flex items-center gap-3 justify-end">

            <div
              className="
                bg-blue-50
                border
                border-blue-100
                text-blue-800
                px-4
                py-3
                rounded-2xl
                rounded-tl-md
                flex
                items-center
                gap-2
              "
            >

              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />

              <span className="text-xs font-bold">
                در حال تحلیل داده‌ها...
              </span>

            </div>

            <div
              className="
                w-8
                h-8
                rounded-xl
                bg-blue-600
                flex
                items-center
                justify-center
                shadow-md
                shadow-blue-600/15
              "
            >
              <Bot className="w-4 h-4 text-white" />
            </div>

          </div>

        )}

      </div>


      {/* ================= INPUT ================= */}

      <div
        className="
          p-4
          border-t
          border-blue-100
          bg-blue-50/40
        "
      >

        <div
          className="
            relative
            bg-white
            rounded-2xl
            border
            border-blue-100
            shadow-sm
            focus-within:border-blue-400
            focus-within:ring-4
            focus-within:ring-blue-500/10
            transition-all
          "
        >

          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={loading}
            rows={2}
            placeholder="مثلاً: چرا نرخ موفقیت پرداخت‌های من پایین است؟"
            className="
              w-full
              resize-none
              bg-transparent
              outline-none
              border-none
              px-4
              pt-4
              pb-12
              text-sm
              text-blue-950
              placeholder:text-blue-300
              dir-rtl
            "
          />


          {/* Input Bottom */}

          <div
            className="
              absolute
              bottom-2.5
              left-2.5
              right-3
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
                text-[10px]
                text-blue-400
                hidden
                sm:block
              "
            >
              Enter برای ارسال
            </span>


            {/* Send Button */}

            <button
              onClick={sendMessage}
              disabled={
                loading ||
                !question.trim()
              }
              className="
                w-9
                h-9
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-100
                disabled:text-blue-300
                text-white
                flex
                items-center
                justify-center
                transition-all
                active:scale-95
                shadow-lg
                shadow-blue-600/20
              "
            >

              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}