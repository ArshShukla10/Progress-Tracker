import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearningStats } from "@/types/learning";

const statLabels: Array<{ key: keyof LearningStats; label: string }> = [
  { key: "notesCount", label: "Recent Notes" },
  { key: "revisionDue", label: "Today's Revision" },
  { key: "pyqsPending", label: "Pending PYQs" },
  { key: "interviewPending", label: "Interview Progress" },
  { key: "flashcardsDue", label: "Flashcards Due" },
  { key: "bookmarkedItems", label: "Bookmarks" },
];

export function LearningSidebar({ stats }: { stats: LearningStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {statLabels.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-md border border-border/70 bg-background/32 p-3 text-sm"
          >
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium text-foreground">{stats[item.key]}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
