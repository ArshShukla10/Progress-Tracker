import { LearningEmptyState } from "@/components/learning/empty-state/learning-empty-state";
import type { RevisionItem } from "@/types/learning";

export function RevisionPanel({ revision }: { revision: RevisionItem[] }) {
  if (revision.length === 0) {
    return (
      <LearningEmptyState
        title="No revision queue yet"
        description="Spaced repetition items, weak-topic revision, and planner revision sessions will appear here."
      />
    );
  }

  return <div className="space-y-3">{revision.map((item) => <p key={item.id}>{item.title}</p>)}</div>;
}
