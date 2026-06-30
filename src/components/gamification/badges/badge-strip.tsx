import { Medal } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Badge } from "@/types/gamification";

const tierClassName: Record<Badge["tier"], string> = {
  bronze: "border-amber-700/45 bg-amber-500/10 text-amber-200",
  silver: "border-slate-300/30 bg-slate-300/10 text-slate-200",
  gold: "border-yellow-300/35 bg-yellow-300/10 text-yellow-100",
  diamond: "border-sky-300/35 bg-sky-300/10 text-sky-100",
  custom: "border-primary/35 bg-primary/10 text-primary",
};

export function BadgeStrip({ badges }: { badges: Badge[] }) {
  const visibleBadges = badges.filter((badge) => badge.unlocked).slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Badges</CardTitle>
      </CardHeader>
      <CardContent>
        {visibleBadges.length === 0 ? (
          <p className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground">
            Badges unlock as learning progress is recorded.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visibleBadges.map((badge) => (
              <div key={badge.id} className={`rounded-md border p-4 ${tierClassName[badge.tier]}`}>
                <Medal className="size-5" />
                <p className="mt-3 text-sm font-medium">{badge.label}</p>
                <p className="mt-1 text-xs opacity-80">{badge.tier}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
