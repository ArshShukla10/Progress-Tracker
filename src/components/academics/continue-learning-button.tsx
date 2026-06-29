import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { ContinueLearningTarget } from "@/types/academic";

type ContinueLearningButtonProps = {
  target: ContinueLearningTarget | null;
};

export function ContinueLearningButton({ target }: ContinueLearningButtonProps) {
  if (!target) {
    return (
      <Button variant="secondary" disabled className="gap-2">
        Completed
      </Button>
    );
  }

  return (
    <Button asChild className="gap-2">
      <Link href={target.href}>
        {target.label}
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  );
}
