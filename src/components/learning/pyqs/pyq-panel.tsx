import { LearningEmptyState } from "@/components/learning/empty-state/learning-empty-state";
import type { PyqItem } from "@/types/learning";

export function PyqPanel({ pyqs }: { pyqs: PyqItem[] }) {
  if (pyqs.length === 0) {
    return (
      <LearningEmptyState
        title="No PYQs added"
        description="Subject-wise, module-wise, and topic-wise previous year questions will appear here when real PYQ content is imported."
      />
    );
  }

  return <div className="space-y-3">{pyqs.map((pyq) => <p key={pyq.id}>{pyq.title}</p>)}</div>;
}
