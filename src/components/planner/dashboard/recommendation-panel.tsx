import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlannerRecommendation } from "@/types/planner";

export function RecommendationPanel({
  recommendations,
}: {
  recommendations: PlannerRecommendation[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="rounded-md border border-border/70 bg-background/32 p-4"
          >
            <p className="text-sm font-medium text-foreground">{recommendation.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {recommendation.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
