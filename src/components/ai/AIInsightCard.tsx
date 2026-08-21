"use client";

interface AIInsightCardProps {
  insight?: {
    type: string;
    title: string;
    description: string;
    formattedImpact: string;
    actionText: string;
  };
}

export default function AIInsightCard({
  insight,
}: AIInsightCardProps) {

  if (!insight) {
    return (
      <div className="ai-insight-card">
        <h3>بینش هوشمند</h3>

        <p>
          در حال حاضر بینش مهمی برای نمایش وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <div className="ai-insight-card">

      <div className="ai-insight-header">
        <span>AI Insight</span>
      </div>

      <h3>
        {insight.title}
      </h3>

      <p>
        {insight.description}
      </p>

      <div className="ai-impact">
        {insight.formattedImpact}
      </div>

      <button>
        {insight.actionText}
      </button>

    </div>
  );
}