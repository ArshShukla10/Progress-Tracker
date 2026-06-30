import { Inbox } from "lucide-react";

export function LearningEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-md border border-dashed border-border/80 bg-background/24 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
        <Inbox className="size-5" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
