import Link from "next/link";

import type { ContinueLearningTarget } from "@/types/academic";

type LearningBreadcrumbsProps = {
  items: ContinueLearningTarget[];
};

export function LearningBreadcrumbs({ items }: LearningBreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-2">
          {index > 0 ? <span>/</span> : null}
          <Link className="transition-colors hover:text-foreground" href={item.href}>
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
