import { LearningEmptyState } from "@/components/learning/empty-state/learning-empty-state";
import type { LearningNote } from "@/types/learning";

export function NotesPanel({ notes }: { notes: LearningNote[] }) {
  if (notes.length === 0) {
    return (
      <LearningEmptyState
        title="No notes yet"
        description="Personal notes, quick notes, and AI-generated notes will appear here once real content is added."
      />
    );
  }

  return <div className="space-y-3">{notes.map((note) => <p key={note.id}>{note.title}</p>)}</div>;
}
